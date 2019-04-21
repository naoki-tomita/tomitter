package gateway

import domain.*
import driver.Database
import inject
import port.UsersPort

class UsersGateway: UsersPort {
    val driver: Database = inject()

    override fun findBy(id: UserId): User? =
        driver.users.findBy(id.value)?.let { User(UserId(it.id), LoginName(it.loginName), Password(it.password)) }

    // gatewayは何も考えず、データを保存するだけの存在であるべき
    // ここではnullableであるべき
    // 分岐処理をgateway以下に持たせるのはおかしい
    override fun findBy(loginName: LoginName): User? =
        driver.users.findBy(loginName.value)?.let { User.from(it.id, it.loginName, it.password) }

    override fun create(loginName: LoginName, password: Password): User =
        driver.users.create(loginName.value, password.value).let { User.from(it.id, it.loginName, it.password) }

    override fun list(): Users = driver.users.list().map { User.from(it.id, it.loginName, it.password) }.let(::Users)
}
