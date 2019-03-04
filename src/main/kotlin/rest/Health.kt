package rest

import io.ktor.application.call
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.get

data class HelloWorld(val message: String)

fun Route.healthCheck() {
    get("/") {
        call.respond(HelloWorld("Hello World."))
    }
}
