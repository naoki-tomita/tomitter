package gateway

import domain.*
import driver.Database
import port.UsersPort

class UsersGateway: UsersPort {
    val driver = Singleton.get(Database::class) as Database

    override fun findBy(id: UserId): User {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
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
