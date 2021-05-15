const Survey = require("src/models/survey");
const Category = require("src/models/category");

const validator = require("validator")
const { surveyValidator } = require('src/graphql/validators/index.js');
const Joi = require("joi");

const resolvers = {
    Query: {
        getSurveyByCategory: async (param, args, { req, res }) => {

            const { survey } = await getByCategoryHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message)
                });

            return survey;
        }
    },
    Mutation: {
        createSurvey: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await funcs.common.checkIfAdmin(req, config.secretId)) {
                funcs.error.errorHandler(null, 403, "امکان استفاده از این بخش وجود ندارد");
                return;
            }

            const { serveyLst } = await createSurveyHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: serveyLst
            };
        }
    }
}

async function getByCategoryHandler(args) {

    // validate user data
    await surveyValidator.getByCategory.validateAsync(args, { abortEarly: false });

    const category = await Category.findById(args.category).populate("parent").exec();
    let survey = [];

    if (category == null) {
        funcs.error.errorHandler(null, 403, "برای دسته بندی معیار امتیازدهی ثبت نشده است");
    } else if (category.parent != null && category.parent.parent == null) {
        survey = await Survey.find({ category: args.category }).populate("category").exec();
    }

    return new Promise((resolve, reject) => {
        resolve({ survey })
    });
}

async function createSurveyHandler(args) {

    let serveyLst = [];
    for (let index = 0; index < args.input.list.length; index++) {
        const element = args.input.list[index];

        // validate user data
        await surveyValidator.create.validateAsync(element, { abortEarly: true })

        if (!await Category.findOne({ _id: element.category })) {
            throw Error("دسته بندی وارد شده در سیستم موجود نمی باشد");
        }

        if (await Survey.findOne({ category: element.category, name: element.name })) {
            throw Error("اطلاعات وارد شده در سیستم موجود است")
        }

        let survey = await Survey.create(element)
        serveyLst.push(survey)
    }

    return new Promise((resolve, reject) => {
        resolve({ serveyLst })
    })
}

module.exports = resolvers;
