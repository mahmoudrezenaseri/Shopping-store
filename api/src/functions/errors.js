
// functions
const handleErrors = (errors, code, exceptionMsg) => {
    const error = new Error(exceptionMsg);
    error.code = code;
    // error.data = errors.details ? errors.details : errors;
    Error.captureStackTrace(error, handleErrors)
    throw error;
}
module.exports = { handleErrors }