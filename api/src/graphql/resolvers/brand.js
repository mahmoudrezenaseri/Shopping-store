const Brand = require("src/models/users");
const validator = require("validator")
const { brandValidator } = require('src/graphql/validators/index.js');

const resolvers = {
    Query: {
        getAllBrand: async (param, args, { req, res }) => {

            const { brand } = await getAllBrandHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                })

            return brand.docs;
        }
    },
    Mutation: {
        createBrand: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
                return;
            }

            const { brand } = await createBrandHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                model: brand
            };
        }
    }
}

async function getAllBrandHandler(args) {

    const page = args.input.page || 1;
    const limit = args.input.limit || 10;
    const brand = await Brand.paginate({}, { page, limit, populate: { path: 'category' } })

    return new Promise((resolve, reject) => {
        resolve({ brand });
    });
}

async function createBrandHandler(args) {

    // validate user data
    await brandValidator.create.validateAsync(args.input, { abortEarly: false })

    const { createReadStream, filename } = await args.input.image;
    const stream = createReadStream();
    const { filePath } = await common.saveImage({ stream, filename });

    if (validator.isEmpty(filePath)) {
        throw Error("تصویری انتخاب نشده است.");
    }

    args.input.image = filePath;
    let brand = await Brand.create(args.input)

    return new Promise((resolve, reject) => {
        resolve({ brand })
    })
}
module.exports = resolvers;
