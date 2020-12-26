const Joi = require('joi');

const color = Joi.string().max(50).required().label('رنگ').messages({
    "string.base": "رنگ اشتباه وارد شده است",
    "string.empty": "لطفا رنگ را وارد کنید",
    "any.required": "لطفا رنگ را وارد کنید",
    "string.min": "رنگ باید حداقل { #limit} حرف داشته باشد",
    "string.max": "رنگ باید حداکثر { #limit} حرف داشته باشد",
});

const stock = Joi.string().max(23).required().label('قیگی').messages({
    "string.base": "قیگی اشتباه وارد شده است",
    "string.empty": "لطفا قیگی را وارد کنید",
    "any.required": "لطفا قیگی را وارد کنید",
    "string.min": "قیگی باید حداقل { #limit} حرف داشته باشد",
    "string.max": "قیگی باید حداکثر { #limit} حرف داشته باشد",
});

const price = Joi.string().max(23).required().label('قیمت ویژگی').messages({
    "string.base": "قیمت ویژگی اشتباه وارد شده است",
    "string.empty": "لطفا قیمت ویژگی را وارد کنید",
    "any.required": "لطفا قیمت ویژگی را وارد کنید",
    "string.min": "قیمت ویژگی باید حداقل { #limit} حرف داشته باشد",
    "string.max": "قیمت ویژگی باید حداکثر { #limit} حرف داشته باشد",
});

const discount = Joi.string().max(23).required().label('تخفیف').messages({
    "string.base": "تخفیف اشتباه وارد شده است",
    "string.empty": "لطفا تخفیف را وارد کنید",
    "any.required": "لطفا تخفیف را وارد کنید",
    "string.min": "تخفیف باید حداقل { #limit} حرف داشته باشد",
    "string.max": "تخفیف باید حداکثر { #limit} حرف داشته باشد",
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
    seller, warranty, color, stock, price, discount
});
