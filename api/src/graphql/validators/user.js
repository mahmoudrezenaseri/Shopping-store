const Joi = require('joi');

const firstName = Joi.string().max(50).required().label('نام').messages({
    "string.base": "نام اشتباه وارد شده است",
    "string.empty": "لطفا نام را وارد کنید",
    "any.required": "لطفا نام را وارد کنید",
    "string.min": "نام باید حداقل { #limit} حرف داشته باشد",
    "string.max": "نام باید حداکثر { #limit} حرف داشته باشد",
});

const lastName = Joi.string().max(50).required().label('نام خانوادگی').messages({
    "string.base": "نام خانوادگی اشتباه وارد شده است",
    "string.empty": "لطفا نام خانوادگی را وارد کنید",
    "any.required": "لطفا نام خانوادگی را وارد کنید",
    "string.min": "نام خانوادگی باید حداقل { #limit} حرف داشته باشد",
    "string.max": "نام خانوادگی باید حداکثر { #limit} حرف داشته باشد",
});

const mobile = Joi.string().min(11).max(11).required().label('موبایل').messages({
    "string.base": "موبایل اشتباه وارد شده است",
    "string.empty": "لطفا موبایل را وارد کنید",
    "any.required": "لطفا موبایل را وارد کنید",
    "string.min": "موبایل باید حداقل { #limit} حرف داشته باشد",
    "string.max": "موبایل باید حداکثر { #limit} حرف داشته باشد",
});

const password = Joi.string().min(6).required().label('کلمه عبور')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .messages({
        "string.pattern.base": "کلمه عبور باید حداقل شامل یک حرف کوچک و یک عدد باشد",
        "string.min": "کلمه عبور باید حداقل { #limit} حرف داشته باشد",
        "string.max": "کلمه عبور باید حداکثر { #limit} حرف داشته باشد",
        "string.empty": "لطفا کلمه عبور را وارد کنید",
        "any.required": "لطفا کلمه عبور را وارد کنید",
    });


module.exports.login = Joi.object({
    mobile, password
});

module.exports.register = Joi.object({
    firstName, lastName, mobile, password
});