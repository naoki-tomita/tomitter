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
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import port.UsersPort

class UsecaseTest {

    lateinit var usecase: UsersUsecase
    lateinit var usersPort: UsersPort

    @BeforeEach
    fun usecaseとusersPortを初期化する() {
        usecase = UsersUsecase()
        usersPort = mockk<UsersPort>()
        usecase.usersPort = usersPort
    }

    @Test
    fun ユーザーを作成すること() {
        val user = User(UserId(0), LoginName("loginName"), Password("password"))
        val response = CreateResponse(0, "loginName")

        every { usersPort.create(LoginName("loginName"), Password("password")) } returns user

        usecase.create(CreateRequest("loginName", "password")) shouldEqual response

        verify { usersPort.create(LoginName("loginName"), Password("password")) }
    }

    @Test
    fun すでに同じIDが存在する場合作成に失敗しエラーを投げること() {
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
        val users = mockk<Users>()

        every { usersPort.list() } returns users

        usecase.list() shouldEqual

        verify { usersPort.list() }
    }

    @Test
    fun `LoginName, Passwordが一致すればログインでき、セッションを生成すること`() {
        val user = mockk<User>()
        every { usersPort.findBy(LoginName("foo"), Password("bar")) } returns user

//        usecase.
    }
}