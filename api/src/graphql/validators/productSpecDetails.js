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

const specs = Joi.string().required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('مشخصات')
    .messages({
        "string.pattern.base": "شناسه مشخصات وارد شده اشتباه هست",
        "string.base": "شناسه مشخصات اشتباه وارد شده است",
        "string.empty": "شناسه مشخصات نباید خالی باشد  ",
        "any.required": "شناسه مشخصات نباید خالی باشد",
    });

module.exports.create = Joi.object({
    name, label, specs
});

module.exports.getBySpec = Joi.object({
    specs
});