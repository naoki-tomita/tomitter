package domain

import io.mockk.every
import io.mockk.mockk
import org.amshove.kluent.shouldEqual
import org.junit.jupiter.api.Test
import rest.ErrorJson

class JsonTest {

    @Test
    fun UserAlreadyExistExceptionからエラーレスポンスを生成する() {
        val loginName = mockk<LoginName>()

        every { loginName.value } returns "loginName"

        ErrorJson.from(UserAlreadyExistException(loginName)) shouldEqual
                ErrorJson("0", "loginName already exist.")
    }

}