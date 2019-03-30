package domain

data class UserId(val value: Int)
data class LoginName(val value: String)
data class Password(val value: String) {
    fun matches(password: Password): Boolean = password.value == value
}

data class User(val id: UserId, val loginName: LoginName, val password: Password) {
    companion object {
        fun from(id: Int, loginName: String, password: String): User {
            return User(UserId(id), LoginName(loginName), Password(password))
        }
    }
}

class Users(values: List<User>): FCC<User>(values)