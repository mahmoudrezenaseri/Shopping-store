const Joi = require('joi');

const fname = Joi.string().max(150).required().label('عنوان (فارسی)').messages({
    "string.base": "عنوان (فارسی) اشتباه وارد شده است",
    "string.empty": "لطفا عنوان (فارسی) را وارد کنید",
    "any.required": "لطفا عنوان (فارسی) را وارد کنید",
    "string.min": "عنوان (فارسی) باید حداقل { #limit} حرف داشته باشد",
    "string.max": "عنوان (فارسی) باید حداکثر { #limit} حرف داشته باشد",
});

const ename = Joi.string().max(150).required().label('عنوان (انگلیسی)').messages({
    "string.base": "عنوان (انگلیسی) اشتباه وارد شده است",
    "string.empty": "لطفا عنوان (انگلیسی) را وارد کنید",
    "any.required": "لطفا عنوان (انگلیسی) را وارد کنید",
    "string.min": "عنوان (انگلیسی) باید حداقل { #limit} حرف داشته باشد",
    "string.max": "عنوان (انگلیسی) باید حداکثر { #limit} حرف داشته باشد",
});

const description = Joi.string().max(1000).optional().allow(null).allow('').label('توضیح').messages({
    "string.base": "توضیح اشتباه وارد شده است",
    "string.min": " توضیح باید حداقل { #limit} حرف داشته باشد",
    "string.max": "توضیح باید حداکثر { #limit} حرف داشته باشد",
});

const category = Joi.string().required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('دسته بندی')
    .messages({
        "string.pattern.base": "شناسه دسته بندی وارد شده اشتباه هست",
        "string.base": "شناسه دسته بندی اشتباه وارد شده است",
        "string.empty": "شناسه دسته بندی نباید خالی باشد  ",
        "any.required": "شناسه دسته بندی نباید خالی باشد",
    });


module.exports.create = Joi.object({
    fname, ename, category, description
});
