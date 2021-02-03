const mongoose = require("mongoose");

const Product = require("src/models/product");
const ProductSpecDetails = require("src/models/productSpecDetails");
const Category = require("src/models/category");
const Brand = require("src/models/brand");
const Warranty = require("src/models/warranty");
const Seller = require("src/models/seller");

const { productValidator, productAttributeValidator, productSpecDetailValueValidator } = require('src/graphql/validators');

const resolvers = {
    Query: {

    },
    Mutation: {
        createProduct: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            // console.log("here error happend!")

            const { product } = await createProductHandler(args).catch(async (error) => {

                handleErrors(error, error.code, error.message);
            });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: product
            };
        }
    }
}

async function checkInputData(args) {

    // validate data
    const pModel = {
        fname: args.input.fname,
        ename: args.input.ename,
        description: args.input.description,
        brand: args.input.brand,
        category: args.input.category,
        image: args.input.image,
    }
    await productValidator.create.validateAsync(pModel, { abortEarly: false });

    // product attribute validation
    for (let index = 0; index < args.input.attribute.length; index++) {
        const element = args.input.attribute[index];
        await productAttributeValidator.create.validateAsync(element, { abortEarly: false });
    }

    // product detail validation
    for (let index = 0; index < args.input.detail.length; index++) {
        const element = args.input.detail[index];
        await productSpecDetailValueValidator.create.validateAsync(element, { abortEarly: false });
    }

    // check if data with same titles exists or not
    if (await Product.findOne({ fname: args.input.fname } || { ename: args.input.ename })) {
        throw Error('محصول با عنوان مشابه قبلا ثبت شده است');
    }

    // choosen category should not be empty and belong to first level categories 
    const category = await Category.findById(args.input.category);
    if (category == null || category.parent == null) {
        throw Error("دسته بندی انتخاب شده صحیح نیست");
    }

    // brand should not be empty
    // const brand = await Brand.findById(args.input.brand);
    // if (!brand) {
    //     throw Error("برند وارد شده در سیستم موجود نمی باشد");
    // }
}

async function createAttribute(attributes) {

    let arr = [];
    for (let index = 0; index < attributes.length; index++) {
        const element = attributes[index];

        if (!await Seller.findById(element.seller)) {
            throw Error('در قسمت ویژگی ها سطر ' + (index + 1) + ' فروشنده وارد شده وجود ندارد');
        }

        if (!await Warranty.findById(element.warranty)) {
            throw Error('در قسمت ویژگی ها سطر ' + (index + 1) + ' گارانتی وارد شده وجود ندارد');
        }

        // let attribute = await ProductAttribute.create([element]);
        arr[index] = element;
    }

    return arr;
}

async function createProductDetailsValue(details) {

    let arr = [];
    for (let index = 0; index < details.length; index++) {
        const element = details[index];

        if (!await ProductSpecDetails.findById(element.specDetail)) {
            throw Error('مشخصات وارد شده در سیستم ثبت نشده است');
        }

        // const model = await ProductSpecDetailValue.create([element]);
        arr[index] = element;
    }

    return arr;
}

async function createProductHandler(args) {
    await checkInputData(args);

    const attribute = await createAttribute(args.input.attribute);
    const detail = await createProductDetailsValue(args.input.detail);

    let product = await Product.create([{
        fname: args.input.fname,
        ename: args.input.ename,
        description: args.input.description,
        brand: args.input.brand,
        category: args.input.category,
        image: args.input.image,
        attribute: attribute,
        detail: detail,
    }]);

    return new Promise((resolve, reject) => {
        resolve({ product })
    })
}

module.exports = resolvers;
