// const server_address = "http://localhost:4000"
const server_address = "https://myshop.iran.liara.run"

// const graphql_address = "http://localhost:4000/graphql"
const graphql_address = "https://myshop.iran.liara.run/graphql"

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
        baseURL: graphql_address
    },
    server: {
        baseURL: server_address
    },
    defaults: {
        image: "/default-placeholder.png"
    },
    google: {
        recaptcha: {
            siteKey: "6LcILlgaAAAAAGsmNA8LeKbC9xQ7kumIcIe9QJ5a"
        }
    },
    swal: {
        fa: {
            delete: {
                title: 'اطمینان دارید ؟',
                text: "اطلاعات حذف شده قابل برگشت نیستند",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'بله, حذف شود!',
                cancelButtonText: "لغو"
            }
        }
    }
};