package rest

import domain.ErrorResponse
import domain.PasswordDidNotMatchException
import domain.UserAlreadyExistException
import domain.UserNotFoundException
import io.ktor.http.HttpStatusCode

fun handle(e: Throwable): Pair<HttpStatusCode, ErrorResponse> {
    return when(e) {
        is UserNotFoundException -> HttpStatusCode.Forbidden to ErrorResponse("login_failed", "Failed to login.")
        is PasswordDidNotMatchException -> HttpStatusCode.Forbidden to ErrorResponse("login_failed", "Failed to login.")
        is UserAlreadyExistException -> HttpStatusCode.BadRequest to ErrorResponse("user_already_exist", e.message!!)
        else -> HttpStatusCode.InternalServerError to ErrorResponse("internal_server_error", "Error has occured.")
    }
}