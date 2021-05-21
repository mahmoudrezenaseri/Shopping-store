const Joi = require('joi');

const firstName = Joi.string().max(50).required().label('نام').messages({
    "string.base": "نام اشتباه وارد شده است",
    "string.empty": "لطفا نام را وارد کنید",
    "any.required": "لطفا نام را وارد کنید",
    "string.min": "نام باید حداقل { #limit} حرف داشته باشد",
    "string.max": "نام باید حداکثر { #limit} حرف داشته باشد",
});

const lastName = Joi.string().max(50).required().label('نام خانوادگی').messages({
    "string.base": "نام خانوادگی اشتباه وارد شده است",
    "string.empty": "لطفا نام خانوادگی را وارد کنید",
    "any.required": "لطفا نام خانوادگی را وارد کنید",
    "string.min": "نام خانوادگی باید حداقل { #limit} حرف داشته باشد",
    "string.max": "نام خانوادگی باید حداکثر { #limit} حرف داشته باشد",
});

const mobile = Joi.string().min(11).max(11).required().label('موبایل')
    .regex(/^\d+$/)
    .messages({
        "string.base": "موبایل اشتباه وارد شده است",
        "string.empty": "لطفا موبایل را وارد کنید",
        "any.required": "لطفا موبایل را وارد کنید",
        "string.min": "موبایل باید حداقل { #limit} حرف داشته باشد",
        "string.max": "موبایل باید حداکثر { #limit} حرف داشته باشد",
    });

const email = Joi.string().required().label('ایمیل')
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ir'] } })
    .messages({
        "string.base": "ایمیل اشتباه وارد شده است",
        "string.empty": "لطفا ایمیل را وارد کنید",
        "any.required": "لطفا ایمیل را وارد کنید",
        "string.min": "ایمیل باید حداقل { #limit} حرف داشته باشد",
        "string.max": "ایمیل باید حداکثر { #limit} حرف داشته باشد",
    });

const nationalNumber = Joi.string().required().min(10).max(10).label('شماره ملی')
    .messages({
        "string.base": "شماره ملی اشتباه وارد شده است",
        "string.empty": "لطفا شماره ملی را وارد کنید",
        "any.required": "لطفا شماره ملی را وارد کنید",
        "string.min": "شماره ملی باید حداقل { #limit} حرف داشته باشد",
        "string.max": "شماره ملی باید حداکثر { #limit} حرف داشته باشد",
    });

const address = Joi.string().min(1).max(500).label('آدرس')
    .messages({
        "string.base": "آدرس اشتباه وارد شده است",
        "string.empty": "لطفا آدرس را وارد کنید",
        "any.required": "لطفا آدرس را وارد کنید",
        "string.min": "آدرس باید حداقل { #limit} حرف داشته باشد",
        "string.max": "آدرس باید حداکثر { #limit} حرف داشته باشد",
    });

const phone = Joi.string().min(11).max(11).label('تلفن')
    .regex(/^\d+$/)
    .messages({
        "string.base": "تلفن اشتباه وارد شده است",
        "string.empty": "لطفا تلفن را وارد کنید",
        "any.required": "لطفا تلفن را وارد کنید",
        "string.min": "تلفن باید حداقل { #limit} حرف داشته باشد",
        "string.max": "تلفن باید حداکثر { #limit} حرف داشته باشد",
    });

const gender = Joi.boolean().required().label('جنسیت').messages({
    "string.base": " جنسیت اشتباه وارد شده است",
    "string.empty": "لطفا جنسیت را وارد کنید",
    "any.required": "لطفا جنسیت را وارد کنید",
});

const level = Joi.number().required().min(0).max(9).label('سطح کاربری').messages({
    "number.base": " سطح کاربری اشتباه وارد شده است",
    "number.empty": "لطفا سطح کاربری را وارد کنید",
    "number.min": "سطح کاربری باید حداقل { #limit} حرف داشته باشد",
    "number.max": "سطح کاربری باید حداکثر { #limit} حرف داشته باشد",
    "any.required": "لطفا سطح را وارد کنید",
});

const password = Joi.string().min(6).required().label('کلمه عبور')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .messages({
        "string.pattern.base": "کلمه عبور باید حداقل شامل یک حرف کوچک و یک عدد باشد",
        "string.min": "کلمه عبور باید حداقل { #limit} حرف داشته باشد",
        "string.max": "کلمه عبور باید حداکثر { #limit} حرف داشته باشد",
        "string.empty": "لطفا کلمه عبور را وارد کنید",
        "any.required": "لطفا کلمه عبور را وارد کنید",
    });


module.exports.login = Joi.object({
    mobile, password
});

module.exports.register = Joi.object({
    firstName, lastName, nationalNumber, mobile, phone, email, level, gender, address, password
});
