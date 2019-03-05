package gateway

import domain.Session
import domain.SessionCode
import domain.UserId
import driver.Database
import port.SessionPort

class SessionGateway: SessionPort {
    val driver = Singleton.get(Database::class)

    override fun create(sessionCode: SessionCode, userId: UserId): Session {
        TODO()
    }

    override fun revoke(sessionCode: SessionCode) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}
