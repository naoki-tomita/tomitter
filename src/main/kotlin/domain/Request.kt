package domain

data class CreateRequest(val loginName: String, val password: String)
data class LoginRequest(val loginName: String, val password: String)