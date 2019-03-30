package usecase

import domain.*
import port.SessionPort
import port.UsersPort

class UsersUsecase {

    lateinit var usersPort: UsersPort
    lateinit var sessionPort: SessionPort

    // Responseという名前は不適切
    fun create(request: CreateRequest): CreateResponse {
        return usersPort.create(LoginName(request.loginName), Password(request.password))
            .let { CreateResponse.from(it) }
    }

    fun login(request: LoginRequest): Session {
        val loginName = LoginName(request.loginName)
        val password = Password(request.password)
        return ((usersPort.findBy(loginName) ?: throw UserNotFoundException(loginName))
            .takeIf { it.password.matches(password) } ?: throw PasswordDidNotMatchException())
            .let { sessionPort.create(SessionCode.create(), it.id) }
    }

//    fun logout(sessionId: String) {
//        return
//    }

    fun identify(sessionCode: SessionCode): IdentifyResponse {
        return sessionPort.findBy(sessionCode)
            ?.let { usersPort.findBy(it.userId) }
            ?.let { IdentifyResponse(it.id.value, it.loginName.value) } ?: throw SessionDidNotFoundException()

    }

    fun list(): ListResponse {
        return usersPort.list()
            .let { ListResponse.from(it) }
    }

}
