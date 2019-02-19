package values.response

import entities.User

data class UserResponse(val id: Int, val loginName: String) {
    companion object {
        fun of(user: User): UserResponse {
            return UserResponse(user.id, user.loginName)
        }
    }
}