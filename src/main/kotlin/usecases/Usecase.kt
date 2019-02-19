package usecases
import values.request.CreateRequest
import entities.Session
import entities.User
import services.sessions.SessionIdFactory
import values.request.LoginRequest

fun init() {
    services.databases.init()
}

fun create(request: CreateRequest): User {
    return services.users.create(request.loginName, request.password)
}

fun login(request: LoginRequest): Session {
    val user = services.users.findBy(request.loginName, request.password)
    return services.sessions.create(user)
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
