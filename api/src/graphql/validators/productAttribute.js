const Joi = require('joi');

const color = Joi.string().max(50).required().label('رنگ').messages({
    "string.base": "رنگ اشتباه وارد شده است",
    "string.empty": "لطفا رنگ را وارد کنید",
    "any.required": "لطفا رنگ را وارد کنید",
    "string.min": "رنگ باید حداقل { #limit} حرف داشته باشد",
    "string.max": "رنگ باید حداکثر { #limit} حرف داشته باشد",
});

const price = Joi.string().max(50).required().label('قیمت ویژگی').messages({
    "string.base": "قیمت ویژگی اشتباه وارد شده است",
    "string.empty": "لطفا قیمت ویژگی را وارد کنید",
    "any.required": "لطفا قیمت ویژگی را وارد کنید",
    "string.min": "قیمت ویژگی باید حداقل { #limit} حرف داشته باشد",
    "string.max": "قیمت ویژگی باید حداکثر { #limit} حرف داشته باشد",
});

const discount = Joi.string().max(50).required().label('عنوان').messages({
    "string.base": "عنوان اشتباه وارد شده است",
    "string.empty": "لطفا عنوان را وارد کنید",
    "any.required": "لطفا عنوان را وارد کنید",
    "string.min": "عنوان باید حداقل { #limit} حرف داشته باشد",
    "string.max": "عنوان باید حداکثر { #limit} حرف داشته باشد",
});

const seller = Joi.string().required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('فروشنده')
    .messages({
        "string.pattern.base": "شناسه فروشنده وارد شده اشتباه هست",
        "string.base": "شناسه فروشنده اشتباه وارد شده است",
        "string.empty": "شناسه فروشنده نباید خالی باشد  ",
        "any.required": "شناسه فروشنده نباید خالی باشد",
    });

const warranty = Joi.string().required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('گارانتی')
    .messages({
        "string.pattern.base": "شناسه گارانتی وارد شده اشتباه هست",
        "string.base": "شناسه گارانتی اشتباه وارد شده است",
        "string.empty": "شناسه گارانتی نباید خالی باشد  ",
        "any.required": "شناسه گارانتی نباید خالی باشد",
    });

module.exports.create = Joi.object({
    color, price, discount, seller, warranty
});
