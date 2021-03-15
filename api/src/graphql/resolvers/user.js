const User = require("src/models/users");
const bcrypt = require("bcryptjs");
const { userValidator } = require('src/graphql/validators/index.js');

const resolvers = {
    Query: {
        login: async (param, args) => {
            const { user, token } = await loginHandler(args)
                .catch((errors) => {
                    handleErrors(errors, errors.code, errors.message)
                });

            return {
                user: user,
                token: token,
                refreshToken: ""
            }
        },
        getAllUserWithPagination: async (param, args, { req, res }) => {
            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { user } = await getAllUserWithPaginationHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                totalDocs: user.totalDocs,
                hasNextPage: user.hasNextPage,
                page: user.page,
                users: user.docs,
            };
        }
    },
    Mutation: {
        register: async (param, args) => {
            const { user, token } = await registerHandler(args)
                .catch((errors) => {
                    handleErrors(errors, errors.code, errors.message)
                })

            return {
                user: user,
                token: token,
                refreshToken: ""
            };
        }
    }
}

// queries
async function loginHandler(args) {

    // validate user data
    await userValidator.login.validateAsync(args, { abortEarly: false })

    // check if the user is already in the database width the same mobile number
    const user = await User.findOne({ mobile: args.mobile });
    if (!user) {
        throw new Error("کاربری با این شماره در سیستم موجود نیست.");
    }

    // check if password is correct
    const isValid = await bcrypt.compareSync(args.password, user.password);
    if (!isValid) {
        throw new Error("کلمه عبور وارد شده اشتباه است");
    }

    // create token
    const token = await User.CreateToken(user.id, config.secretId, '10h');

    return new Promise((resolve, reject) => {
        resolve({ user, token });
    });
}

const getAllUserWithPaginationHandler = async (args) => {
    const page = args.input.page || 1;
    const limit = args.input.limit || 10;
    const user = (args.input.searchText != "") ?
        await User.paginate({ "name": { "$regex": args.input.searchText } }, { page, limit }) :
        await User.paginate({}, { page, limit });

    return new Promise((resolve, reject) => {
        resolve({ user })
    })
}

// mutations
async function registerHandler(args) {
    const errors = [];

    // validate user data
    await userValidator.register.validateAsync(args, { abortEarly: false })

    // check if the user is already in the database width the same mobile number
    const userExist = await User.findOne({ mobile: args.mobile });
    if (userExist) {
        throw new Error("کاربری با این شماره در سیستم موجود است.");
    }

    const salt = bcrypt.genSaltSync(15);
    args.password = bcrypt.hashSync(args.password, salt);

    let user = await User.create(args);
    let token = await User.CreateToken(user.id, config.secretId, '24h');

    return new Promise((resolve, reject) => {
        resolve({ user, token })
    })
}

module.exports = resolvers;
