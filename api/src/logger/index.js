const config = require('../config');
const buildDevLogger = require('./dev-logger')
const buildProdLogger = require('./prod-logger')

let logger = null;

if (config.env === 'development') {
    logger = buildDevLogger()
} else {
    logger = buildProdLogger()
}

module.exports = logger;
