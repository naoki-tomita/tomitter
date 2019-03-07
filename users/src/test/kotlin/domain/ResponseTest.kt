package domain

import io.mockk.every
import io.mockk.mockk
import org.amshove.kluent.shouldEqual
import org.junit.jupiter.api.Test

class ResponseTest {

    @Test
    fun UserAlreadyExistExceptionからエラーレスポンスを生成する() {
        val loginName = mockk<LoginName>()

        every { loginName.value } returns "loginName"

        ErrorResponse.from(UserAlreadyExistException(loginName)) shouldEqual
                ErrorResponse("0", "loginName already exist.")
    }

}