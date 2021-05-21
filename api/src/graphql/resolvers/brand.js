const Brand = require("src/models/brand");
const validator = require("validator")
const { brandValidator } = require('src/graphql/validators/index.js');

const resolvers = {
    Query: {
        getAllBrand: async (param, args, { req, res }) => {

            const { brand } = await getAllBrandHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message, { path: "/brand/getAllBrand" })
                })

            return brand.docs;
        }
    },
    Mutation: {
        createBrand: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            funcs.common.checkIfAdmin(req, config.secretId, { path: "/brand/createBrand" });

            const { brand } = await createBrandHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message, { path: "/brand/createBrand" })
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: brand
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
    const { filePath } = await funcs.file.uploadFile({ stream, filename });

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
