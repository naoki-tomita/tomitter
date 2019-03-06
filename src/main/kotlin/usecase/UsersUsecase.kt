package usecase

import domain.*
import port.SessionPort
import port.UsersPort

class UsersUsecase {

    lateinit var usersPort: UsersPort
    lateinit var sessionPort: SessionPort

    fun create(request: CreateRequest): CreateResponse {
        val loginName = LoginName(request.loginName)
        val password = Password(request.password)
        val user = usersPort.create(loginName, password)
        return CreateResponse.from(user)
    }

    fun login(request: LoginRequest): Session {
        val user = usersPort.findBy(LoginName(request.loginName), Password(request.password))
        val session = sessionPort.create(SessionCode.create(), user.id)
        return session
    }

//    fun logout(sessionId: String) {
//        return
//    }

    fun identify(sessionCode: SessionCode): IdentifyResponse {
        return sessionPort.findBy(sessionCode)
            .let { usersPort.findBy(it.userId) }
            .let { IdentifyResponse(it.id.value, it.loginName.value) }

    }

    fun list(): ListResponse {
        val users = usersPort.list()
        return ListResponse.from(users)
    }

}
