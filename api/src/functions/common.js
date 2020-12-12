const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const User = require("src/models/users");

function saveImage({ stream, filename }) {
    const date = new Date();
    let dir = `uploads/${date.getFullYear()}/${date.getMonth() + 1}`;
    mkdirp.sync(path.join(__dirname, `/public/${dir}`))

    let filePath = `${dir}/${filename}`;
    if (fs.existsSync(path.join(__dirname, `/public/${filePath}`))) {
        filePath = `${dir}/${Date.now()}-${filename}`;
    }

    return new Promise((resolve, reject) => {
        stream
            .pipe(fs.createWriteStream(path.join(__dirname, `/public/${filePath}`)))
            .on('error', error => reject(error))
            .on('finish', () => { resolve({ filePath }) })
    })
}

async function checkIfAdmin(req, secretId) {

    const check = await User.CheckToken(req, secretId)
    if (check) {
        let user = await User.findById(check.id);
        console.log(user)
        return (user.level === 1) ? true : false;
    }
    console.log("user not found")

    return false;
}

module.exports = { saveImage, checkIfAdmin }