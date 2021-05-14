const {
    createLogger,
    format,
    transports
} = require("winston");

const { splat, combine, timestamp, label, json, errors } = format;

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
                    label({ label: 'CUSTOM' }),
                    timestamp(),
                    errors({ stack: true }),
                    json()),
                // defaultMeta: { service: 'user-service' }
            })
        ]
    });
}

module.exports = buildProdLogger;
