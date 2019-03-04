package gateway

import domain.*
import driver.Database
import port.UsersPort

class UsersGateway: UsersPort {

    val driver: Database = Database()

    override fun findBy(id: UserId): User? {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun findBy(loginName: LoginName, password: Password): User? {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun create(loginName: LoginName, password: Password): User {
        return driver.users.create(loginName.value, password.value)
    }

    override fun list(): Users {
        return Users(driver.users.list())
    }

}
