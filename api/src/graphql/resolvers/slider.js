const Slider = require("src/models/slider");
const { sliderValidator } = require('src/graphql/validators');

const resolvers = {
    Query: {
        getAllSlider: async (param, args, { req, res }) => {

            const { slider } = await getAllSliderHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message, { path: "/slider/getAllSlider" })
                })

            return slider;
        }
    },
    Mutation: {
        createSlider: async (param, args, { req, res }) => {

            // check if user has logged in and is administrator
            funcs.common.checkIfAdmin(req, config.secretId, { path: "/slider/createSlider" });

            const { slider } = await createSliderHandler(args)
                .catch((error) => {
                    funcs.error.errorHandler(error, error.code, error.message, { path: "/slider/createSlider" })
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: slider
            };
        }
    }
}

async function getAllSliderHandler() {

    const slider = await Slider.find({}).populate("FileManager");

    return new Promise((resolve, reject) => {
        resolve({ slider });
    });
}

async function createSliderHandler(args) {

    // validate user data
    await sliderValidator.create.validateAsync(args, { abortEarly: false })

    if (await Slider.findOne({ name: args.name })) {
        throw Error(" نام وارد شده در سیستم موجود است.")
    }

    if (args.isDefault) {
        if (await Slider.findOne({ default: args.isDefault })) {
            throw Error("اسلایدر پیش فرض قبلا انتخاب شده است.");
        }
    }

    let slider = await Slider.create(args);

    return new Promise((resolve, reject) => {
        resolve({ slider })
    })
}

module.exports = resolvers;
