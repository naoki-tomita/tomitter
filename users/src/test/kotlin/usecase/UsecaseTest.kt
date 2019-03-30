package usecase

import domain.*
import io.mockk.*
import org.amshove.kluent.invoking
import org.amshove.kluent.shouldEqual
import org.amshove.kluent.shouldThrow
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import port.SessionPort
import port.UsersPort
import rest.FilteredUserJson
import rest.FilteredUsersJson

class UsecaseTest {

    lateinit var usecase: UsersUsecase
    lateinit var usersPort: UsersPort
    lateinit var sessionPort: SessionPort

    @BeforeEach
    fun `usecaseとusersPort, sessionPortを初期化する`() {
        usecase = UsersUsecase()
        usersPort = mockk<UsersPort>()
        sessionPort = mockk<SessionPort>()
        usecase.usersPort = usersPort
        usecase.sessionPort = sessionPort
    }

    @AfterEach
    fun `後処理を行う`() {
        unmockkAll()
    }

    @Test
    fun ユーザーを作成すること() {
        val user = User(UserId(0), LoginName("loginName"), Password("password"))

        every { usersPort.create(LoginName("loginName"), Password("password")) } returns user

        usecase.create("loginName", "password") shouldEqual user

        verify { usersPort.create(LoginName("loginName"), Password("password")) }
    }

    @Test
    fun すでに同じIDが存在する場合作成に失敗しエラーを投げること() {
        val loginName = LoginName("loginName")
        val password = Password("password")

        every { usersPort.create(loginName, password) } throws UserAlreadyExistException(loginName)

        invoking { usecase.create("loginName", "password") } shouldThrow
                UserAlreadyExistException::class

        verify { usersPort.create(loginName, password) }
    }

    @Test
    fun ユーザーの一覧を取得すること() {
        val users = mockk<Users>()
        val response = mockk<FilteredUsersJson>()

        every { usersPort.list() } returns users
        mockkObject(FilteredUsersJson.Companion)
        every { FilteredUsersJson.Companion.from(users) } returns response

        usecase.list() shouldEqual response

        verify { usersPort.list() }
        verify { FilteredUsersJson.from(users) }
    }

    @Test
    fun `LoginName, Passwordが一致すればログインでき、セッションを生成すること`() {
        val user = mockk<User>()
        val session = mockk<Session>()
        val userId = mockk<UserId>()
        every { usersPort.findBy(LoginName("foo")) } returns user
        every { user.password.matches(Password("bar")) } returns true
        every { sessionPort.create(any(), userId) } returns session
        every { user.id } returns userId

        usecase.login("foo", "bar") shouldEqual session
    }

    @Test
    fun `LoginNameに該当するユーザーが存在しなければUserNotFoundExceptionを投げること`() {
        every { usersPort.findBy(LoginName("foo")) } returns null

        { usecase.login("foo", "bar") } shouldThrow UserNotFoundException::class
    }

    @Test
    fun `パスワードが一致しなければ、PasswordDidNotMatchExceptionを投げること`() {
        val user = mockk<User>()
        every { usersPort.findBy(LoginName("foo")) } returns user
        every { user.password.matches(Password("bar")) } returns false

        { usecase.login("foo", "bar") } shouldThrow PasswordDidNotMatchException::class
    }

    @Test
    fun 受け取ったSessionCodeからユーザーを特定すること() {
        val sessionCode = mockk<SessionCode>()
        val session = mockk<Session>()
        val userId = mockk<UserId>()
        val user = mockk<User>()
        val response = FilteredUserJson(0, "foo")

        every { sessionPort.findBy(sessionCode) } returns session
        every { session.userId } returns userId
        every { usersPort.findBy(userId) } returns user
        every { user.id.value } returns 0
        every { user.loginName.value } returns "foo"

        usecase.identify(sessionCode) shouldEqual response

        verify { sessionPort.findBy(sessionCode) }
        verify { session.userId }
        verify { usersPort.findBy(userId) }
        verify { user.id.value }
        verify { user.loginName.value }
    }
}
