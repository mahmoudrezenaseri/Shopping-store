const Warranty = require("src/models/warranty");
const { warrantyValidator } = require('src/graphql/validators/index.js');

const resolvers = {
    Query: {
        getAllWarranty: async (param, args, { req, res }) => {

            const { warranty } = await getAllWarrantyHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message, { path: "/warranty/getAllWarranty" })
                })

            return warranty;
        }
    },
    Mutation: {
        createWarranty: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator          
            funcs.common.checkIfAdmin(req, config.secretId, { path: "/warranty/createWarranty" });

            const { warranty } = await createWarrantyHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message, { path: "/warranty/createWarranty" })
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: warranty
            };
        }
    }
}

async function getAllWarrantyHandler(args) {

    const warranty = await Warranty.find({})

    return new Promise((resolve, reject) => {
        resolve({ warranty });
    });
}

async function createWarrantyHandler(args) {

    // validate user data
    await warrantyValidator.create.validateAsync(args, { abortEarly: false })

    if (await Warranty.findOne({ name: args.name })) {
        throw Error(" گارانتی وارد شده در سیستم موجود است.")
    }

    let warranty = await Warranty.create(args)

    return new Promise((resolve, reject) => {
        resolve({ warranty })
    })
}
module.exports = resolvers;
