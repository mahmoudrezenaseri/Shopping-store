const Category = require("src/models/category");

const { categoryValidator } = require('src/graphql/validators/index.js');

const resolvers = {
    Query: {
        getAllCategory: async (param, args) => {
            const { category } = await getAllCategoryHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                totalDocs: category.totalDocs,
                hasNextPage: category.hasNextPage,
                page: category.page,
                categories: category.docs,
            };
        },
        getAllCategoryTreeView: async (param, args) => {
            const { category } = await getAllCategoryTreeViewHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return category
        }
    },
    Mutation: {
        createCategory: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
            }

            const { category } = await createCategoryHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: category
            };
        },
    }
}

const getAllCategoryHandler = async (args) => {

    const page = args.input.page || 1;
    const limit = args.input.limit || 10;
    const category = await Category.paginate({}, { page, limit, populate: [{ path: 'parent' }, { path: 'image' }] });

    return new Promise((resolve, reject) => {
        resolve({ category })
    })
}

const getAllCategoryTreeViewHandler = async (args) => {

    const category = await Category.aggregate([{
        $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parent",
            as: "children",
            depthField: "level"
        }
    },
    { $match: { parent: null } },
    {
        $addFields: {
            children: {
                $reverseArray: {
                    $map: {
                        input: "$children",
                        as: "t",
                        in: { "_id": "$$t._id", "name": "$$t.name", "parent": "$$t.parent", "level": "$$t.level" }
                    }
                }
            }
        }
    }
    ], function (err, data) {

        if (err)
            throw err;

        // console.log(data);
    });

    return new Promise((resolve, reject) => {
        resolve({ category })
    })
}

const createCategoryHandler = async (args) => {

    // validate user data
    await categoryValidator.create.validateAsync(args.input, { abortEarly: false })

    if (await Category.findOne({ name: args.input.name })) {
        throw Error(" دسته بندی با این عنوان قبلا ثبت شده است.")
    }

    let category = await Category.create(args.input);

    return new Promise((resolve, reject) => {
        resolve({ category })
    })
}


module.exports = resolvers;