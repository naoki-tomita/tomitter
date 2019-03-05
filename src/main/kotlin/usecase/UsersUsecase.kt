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
        TODO("実装しろ")
    }

//    fun logout(sessionId: String) {
//        return
//    }

//    fun identify(sessionId: String): User {
//        return User(0, "foo", "bar")
//    }

    fun list(): ListResponse {
        val users = usersPort.list()
        return ListResponse.from(users)
    }

}
