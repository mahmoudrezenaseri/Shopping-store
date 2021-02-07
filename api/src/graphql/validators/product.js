const Joi = require('joi');

const _id = Joi.string().required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('شناسه محصول')
    .messages({
        "string.pattern.base": "شناسه محصول وارد شده اشتباه هست",
        "string.base": "شناسه محصول اشتباه وارد شده است",
        "string.empty": "شناسه محصول نباید خالی باشد  ",
        "any.required": "شناسه محصول نباید خالی باشد",
    });

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

const brand = Joi.string().required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('برند')
    .messages({
        "string.pattern.base": "شناسه برند وارد شده اشتباه هست",
        "string.base": "شناسه برند اشتباه وارد شده است",
        "string.empty": "شناسه برند نباید خالی باشد",
        "any.required": "شناسه برند نباید خالی باشد",
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

const image = Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required()
    .label('تصویر')
    .messages({
        "string.pattern.base": "شناسه تصویر وارد شده اشتباه هست",
        "string.base": "شناسه تصویر اشتباه وارد شده است",
        "string.empty": "شناسه تصویر نباید خالی باشد",
        "any.required": "شناسه تصویر نباید خالی باشد",
    });

module.exports.create = Joi.object({
    fname, ename, description, brand, category, image
});

module.exports.getByProduct = Joi.object({
    _id
});

module.exports.getByCategory = Joi.object({
    category
});


module.exports.checkId = Joi.object({
    _id
});