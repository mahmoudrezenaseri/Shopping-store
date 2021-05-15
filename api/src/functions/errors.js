const logger = require("src/logger/index");

// functions
const errorHandler = (errors, code, exceptionMsg, logPath) => {
    const error = new Error(exceptionMsg);
    error.code = code;
    // error.data = errors.details ? errors.details : errors;
    Error.captureStackTrace(error, errorHandler)

    logger.error(exceptionMsg, logPath)

    throw error;
}

module.exports = { errorHandler }