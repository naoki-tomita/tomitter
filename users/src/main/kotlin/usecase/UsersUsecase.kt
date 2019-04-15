package usecase

import domain.*
import inject
import port.SessionPort
import port.UsersPort
import rest.FilteredUserJson
import rest.FilteredUsersJson
import kotlin.reflect.KClass

class UsersUsecase {

    var usersPort: UsersPort = inject()
    var sessionPort: SessionPort = inject()

    fun create(loginName: String, password: String): User =
        usersPort.create(LoginName(loginName), Password(password))

    fun login(loginName: String, password: String): Session {
        val loginName = LoginName(loginName)
        val password = Password(password)
        return ((usersPort.findBy(loginName) ?: throw UserNotFoundException(loginName))
            .takeIf { it.password.matches(password) } ?: throw PasswordDidNotMatchException())
            .let { sessionPort.create(SessionCode.create(), it.id) }
    }

//    fun logout(sessionId: String) {
//        return
//    }

    fun identify(sessionCode: SessionCode): FilteredUserJson {
        return sessionPort.findBy(sessionCode)
            ?.let { usersPort.findBy(it.userId) }
            ?.let { FilteredUserJson(it.id.value, it.loginName.value) } ?: throw SessionDidNotFoundException()

    }

    fun list(): FilteredUsersJson {
        return usersPort.list()
            .let { FilteredUsersJson.from(it) }
    }

}
