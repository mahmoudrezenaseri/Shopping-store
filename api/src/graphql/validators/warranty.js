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

module.exports.create = Joi.object({
    name, label
});