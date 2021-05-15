const {
    createLogger,
    format,
    transports
} = require("winston");

const { metadata, combine, timestamp, label, json, errors } = format;

require('winston-mongodb').MongoDB;

const config = require("src/config/index");

function buildProdLogger() {
    return createLogger({
        transports: [
            new transports.MongoDB({
                db: config.database.url,
                level: 'error',
                options: {
                    useUnifiedTopology: true,
                },
                collection: 'logs',
                format: combine(
                    timestamp(),
                    errors({ stack: true }),
                    metadata(),
                    json()),
            })
        ]
    });
}

module.exports = buildProdLogger;
