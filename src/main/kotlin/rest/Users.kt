package rest

import domain.CreateRequest
import domain.User
import gateway.SessionGateway
import gateway.Singleton
import gateway.UsersGateway
import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import port.SessionPort
import port.UsersPort
import usecase.UsersUsecase

/**
 * リクエストを受け取ってusecaseを呼び出す。
 * usecaseは問題があればExceptionをthrowする。
 * restはExceptionをハンドルして、レスポンスを返す。
 */

val usecase = UsersUsecase().let {
    it.usersPort = UsersGateway()
    it.sessionPort = SessionGateway()
    it
}

fun Route.create() {
    post("/users") {
        try {
            val request = call.receive<CreateRequest>()
            val response = usecase.create(request)
            call.respond(HttpStatusCode.OK, response)
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
        } catch (e: Throwable) {
            e.printStackTrace()
            val pair = handle(e)
            call.respond(pair.first, pair.second)
        }
    }
}

fun Route.identify() {
    get("/users/identify") {
        try {
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
            val response = usecase.list()
            call.respond(response)
        } catch (e: Throwable) {
            e.printStackTrace()
            val pair = handle(e)
            call.respond(pair.first, pair.second)
        }
    }
}
