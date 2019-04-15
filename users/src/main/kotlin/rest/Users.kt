package rest

import domain.*
import gateway.SessionGateway
import gateway.UsersGateway
import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.header
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import usecase.UsersUsecase
import java.lang.Exception

val usecase = UsersUsecase()

fun Route.create() {
    post("/users") {
        try {
            call.receive<CreateUserJson>()
                .let { usecase.create(it.loginName, it.password) }
                .let { call.respond(HttpStatusCode.OK, it) }
        } catch (e: Throwable) {
            e.printStackTrace()
            val pair = handle(e)
            call.respond(pair.first, pair.second)
        }
    }
}

fun Route.login() {
    post("/users/login") {
        try {
            call.receive<LoginUserJson>()
                .let { usecase.login(it.loginName, it.password) }
                .let {
                    call.response.header("set-cookie", "AUTH-SESSION=${it.sessionCode.value}; path=/;")
                    call.respondText("{}", ContentType.Application.Json)
                }
        } catch (e: Throwable) {
            e.printStackTrace()
            val pair = handle(e)
            if (pair.first == HttpStatusCode.Forbidden) {
                call.response.header("set-cookie", "AUTH-SESSION=;")
            }
            call.respond(pair.first, pair.second)
        }
    }
}

fun Route.identify() {
    get("/users/identify") {
        try {
            (call.request.cookies["AUTH-SESSION"] ?: "")
                .let { usecase.identify(SessionCode(it)) }
                .let { call.respond(it) }
        } catch (e: Throwable) {
            e.printStackTrace()
            val pair = handle(e)
            call.respond(pair.first, pair.second)
        }
    }
}

fun Route.list() {
    get("/users") {
        try {
            usecase.list()
                .let { call.respond(it) }
        } catch (e: Throwable) {
            e.printStackTrace()
            val pair = handle(e)
            call.respond(pair.first, pair.second)
        }
    }
}

data class CreateUserJson(val loginName: String, val password: String)
data class LoginUserJson(val loginName: String, val password: String)

data class FilteredUserJson(val id: Int, val loginName: String) {
    companion object {
        fun from(user: User) = FilteredUserJson(user.id.value, user.loginName.value)
    }
}

data class FilteredUsersJson(val users: List<FilteredUserJson>) {
    companion object {
        fun from(users: Users): FilteredUsersJson = users.map(FilteredUserJson.Companion::from).let(::FilteredUsersJson)
    }
}

data class ErrorJson(val code: String, val message: String) {
    companion object {
        fun from(e: Exception): ErrorJson {
            if (e is UserAlreadyExistException) {
                return ErrorJson("0", e.message!!)
            }
            return ErrorJson("foo", "bar")
        }
    }
}