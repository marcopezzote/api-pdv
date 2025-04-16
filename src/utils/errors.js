class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError";
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = "DatabaseError";
  }
}

module.exports = {
  APIError,
  DatabaseError,
};
