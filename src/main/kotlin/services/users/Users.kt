package services.users

import domain.User
import org.jetbrains.exposed.dao.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.TransactionManager
import org.jetbrains.exposed.sql.transactions.transaction
import org.sqlite.SQLiteErrorCode
import org.sqlite.SQLiteException

object Users: IntIdTable() {
    val loginName: Column<String> = varchar("login_name", 50).uniqueIndex()
    val password: Column<String> = varchar("password", 50)
}

class UserAlreadyExistException(id: String): Exception("$id is already exist.")
fun init() {
    Database.connect("jdbc:sqlite:./data.db", "org.sqlite.JDBC")
    TransactionManager.manager.defaultIsolationLevel = java.sql.Connection.TRANSACTION_SERIALIZABLE
    transaction {
        SchemaUtils.create(Users)
    }
}

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

fun list(): List<User> {
    return transaction {
        val query = Users.selectAll()
        query.map { User(it[Users.id].value, it[Users.loginName], it[Users.password]) }
    }
}

