import values.request.CreateRequest
import values.response.ErrorResponse
import values.response.UserResponse
import io.ktor.application.*
import io.ktor.features.ContentNegotiation
import io.ktor.gson.GsonConverter
import io.ktor.http.*
import io.ktor.request.receive
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import services.users.PasswordDidNotMatchException
import services.users.UserAlreadyExistException
import services.users.UserNotFountException
import values.request.LoginRequest

fun main(args: Array<String>) {
    usecases.init()
    val server = embeddedServer(Netty, 8080) {
        install(ContentNegotiation) {
            register(ContentType.Application.Json, GsonConverter())
        }

        routing {
            get("/") {
                call.respondText("Hello World.")
            }
            post("/users") {
                try {
                    val request = call.receive<CreateRequest>()
                    val user = usecases.create(request)
                    call.respond(HttpStatusCode.Created, UserResponse.of(user))
                } catch (e: UserAlreadyExistException) {
                    e.printStackTrace()
                    call.respond(HttpStatusCode.BadRequest,
                        ErrorResponse("user_already_exist", e.toString())
                    )
                } catch (e: Throwable) {
                    e.printStackTrace()
                    call.respond(HttpStatusCode.InternalServerError, ErrorResponse("internal_error", e.toString()))
                }
            }
            get("/users") {
                call.respond(HttpStatusCode.OK, usecases.list())
            }
            post("/users/login") {
                try {
                    val request = call.receive<LoginRequest>()
                    val session = usecases.login(request)
                    call.response.header("set-cookie", "AUTH-SESSION=${session.sessionId.id}")
                    call.respond("")
                } catch (e: PasswordDidNotMatchException) {
                    e.printStackTrace()
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("login_failed", "Invalid login parameter."))
                } catch (e: UserNotFountException) {
                    e.printStackTrace()
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("login_failed", "Invalid login parameter."))
                } catch (e: Throwable) {
                    e.printStackTrace()
                    call.respond(HttpStatusCode.InternalServerError, ErrorResponse("internal_error", e.toString()))
                }
            }
        }
    }
    server.start(wait = true)
}
