package domain

import java.lang.Exception

data class CreateResponse(val id: Int, val loginName: String) {
    companion object {
        fun from(user: User): CreateResponse {
            return CreateResponse(user.id.value, user.loginName.value)
        }
    }
}

data class FilteredUser(val id: Int, val loginName: String) {
    companion object {
        fun from(user: User) = FilteredUser(user.id.value, user.loginName.value)
    }
}

data class ListResponse(val users: List<FilteredUser>) {
    companion object {
        fun from(users: Users): ListResponse {
            return ListResponse(users.map{ FilteredUser.from(it) })
        }
    }
}

data class ErrorResponse(val code: String, val message: String) {
    companion object {
        fun from(e: Exception): ErrorResponse {
            if (e is UserAlreadyExistException) {
                return ErrorResponse("0", e.message!!)
            }
            return ErrorResponse("foo", "bar")
        }
    }
}
