const Banner = require("src/models/banner");
const Category = require("src/models/category");
const FileManager = require("src/models/filemanager");

const { bannerValidator } = require('src/graphql/validators');

const resolvers = {
    Query: {
        getAllBanner: async (param, args, { req, res }) => {

            const { banner } = await getAllBannerHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                })

            return banner;
        }
    },
    Mutation: {
        createBanner: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await funcs.common.checkIfAdmin(req, config.secretId)) {
                funcs.error.errorHandler(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { banner } = await createBannerHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: banner
            };
        }
    }
}

async function getAllBannerHandler() {

    const banner = await Banner.find({}).populate("FileManager").populate("Category");

    return new Promise((resolve, reject) => {
        resolve({ banner });
    });
}

async function createBannerHandler(args) {

    // validate user data
    await bannerValidator.create.validateAsync(args, { abortEarly: false })

    const category = await Category.findById(args.category);

    // دسته بندی سطح اول نباید باشد
    if (category == null || category.parent == null) {
        throw Error("دسته بندی انتخاب شده صحیح نیست")
    }

    if (!await FileManager.findById(args.image)) {
        throw Error("چنین تصویری در سیستم موجود نیست");
    }

    let banner = await Banner.create(args);

    return new Promise((resolve, reject) => {
        resolve({ banner })
    })
}

module.exports = resolvers;
