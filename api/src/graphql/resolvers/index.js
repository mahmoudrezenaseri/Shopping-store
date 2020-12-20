const user = require('./user.js');
const category = require('./category.js');
const brand = require('./brand.js');
const fileManager = require('./fileManager.js');
const survey = require('./survey.js');
const productSpecs = require('./productSpecs.js');
const productSpecDetails = require('./productSpecDetails.js');
const seller = require('./seller.js');

module.exports = [user,
    category,
    brand,
    fileManager,
    survey,
    productSpecs,
    productSpecDetails,
    seller
]