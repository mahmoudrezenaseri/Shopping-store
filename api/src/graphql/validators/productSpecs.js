const Joi = require('joi');

const name = Joi.string().max(50).required().label('عنوان').messages({
    "string.base": "عنوان اشتباه وارد شده است",
    "string.empty": "لطفا عنوان را وارد کنید",
    "any.required": "لطفا عنوان را وارد کنید",
    "string.min": "عنوان باید حداقل { #limit} حرف داشته باشد",
    "string.max": "عنوان باید حداکثر { #limit} حرف داشته باشد",
});

const label = Joi.string().max(50).optional().allow(null).allow('').label('توضیح').messages({
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
    name, label, category
});