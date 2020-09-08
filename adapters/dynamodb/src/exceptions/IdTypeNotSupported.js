const AbstractError = require('./AbstractError');

class IdTypeNotSupported extends AbstractError {
  constructor(id, type) {
    const message = `Id (${id}) typed as ${type} is not supported by this adapter!`;
    const parameters = { id, type };
    const statusCode = 500;
    super('IdTypeNotSupported', message, parameters, statusCode);
  }
}

module.exports = IdTypeNotSupported;
