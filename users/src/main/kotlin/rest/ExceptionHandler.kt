package rest

import domain.*
import io.ktor.http.HttpStatusCode

fun handle(e: Throwable): Pair<HttpStatusCode, ErrorJson> {
    return when(e) {
        is UserNotFoundException -> HttpStatusCode.Forbidden to ErrorJson("login_failed", "Failed to login.")
        is PasswordDidNotMatchException -> HttpStatusCode.Forbidden to ErrorJson("login_failed", "Failed to login.")
        is UserAlreadyExistException -> HttpStatusCode.BadRequest to ErrorJson("user_already_exist", e.message!!)
        is SessionDidNotFoundException -> HttpStatusCode.Forbidden to ErrorJson("access_denied", "You does not logged in.")
        else -> HttpStatusCode.InternalServerError to ErrorJson("internal_server_error", "Error has occured.")
    }
}