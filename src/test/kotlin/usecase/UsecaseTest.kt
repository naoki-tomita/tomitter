package usecase

import domain.*
import gateway.UsersGateway
import io.mockk.*
import org.amshove.kluent.invoking
import org.amshove.kluent.mock
import org.amshove.kluent.shouldEqual
import org.amshove.kluent.shouldThrow
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import port.SessionPort
import port.UsersPort

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
        val filteredUser = mockk<FilteredUser>()
        val response = mockk<ListResponse>()

        every { usersPort.list() } returns users
        mockkObject(ListResponse.Companion)
        every { ListResponse.Companion.from(users) } returns response

        usecase.list() shouldEqual response

        verify { usersPort.list() }
        verify { ListResponse.from(users) }
    }

    @Test
    fun `LoginName, Passwordが一致すればログインでき、セッションを生成すること`() {
        val user = mockk<User>()
        val session = mockk<Session>()
        val userId = mockk<UserId>()
        every { usersPort.findBy(LoginName("foo"), Password("bar")) } returns user
        every { sessionPort.create(any(), userId) } returns session
        every { user.id } returns userId

        usecase.login(LoginRequest("foo", "bar")) shouldEqual session
    }

    @Test
    fun 受け取ったSessionCodeからユーザーを特定すること() {
        val sessionCode = mockk<SessionCode>()
        val session = mockk<Session>()
        val userId = mockk<UserId>()
        val user = mockk<User>()
        val response = IdentifyResponse(0, "foo")

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
