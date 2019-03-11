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
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun createServer() =
    embeddedServer(Netty, 80) {
        install(ContentNegotiation) {
            register(ContentType.Application.Json, GsonConverter())
        }
        install(CORS) {
            anyHost()
        }

        routing {
            healthCheck()
            create()
            login()
            identify()
            list()
        }
}
