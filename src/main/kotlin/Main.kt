import domain.request.CreateRequest
import domain.response.ErrorResponse
import domain.response.UserResponse
import io.ktor.application.*
import io.ktor.features.ContentNegotiation
import io.ktor.gson.GsonConverter
import io.ktor.http.*
import io.ktor.request.receive
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import services.users.UserAlreadyExistException

fun main(args: Array<String>) {
    usecase.init()
    val server = embeddedServer(Netty, 8080) {
        install(ContentNegotiation) {
            register(ContentType.Application.Json, GsonConverter())
        }

        routing {
            get("/") {
                call.respondText("Hello World.")
            }
            post("/users/create") {
                try {
                    val request = call.receive<CreateRequest>()
                    val user = usecase.create(request)
                    call.respond(HttpStatusCode.Created, UserResponse.of(user))
                } catch (e: UserAlreadyExistException) {
                    e.printStackTrace()
                    call.respond(HttpStatusCode.BadRequest,
                        ErrorResponse("user_already_exist", e.toString())
                    )
                } catch (e: Throwable) {
                    e.printStackTrace()
                    call.respond(HttpStatusCode.InternalServerError, e)
                }
            }
            get("/users") {
                call.respond(HttpStatusCode.OK, usecase.list())
            }
        }
    }
    server.start(wait = true)
}
