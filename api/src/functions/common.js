const User = require("src/models/users");

async function checkIfAdmin(req, secretId) {

    const check = await User.CheckToken(req, secretId)
    if (check) {
        let user = await User.findById(check.id);
        return (user.level === 1) ? true : false;
    }

    return false;
}

module.exports = { checkIfAdmin }