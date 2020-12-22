const mongoose = require("mongoose");

const Product = require("src/models/product");
const ProductAttribute = require("src/models/productAttribute");
const Category = require("src/models/category");
const Brand = require("src/models/brand");
const Warranty = require("src/models/warranty");
const Seller = require("src/models/seller");

const { productValidator, productAttributeValidator } = require('src/graphql/validators');

const resolvers = {
    Query: {

    },
    Mutation: {
        createProduct: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const session = mongoose.startSession();

            Promise.all([validateData(args),
                 createAttribute(args.input.attribute),
                  p3, p4]).catch((error) => {
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

async function validateData(args) {

    // validate data
    await productValidator.create.validateAsync(args.input, { abortEarly: false });
    await productAttributeValidator.create.validateAsync(args.input.attribute, { abortEarly: false });

    if (await Product.findOne({ fname: args.input.fname } || { ename: args.input.ename })) {
        throw Error('محصول با عنوان مشابه قبلا ثبت شده است');
    }

    const category = await Category.findById(args.input.category);
    const brand = await Brand.findById(args.input.brand);

    // دسته بندی سطح اول نباید باشد
    if (category == null || category.parent == null) {
        throw Error("دسته بندی انتخاب شده صحیح نیست");
    }

    if (!brand) {
        throw Error("برند وارد شده در سیستم موجود نمی باشد");
    }

    return new Promise((resolve, reject) => {
        resolve({ product })
    })
}

async function createAttribute(attribute) {

    let pAttribute = await ProductAttribute.create(attribute);
}

module.exports = resolvers;
