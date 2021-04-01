const Joi = require('joi');

const fname = Joi.string().max(150).required().label('عنوان (فارسی)').messages({
    "string.base": "عنوان (فارسی) اشتباه وارد شده است",
    "string.empty": "لطفا عنوان (فارسی) را وارد کنید",
    "any.required": "لطفا عنوان (فارسی) را وارد کنید",
    "string.min": "عنوان (فارسی) باید حداقل { #limit} حرف داشته باشد",
    "string.max": "عنوان (فارسی) باید حداکثر { #limit} حرف داشته باشد",
});

const ename = Joi.string().max(150).optional().allow(null).allow('').label('عنوان (انگلیسی)').messages({
    "string.base": "عنوان (انگلیسی) اشتباه وارد شده است",
    "string.empty": "لطفا عنوان (انگلیسی) را وارد کنید",
    "any.required": "لطفا عنوان (انگلیسی) را وارد کنید",
    "string.min": "عنوان (انگلیسی) باید حداقل { #limit} حرف داشته باشد",
    "string.max": "عنوان (انگلیسی) باید حداکثر { #limit} حرف داشته باشد",
});

const code = Joi.string().min(2).max(4).optional().allow(null).allow('').label('کد شهر')
    .regex(/[A-Z]+/)
    .messages({
        "string.base": "کد شهر اشتباه وارد شده است",
        "string.min": " کد شهر باید حداقل { #limit} حرف داشته باشد",
        "string.max": "کد شهر باید حداکثر { #limit} حرف داشته باشد",
    });

module.exports.create = Joi.object({
    fname, ename, code
});