const Product = require("src/models/product");
const Category = require("src/models/category");
const Brand = require("src/models/brand");
const Warranty = require("src/models/warranty");
const Seller = require("src/models/seller");

const { productValidator } = require('src/graphql/validators');

const resolvers = {
    Query: {

    },
    Mutation: {
        createProduct: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { product } = await createProductHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: product
            };
        }
    }
}

async function createProductHandler(args) {

    // validate user data
    await productValidator.create.validateAsync(args.input, { abortEarly: false })

    const category = await Category.findById(args.input.category);
    const brand = await Brand.findById(args.input.brand);
    const warranty = await Warranty.findById(args.input.warranty);
    const seller = await Seller.findById(args.input.seller);

    // دسته بندی سطح اول نباید باشد
    if (category == null || category.parent == null) {
        throw Error("دسته بندی انتخاب شده صحیح نیست");
    }

    if(!brand){
        throw Error("برند وارد شده در سیستم موجود نمی باشد");
    }

    if(!warranty){
        throw Error("گارانتی وارد شده در سیستم موجود نمی باشد");
    }

    if(!seller){
        throw Error("فروشنده وارد شده در سیستم موجود نمی باشد");
    }


    let product = await Product.create(args.input);

    return new Promise((resolve, reject) => {
        resolve({ product })
    })
}

module.exports = resolvers;
