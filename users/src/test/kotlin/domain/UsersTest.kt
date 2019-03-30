package domain

import org.amshove.kluent.shouldEqual
import org.junit.jupiter.api.Test

class UsersTest {
    @Test
    fun パスワードが一致する場合trueを返す() {
        val password = Password("foo")
        password.matches(Password("foo")) shouldEqual true
    }

    @Test
    fun パスワードが一致しない場合falseを返す() {
        val password = Password("foo")
        password.matches(Password("bar")) shouldEqual false
    }
}