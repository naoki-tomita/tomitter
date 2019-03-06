package gateway

import domain.Session
import domain.SessionCode
import domain.SessionId
import domain.UserId
import driver.Database
import port.SessionPort

class SessionGateway: SessionPort {
    val driver = Singleton.get(Database::class) as Database

    override fun create(sessionCode: SessionCode, userId: UserId): Session {
        return driver.sessions.create(sessionCode.value, userId.value)
            .let { Session(SessionId(it.id), sessionCode, userId) }
    }

    override fun revoke(sessionCode: SessionCode) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun findBy(sessionCode: SessionCode): Session {
        return driver.sessions.findBy(sessionCode.value)
            .let { Session(SessionId(it.id), sessionCode, UserId(it.userId)) }
    }
}
