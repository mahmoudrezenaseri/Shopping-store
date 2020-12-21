const ProductSpecs = require("src/models/productSpecs");
const Category = require("src/models/category");

const { productSpecsValidator } = require('src/graphql/validators/index.js');

const resolvers = {
    Query: {
        getProductSpecsByCategory: async (param, args, { req, res }) => {

            const { specs } = await getByCategoryHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return specs;
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
                data: pSpecs
            };
        }
    }
}

async function getByCategoryHandler(args) {

    // validate user data
    await productSpecsValidator.getByCategory.validateAsync(args, { abortEarly: false });

    const category = await Category.findById(args.category).populate("parent").exec();
    let specs = [];

    if (category == null) {
        throw Error("برای دسته بندی معیار امتیازدهی ثبت نشده است");
    } else if (category.parent != null && category.parent.parent == null) {
        specs = await ProductSpecs.find({ category: args.category }).populate("category").exec();
    }

    return new Promise((resolve, reject) => {
        resolve({ specs })
    });
}

async function createProductSpecsHandler(args) {

    // validate user data
    await productSpecsValidator.create.validateAsync(args.input, { abortEarly: false })

    if (!await Category.findOne({ _id: args.input.category })) {
        throw Error("دسته بندی در سیستم موجود نیست");
    }

    const category = await Category.findOne({ _id: args.input.category }).populate('parent').exec();
    if (category.parent == null || category.parent.parent != null) {
        throw Error("دسته بندی صحیح انتخاب نشده است");
    }

    if (await ProductSpecs.findOne({ _id: args.input.category } && { name: args.input.name })) {
        throw Error("نام با دسته بندی وارد شده قبلا ثبت شده است");
    }

    let pSpecs = await ProductSpecs.create(args.input);

    return new Promise((resolve, reject) => {
        resolve({ pSpecs })
    });
}

module.exports = resolvers;
