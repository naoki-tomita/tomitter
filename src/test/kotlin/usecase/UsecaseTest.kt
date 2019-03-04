package usecase

import domain.*
import gateway.UsersGateway
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkStatic
import io.mockk.verify
import org.amshove.kluent.invoking
import org.amshove.kluent.shouldEqual
import org.amshove.kluent.shouldThrow
import org.junit.jupiter.api.Test
import port.UsersPort

class UsecaseTest {

    @Test
    fun ユーザーを作成すること() {
        val usecase = UsersUsecase()
        val usersPort = mockk<UsersPort>()
        usecase.usersPort = usersPort

        val user = User(UserId(0), LoginName("loginName"), Password("password"))
        val response = CreateResponse(0, "loginName")

        every { usersPort.create(LoginName("loginName"), Password("password")) } returns user

        usecase.create(CreateRequest("loginName", "password")) shouldEqual response

        verify { usersPort.create(LoginName("loginName"), Password("password")) }
    }

    @Test
    fun すでに同じIDが存在する場合作成に失敗しエラーを投げること() {
        val usecase = UsersUsecase()
        val usersPort = mockk<UsersPort>()
        usecase.usersPort = usersPort

        val loginName = LoginName("loginName")
        val password = Password("password")
        val user = User(UserId(0), loginName, password)

        every { usersPort.create(loginName, password) } throws UserAlreadyExistException(loginName)

        invoking { usecase.create(CreateRequest("loginName", "password")) } shouldThrow
                UserAlreadyExistException::class

        verify { usersPort.create(loginName, password) }
    }

    @Test
    fun ユーザーの一覧を取得すること() {
        val usecase = UsersUsecase()
        val usersPort = mockk<UsersPort>()
        usecase.usersPort = usersPort

        val users = mockk<Users>()

        every { usersPort.list() } returns users

        usecase.list() shouldEqual

        verify { usersPort.list() }

    }
}