package gateway

import domain.*
import driver.Database
import inject
import port.UsersPort

class UsersGateway: UsersPort {
    val driver: Database = inject()

    override fun findBy(id: UserId): User {
        return driver.users.findBy(id.value).let { User(UserId(it.id), LoginName(it.loginName), Password(it.password)) }
    }

    override fun findBy(loginName: LoginName, password: Password): User {
        return driver.users.findBy(loginName.value, password.value).let { User.from(it.id, it.loginName, it.password) }
    }

    override fun create(loginName: LoginName, password: Password): User {
        return driver.users.create(loginName.value, password.value).let { User.from(it.id, it.loginName, it.password) }
    }

    override fun list(): Users {
        return driver.users.list().map { User.from(it.id, it.loginName, it.password) }.let(::Users)
    }

}
