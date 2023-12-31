export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  FORBIDDEN = 403,
  CREATED = 201,
}

export enum ErrorMessage {
  INTERNAL_SERVER_ERROR = "Internal server error",
  UNAUTHORIZED = "Unauthorized",
  NOT_FOUND = "Not found",
  BAD_REQUEST = "Bad request",
  FORBIDDEN = "Forbidden",
}
