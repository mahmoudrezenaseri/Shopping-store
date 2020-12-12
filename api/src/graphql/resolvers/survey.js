const Survey = require("src/models/survey");
const Category = require("src/models/category");

const validator = require("validator")
const { surveyValidator } = require('src/graphql/validators/index.js');
const Joi = require("joi");

const resolvers = {
    Query: {
        getSurveyByCategoryId: async (param, args, { req, res }) => {

            const { survey } = await getByCategoryIdHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return survey;
        }
    },
    Mutation: {
        createSurvey: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
                return;
            }

            const { serveyLst } = await createSurveyHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
            };
        }
    }
}


async function getByCategoryIdHandler(args) {

    // validate user data
    await surveyValidator.getByCategory.validateAsync({ "category": args.categoryId })

    const category = await Category.findById(args.categoryId).populate("parent").exec();
    let survey = [];

    if (category == null) {
        handleErrors(null, 403, "برای دسته بندی معیار امتیازدهی ثبت نشده است");
    } else if (category.parent.parent == null) {
        survey = await Survey.find({ category: args.categoryId }).populate("category").exec();
        if (survey.length === 0) {
            handleErrors(null, 403, "برای دسته بندی معیار امتیازدهی ثبت نشده است");
        }
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
            handleErrors(null, 403, "دسته بندی وارد شده در سیستم موجود نمی باشد");
            return;
        }

        if (await Survey.findOne({ category: element.category, name: element.name })) {
            handleErrors(null, 403, "اطلاعات وارد شده در سیستم موجود است");
            return;
        }

        let survey = await Survey.create(element)
        serveyLst.push(survey)
    }

    return new Promise((resolve, reject) => {
        resolve({ serveyLst })
    })
}

module.exports = resolvers;
