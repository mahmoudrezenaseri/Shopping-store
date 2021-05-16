const User = require("src/models/users");
const config = require("src/config/index");

async function checkToken(req, secretId) {

    const check = await User.CheckToken(req, secretId)
    if (check) {
        let user = await User.findById(check.id);
        return (user.level === 1) ? true : false;
    }

    return false;
}

async function checkIfAdmin(req, secretId, metaData) {
    if (!await checkToken(req, secretId)) {
        funcs.error.errorHandler(null, 403, config.message.error.forbidden, metaData);
    }
}


module.exports = { checkIfAdmin }