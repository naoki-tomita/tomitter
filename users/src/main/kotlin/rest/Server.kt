package rest

import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CORS
import io.ktor.features.ContentNegotiation
import io.ktor.gson.GsonConverter
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.header
import io.ktor.response.respond
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun createServer() =
    embeddedServer(Netty, 8081) {
        install(ContentNegotiation) {
            register(ContentType.Application.Json, GsonConverter())
        }
        install(CORS) {
            anyHost()
        }
        install(Routing) {
            route("/v1") {
                healthCheck()
                create()
                login()
                identify()
                list()
            }
        }
}
