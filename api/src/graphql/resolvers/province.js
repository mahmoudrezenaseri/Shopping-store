const Province = require("src/models/province");

const { provinceValidator, cityValidator } = require('src/graphql/validators');

const resolvers = {
    Query: {
        getAllProvince: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            funcs.common.checkIfAdmin(req, config.secretId, { path: "/province/getAllProvince" });

            const { province } = await getAllProvinceHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message, { path: "/province/getAllProvince" })
                });

            return province
        },
    },
    Mutation: {
        createProvince: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            funcs.common.checkIfAdmin(req, config.secretId, { path: "/province/createProvince" });

            const { province } = await createProvinceHandler(args).catch(async (error) => {
                funcs.error.errorHandler(error, error.code, error.message, { path: "/province/createProvince" });
            });

            return {
                status: 200,
                message: config.message.success.main,
                data: province
            };
        },
        createCity: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            funcs.common.checkIfAdmin(req, config.secretId, { path: "/province/createCity" });

            await createCityHandler(args).catch(async (error) => {
                funcs.error.errorHandler(error, error.code, error.message, { path: "/province/createCity" });
            });

            return {
                status: 200,
                message: config.message.success.main,
            };
        }
    }
}

const getAllProvinceHandler = async (args) => {

    const province = await Province.find();

    return new Promise((resolve, reject) => {
        resolve({ province })
    })
}

async function checkInputData(args) {

    // validate data
    const pModel = {
        fname: args.input.fname,
        ename: args.input.ename,
        code: args.input.code,
    }
    await provinceValidator.create.validateAsync(pModel, { abortEarly: false });

    // city validation
    if (args.input.city) {
        for (let index = 0; index < args.input.city.length; index++) {
            const element = args.input.city[index];
            await cityValidator.create.validateAsync(element, { abortEarly: false });
        }
    }

    // check if data with same titles exists or not
    if (await Province.findOne({ fname: args.input.fname } || { ename: args.input.ename } || { code: args.input.code })) {
        throw Error('استان با عنوان مشابه قبلا ثبت شده است');
    }
}

async function createProvinceHandler(args) {
    await checkInputData(args);

    let province = await Province.create({
        fname: args.input.fname,
        ename: args.input.ename,
        code: args.input.code,
        city: args.input.city,
    });

    return new Promise((resolve, reject) => {
        resolve({ province })
    })
}

const createCityHandler = async (args) => {

    // city validation
    await cityValidator.create.validateAsync(args.input, { abortEarly: false });

    const province = await Province.findById(args.input.provinceId);
    if (!province) {
        throw Error('استان مورد نظر یافت نشد');
    }

    await province.updateOne({ $addToSet: { city: args.input } });

    return new Promise((resolve, reject) => {
        resolve('ok')
    })
}

module.exports = resolvers;
