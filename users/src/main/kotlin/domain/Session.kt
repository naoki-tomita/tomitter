package domain

import java.util.*

data class SessionId(val value: Int)
val source = "abcdefghijklmnopqrstuvwxyz0123456789"
val random = Random()
data class SessionCode(val value: String) {
    companion object {
        private fun random(): String {
            return (0..7).map { source[random.nextInt(source.length)] }.joinToString("")
        }

        fun from(string: String): SessionCode {
            return SessionCode(string)
        }

        fun create(): SessionCode {
            return SessionCode(random())
        }
    }
}

data class Session(val sessionId: SessionId, val sessionCode: SessionCode, val userId: UserId)
