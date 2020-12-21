const Joi = require('joi');

const isDefault = Joi.boolean().required().label('تعیین پیش فرض').messages({
    "string.base": "اسلایدر پیش فرض اشتباه وارد شده است",
    "string.empty": "لطفا اسلایدر پیش فرض را وارد کنید",
    "any.required": "لطفا اسلایدر پیش فرض را وارد کنید",
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

const image = Joi.string().required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('تصویر')
    .messages({
        "string.pattern.base": "شناسه تصویر وارد شده اشتباه هست",
        "string.base": "شناسه تصویر اشتباه وارد شده است",
        "string.empty": "شناسه تصویر نباید خالی باشد",
        "any.required": "شناسه تصویر نباید خالی باشد",
    });

module.exports.create = Joi.object({
    isDefault, category, image
});
