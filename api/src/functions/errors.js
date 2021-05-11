const logger = require("src/config/logger");

// functions
const handleErrors = (errors, code, exceptionMsg, logInfo) => {
    const error = new Error(exceptionMsg);
    error.code = code;
    // error.data = errors.details ? errors.details : errors;
    Error.captureStackTrace(error, handleErrors)

    console.log("error happend!")
    logger.error(exceptionMsg, logInfo)

    throw error;
}
module.exports = { handleErrors }