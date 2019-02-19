package services.sessions

import entities.SessionId
import kotlin.random.Random

val SESSION_CHARACTORS = "abcdefghijklmnopqrstuvwxyz0123456789"
fun uniqueString(length: Int) = (1..length).map { SESSION_CHARACTORS[Random.nextInt(SESSION_CHARACTORS.length)] }.joinToString("")

class SessionIdFactory {
    companion object {
        fun create() = SessionId(uniqueString(10))
    }
}
