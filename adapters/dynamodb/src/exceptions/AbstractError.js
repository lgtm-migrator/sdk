class AbstractError extends Error {
  constructor(code, message, parameters, statusCode) {
    super(message);
    this.code = code;
    this.parameters = parameters;
    this.statusCode = statusCode;
  }
}

module.exports = AbstractError;
