package usecase

import domain.*
import port.SessionPort
import port.UsersPort

class UsersUsecase {

    lateinit var usersPort: UsersPort
    lateinit var sessionPort: SessionPort

    fun create(request: CreateRequest): CreateResponse {
        return usersPort.create(LoginName(request.loginName), Password(request.password))
            .let { CreateResponse.from(it) }
    }

    fun login(request: LoginRequest): Session {
        return usersPort.findBy(LoginName(request.loginName), Password(request.password))
            .let { sessionPort.create(SessionCode.create(), it.id) }
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
        return usersPort.list()
            .let { ListResponse.from(it) }
    }

}
