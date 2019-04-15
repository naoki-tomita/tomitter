package domain

import java.lang.Exception

class UserAlreadyExistException(loginName: LoginName): Exception("${loginName.value} already exist.")
class PasswordDidNotMatchException: Exception("Password did not match.")
class UserNotFoundException(loginName: LoginName): Exception("${loginName.value} is not found.")
class SessionDidNotFoundException: Exception("SessionEntity did not found.")