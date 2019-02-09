package usecase
import domain.request.CreateRequest
import domain.Session
import domain.SessionId
import domain.User

fun init() = services.users.init()


fun create(request: CreateRequest): User {
    return services.users.create(request.loginName, request.password)
}

fun login(loginName: String, password: String): Session {
    return Session(0, SessionId(0), 0)
}

fun logout(sessionId: String) {
    return
}

fun identify(sessionId: String): User {
    return User(0, "foo", "bar")
}

fun list(): List<User> {
    return services.users.list()
}
