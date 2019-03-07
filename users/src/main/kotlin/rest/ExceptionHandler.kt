package rest

import domain.*
import io.ktor.http.HttpStatusCode

fun handle(e: Throwable): Pair<HttpStatusCode, ErrorResponse> {
    return when(e) {
        is UserNotFoundException -> HttpStatusCode.Forbidden to ErrorResponse("login_failed", "Failed to login.")
        is PasswordDidNotMatchException -> HttpStatusCode.Forbidden to ErrorResponse("login_failed", "Failed to login.")
        is UserAlreadyExistException -> HttpStatusCode.BadRequest to ErrorResponse("user_already_exist", e.message!!)
        is SessionDidNotFoundException -> HttpStatusCode.Forbidden to ErrorResponse("access_denied", "You does not logged in.")
        else -> HttpStatusCode.InternalServerError to ErrorResponse("internal_server_error", "Error has occured.")
    }
}