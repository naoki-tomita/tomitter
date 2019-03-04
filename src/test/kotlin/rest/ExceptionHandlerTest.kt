package rest

import domain.ErrorResponse
import domain.LoginName
import domain.PasswordDidNotMatchException
import domain.UserNotFoundException
import io.ktor.http.HttpStatusCode
import org.amshove.kluent.shouldEqual
import org.junit.jupiter.api.Test

class ExceptionHandlerTest {
    @Test
    fun UserNotFountExceptionを受けるとForbiddenを返す() {
        handle(UserNotFoundException(LoginName(""))) shouldEqual (HttpStatusCode.Forbidden to ErrorResponse("login_failed", "Failed to login."))
    }

    @Test
    fun PasswordDidNotMatchExceptionを受けるとForbiddenを返す() {
        handle(PasswordDidNotMatchException()) shouldEqual (HttpStatusCode.Forbidden to ErrorResponse("login_failed", "Failed to login."))
    }

}