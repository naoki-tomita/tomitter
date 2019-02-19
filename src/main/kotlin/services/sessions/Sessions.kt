package services.sessions

import entities.Session
import entities.User
import org.jetbrains.exposed.dao.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object Sessions: IntIdTable() {
    val sessionId: Column<String> = varchar("session_id", 50).uniqueIndex()
    val userId: Column<Int> = integer("user_id")
}

fun create(user: User): Session {
    val sessionId = SessionIdFactory.create()
    val id = transaction {
        Sessions.insertAndGetId {
            it[Sessions.sessionId] = sessionId.id
            it[Sessions.userId] = user.id
        }
    }
    return Session(id.value, SessionIdFactory.create(), user.id)
}
