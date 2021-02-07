const Product = require("src/models/product");
const ProductSpecDetails = require("src/models/productSpecDetails");
const Category = require("src/models/category");
const Warranty = require("src/models/warranty");
const Seller = require("src/models/seller");

const { productValidator, productAttributeValidator, productSpecDetailValueValidator } = require('src/graphql/validators');

const resolvers = {
    Query: {
        getByProductId: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { product } = await getByProductIdHandler(args).catch(async (error) => {
                handleErrors(error, error.code, error.message);
            });

            return {
                status: 200,
                data: product
            };
        },
        getByProductId: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { product } = await getByCategoryIdHandler(args).catch(async (error) => {
                handleErrors(error, error.code, error.message);
            });

            return {
                status: 200,
                data: product
            };
        }
    },
    Mutation: {
        createProduct: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { product } = await createProductHandler(args).catch(async (error) => {
                handleErrors(error, error.code, error.message);
            });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: product.docs
            };
        },
        updateProductAttribute: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            await updateProductAttributeHandler(args).catch(async (error) => {
                handleErrors(error, error.code, error.message);
            });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
            };
        },
        addProductAttribute: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            await addProductAttributeHandler(args).catch(async (error) => {
                handleErrors(error, error.code, error.message);
            });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
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

async function checkAttribute(attributes) {

    for (let index = 0; index < attributes.length; index++) {
        const element = attributes[index];

        if (!await Seller.findById(element.seller)) {
            throw Error('در قسمت ویژگی ها سطر ' + (index + 1) + ' فروشنده وارد شده وجود ندارد');
        }

        if (!await Warranty.findById(element.warranty)) {
            throw Error('در قسمت ویژگی ها سطر ' + (index + 1) + ' گارانتی وارد شده وجود ندارد');
        }
    }

    return attributes;
}

async function checkProductDetailsValue(details) {

    for (let index = 0; index < details.length; index++) {
        const element = details[index];

        if (!await ProductSpecDetails.findById(element.specDetail)) {
            throw Error('مشخصات وارد شده در سیستم ثبت نشده است');
        }
    }

    return details;
}

async function createProductHandler(args) {
    await checkInputData(args);

    const attribute = await checkAttribute(args.input.attribute);
    const detail = await checkProductDetailsValue(args.input.detail);

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

async function getByProductIdHandler(args) {

    await productValidator.getByProduct.validateAsync(args, { abortEarly: false });

    const product = await Product.findById(args.productId);

    if (!product) {
        throw Error('محصول مورد نظر یافت نشد');
    }

    return new Promise((resolve, reject) => {
        resolve({ product })
    })
}

async function getByCategoryIdHandler(args) {

    await productValidator.getByCategory.validateAsync(args, { abortEarly: false });

    const page = args.page || 1;
    const limit = args.limit || 10;

    const product = await Product.paginate({ category: args.categoryId }, { page, limit, populate: [{ path: 'category', path: 'brand', path: 'image' }] });

    if (product.length == 0) {
        throw Error('محصول مورد نظر یافت نشد');
    }

    return new Promise((resolve, reject) => {
        resolve({ product })
    })
}

async function addProductAttributeHandler(args) {

    // check product id 
    await productValidator.checkProductId.validateAsync({ _id: args.input.productId }, { abortEarly: false });

    // product attribute validation
    await productAttributeValidator.create.validateAsync(args.input.attribute, { abortEarly: false });

    const product = await Product.findById(args.input.productId);
    if (!product) {
        throw Error('محصول مورد نظر یافت نشد');
    }

    await Product.findOneAndUpdate({ _id: args.input.productId },
        { $addToSet: { attribute: args.input.attribute } },
        function (err, doc) {
            //console.log(doc);
        });

    return new Promise((resolve, reject) => {
        resolve('ok')
    })
}

async function updateProductAttributeHandler(args) {

    // check product id 
    await productValidator.checkId.validateAsync({ _id: args.input.productId }, { abortEarly: false });

    // check attribute id 
    await productAttributeValidator.checkId.validateAsync({ _id: args.input.attributeId }, { abortEarly: false });

    // product attribute validation
    await productAttributeValidator.update.validateAsync(args.input.attribute, { abortEarly: false });

    const attribute = await Product.findOne({ "_id": args.input.productId, "attribute._id": args.input.attributeId }, { "attribute.$": 1 });
    if (!attribute) {
        throw Error('موردی یافت نشد');
    }

    await Product.findOneAndUpdate({ _id: args.input.productId, "attribute._id": args.input.attributeId },
        { $set: { "attribute.$": args.input.attribute } });

    return new Promise((resolve, reject) => {
        resolve('ok')
    })
}


module.exports = resolvers;
