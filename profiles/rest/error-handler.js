const { ProfileNotFoundError, UserNotFoundError } = require("../domain/errors")

exports.handle = function handle(error) {
  if (error instanceof UserNotFoundError) {
    return {
      status: 404,
      error: { errorCode: "not_found", message: error.message }
    };
  } else if (error instanceof ProfileNotFoundError) {
    return {
      status: 404,
      error: { errorCode: "not_found", message: error.message }
    };
  }
  return {
    status: 500,
    error: { errorCode: "unexpected_error", message: error.message }
  }
}
