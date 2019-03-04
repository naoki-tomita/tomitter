package rest

import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.ContentNegotiation
import io.ktor.gson.GsonConverter
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.header
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun createServer() =
    embeddedServer(Netty, 8080) {
        install(ContentNegotiation) {
            register(ContentType.Application.Json, GsonConverter())
        }

        routing {
            healthCheck()
            create()
            login()
            identify()
            list()
//            post("/users/login") {
//                try {
//                    val request = call.receive<LoginRequest>()
//                    val session = login(request)
//                    call.response.header("set-cookie", "AUTH-SESSION=${session.sessionId.id}")
//                    call.respond("")
//                } catch (e: PasswordDidNotMatchException) {
//                    e.printStackTrace()
//                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("login_failed", "Invalid login parameter."))
//                } catch (e: UserNotFoundException) {
//                    e.printStackTrace()
//                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("login_failed", "Invalid login parameter."))
//                } catch (e: Throwable) {
//                    e.printStackTrace()
//                    call.respond(HttpStatusCode.InternalServerError, ErrorResponse("internal_error", e.toString()))
//                }
//            }
//        }
    }
}
