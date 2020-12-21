const Joi = require('joi');

const name = Joi.string().max(50).required().label('عنوان').messages({
    "string.base": "عنوان اشتباه وارد شده است",
    "string.empty": "لطفا عنوان را وارد کنید",
    "any.required": "لطفا عنوان را وارد کنید",
    "string.min": "عنوان باید حداقل { #limit} حرف داشته باشد",
    "string.max": "عنوان باید حداکثر { #limit} حرف داشته باشد",
});

const isDefault = Joi.boolean().required().label('تعیین به عنوان اسلایدر پیش فرض').messages({
    "string.base": "اسلایدر پیش فرض اشتباه وارد شده است",
    "string.empty": "لطفا اسلایدر پیش فرض را وارد کنید",
    "any.required": "لطفا اسلایدر پیش فرض را وارد کنید",
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
    name, isDefault, image
});
