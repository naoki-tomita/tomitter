package domain

import java.util.*

data class SessionId(val value: Int)
val source = "abcdefghijklmnopqrstuvwxyz0123456789"
val random = Random()
class SessionCode {
    val value: String
    init {
        value = random()
    }

    private fun random(): String {
        return (0..7).map { source[random.nextInt(source.length)] }.joinToString("")
    }
}
data class Session(val sessionId: SessionId, val sessionCode: SessionCode, val userId: UserId)