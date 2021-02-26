const file_localhost = "http://localhost:4000"
const file_liara = "https://mysite.iran.liara.run"

const graphql_liara = "https://mysite.iran.liara.run/graphql"
const graphql_localhost = "http://localhost:4000/graphql"

module.exports = global.config = {
    message: {
        error: {
            fa: "در انجام عملیات خطا رخ داد!",
            en: "Error Occured!"
        },
        success: {
            fa: "عملیات با موفقیت انجام شد.",
            en: "Successfull"
        }
    },
    axios: {
        baseURL: graphql_localhost
    },
    fileDirectory: file_localhost
};