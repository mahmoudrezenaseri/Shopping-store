const Category = require("src/models/category");
const Seller = require("src/models/seller");

const { sellerValidator } = require('src/graphql/validators/index.js');

const resolvers = {
    Query: {
        getSellerByCategory: async (param, args) => {
            const { seller } = await getSellerByCategoryHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return seller;
        }
    },
    Mutation: {
        createSeller: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { seller } = await createSellerHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: seller
            };
        },
    }
}

const getSellerByCategoryHandler = async (args) => {

    // validate user data
    await sellerValidator.byCategory.validateAsync(args.input, { abortEarly: false });

    const seller = await Seller.find({ category: args.category }).populate("category").exec();

    return new Promise((resolve, reject) => {
        resolve({ seller })
    })
}

const createSellerHandler = async (args) => {

    // validate user data
    await sellerValidator.create.validateAsync(args.input, { abortEarly: false });

    if (!await Category.findOne({ _id: args.input.category })) {
        throw Error("دسته بندی در سیستم موجود نیست")
    }

    const category = await Category.findOne({ _id: args.input.category }).populate('parent').exec();
    if (category.parent != null) {
        throw Error("دسته بندی صحیح انتخاب نشده است")
    }

    if (await Seller.findOne({ name: args.input.name })) {
        throw Error("نام وارد شده در سیستم موجود است")
    }

    let seller = await Seller.create(args.input);

    return new Promise((resolve, reject) => {
        resolve({ seller })
    })
}


module.exports = resolvers;