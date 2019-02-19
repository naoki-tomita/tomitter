package services.databases

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.TransactionManager
import org.jetbrains.exposed.sql.transactions.transaction
import services.sessions.Sessions
import services.users.Users

fun init() {
    Database.connect("jdbc:sqlite:./data.db", "org.sqlite.JDBC")
    TransactionManager.manager.defaultIsolationLevel = java.sql.Connection.TRANSACTION_SERIALIZABLE
    transaction {
        SchemaUtils.create(Sessions)
        SchemaUtils.create(Users)
    }
}