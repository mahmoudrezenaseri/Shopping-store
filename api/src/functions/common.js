const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const User = require("src/models/users");

async function saveImage({ stream, filename }) {
    const goToRoot = "../..";
    const date = new Date();
    let dir = `/uploads/${date.getFullYear()}/${date.getMonth() + 1}`;
    mkdirp.sync(path.join(__dirname, `${goToRoot}/public/${dir}`))

    let filePath = `${dir}/${filename}`;

    if (fs.existsSync(path.join(__dirname, `${goToRoot}/public/${filePath}`))) {
        filePath = `${dir}/${Date.now()}-${filename}`;
    }

    return new Promise((resolve, reject) => {
        stream
            .pipe(fs.createWriteStream(path.join(__dirname, `${goToRoot}/public/${filePath}`)))
            .on('error', error => reject(error))
            .on('finish', () => resolve({ filePath }))
    });
}

async function checkIfAdmin(req, secretId) {

    const check = await User.CheckToken(req, secretId)
    if (check) {
        let user = await User.findById(check.id);
        return (user.level === 1) ? true : false;
    }

    return false;
}

module.exports = { saveImage, checkIfAdmin }