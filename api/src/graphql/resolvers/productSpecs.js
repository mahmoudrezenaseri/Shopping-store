const ProductSpecs = require("src/models/productSpecs");
const Category = require("src/models/category");

const { productSpecsValidator } = require('src/graphql/validators/index.js');

const resolvers = {
    Query: {
        getAllProductSpecs: async (param, args, { req, res }) => {

        }
    },
    Mutation: {
        createProductSpecs: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { pSpecs } = await createProductSpecsHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: pSpecs.populate('category')
            };
        }
    }
}

async function getAllBrandHandler(args) {


}

async function createProductSpecsHandler(args) {

    // validate user data
    await productSpecsValidator.create.validateAsync(args.input, { abortEarly: false })

    if (!await Category.findOne({ _id: args.input.category })) {
        handleErrors(null, 403, "دسته بندی در سیستم موجود نیست");
    }

    const category = await Category.findOne({ _id: args.input.category }).populate('parent').exec();
    if (category.parent == null || category.parent.parent != null) {
        handleErrors(null, 403, "دسته بندی صحیح انتخاب نشده است");
    }

    if (await ProductSpecs.findOne({ _id: args.input.category } && { name: args.input.name })) {
        handleErrors(null, 403, "نام با دسته بندی وارد شده قبلا ثبت شده است");
    }

    let pSpecs = await ProductSpecs.create(args.input);

    return new Promise((resolve, reject) => {
        resolve({ pSpecs })
    });
}

module.exports = resolvers;
