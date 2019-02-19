package services.users

import entities.User
import org.jetbrains.exposed.dao.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.sqlite.SQLiteErrorCode
import org.sqlite.SQLiteException

object Users: IntIdTable() {
    val loginName: Column<String> = varchar("login_name", 50).uniqueIndex()
    val password: Column<String> = varchar("password", 50)
}

class UserAlreadyExistException(id: String): Exception("$id is already exist.")

fun create(loginName: String, password: String): User {
    return transaction {
        try {
            val id = Users.insertAndGetId {
                it[Users.loginName] = loginName
                it[Users.password] = password
            }
            User(id.value, loginName, password)
        } catch (e: Exception) {
            val original = e.cause
            when (original) {
                is SQLiteException -> {
                    if (original.resultCode == SQLiteErrorCode.SQLITE_CONSTRAINT_UNIQUE) {
                        throw UserAlreadyExistException("$loginName")
                    }
                    throw e
                }
                else -> throw e;
            }
        }
    }
}

class UserNotFountException(id: String): Exception("$id is not found.")
class PasswordDidNotMatchException(): Exception("Password did not match.")

fun findBy(loginName: String, password: String): User {
    val users = transaction { queryToUser(Users.select { Users.loginName eq loginName }) }
    if (users.count() == 0) {
        throw UserNotFountException(loginName)
    }
    if (!users.first().password.equals(password)) {
        throw PasswordDidNotMatchException()
    }
    return users.first()
}

fun list(): List<User> = transaction { queryToUser(Users.selectAll()) }

fun queryToUser(query: Query): List<User> = query.map { User(it[Users.id].value, it[Users.loginName], it[Users.password]) }
