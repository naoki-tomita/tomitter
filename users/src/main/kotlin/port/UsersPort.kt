package port

import domain.*

interface UsersPort {
    fun create(loginName: LoginName, password: Password): User
    fun findBy(id: UserId): User?
    fun findBy(loginName: LoginName): User?
    fun list(): Users
}