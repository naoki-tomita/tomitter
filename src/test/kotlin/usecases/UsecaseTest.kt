package usecases

import values.request.CreateRequest
import entities.User
import io.mockk.every
import io.mockk.mockkStatic
import org.junit.jupiter.api.Test
import org.assertj.core.api.Assertions.*
import org.junit.jupiter.api.assertThrows
import services.users.UserAlreadyExistException

class UsecaseTest {

    @Test
    fun ユーザーを作成すること() {
        mockkStatic("services.users.UsersKt")
        every { services.users.create("foo", "bar") } returns User(0, "foo", "bar")
        assertThat(create(CreateRequest("foo", "bar"))).isEqualTo(User(0, "foo", "bar"))
    }

    @Test
    fun すでに同じIDが存在する場合作成に失敗すること() {
        mockkStatic("services.users.UsersKt")
        every { services.users.create("exist", "password") } throws UserAlreadyExistException("exist")
        assertThrows<UserAlreadyExistException> { create(CreateRequest("exist", "password")) }
    }

    @Test
    fun ユーザーを返すこと() {
        mockkStatic("services.users.UsersKt")
        every { services.users.list() } returns listOf(User(0, "foo", "bar"), User(1, "bar", "foo"))
        assertThat(list()).isEqualTo(listOf(User(0, "foo", "bar"), User(1, "bar", "foo")))
    }

}