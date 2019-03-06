package port

import domain.*

interface SessionPort {
    fun create(sessionCode: SessionCode, userId: UserId): Session
    fun revoke(sessionCode: SessionCode)
    fun findBy(sessionCode: SessionCode): Session
}