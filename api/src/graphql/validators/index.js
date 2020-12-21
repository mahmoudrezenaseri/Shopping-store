const userValidator = require('./user');
const categoryValidator = require('./category');
const brandValidator = require('./brand');
const surveyValidator = require('./survey');
const productSpecsValidator = require('./productSpecs');
const productSpecDetailsValidator = require('./productSpecDetails');
const sellerValidator = require('./seller');
const warrantyValidator = require('./warranty');

module.exports = {
    userValidator,
    categoryValidator,
    brandValidator,
    surveyValidator,
    productSpecsValidator,
    productSpecDetailsValidator,
    sellerValidator,
    warrantyValidator
}