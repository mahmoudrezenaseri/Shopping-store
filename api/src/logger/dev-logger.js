const {
    createLogger,
    format,
    transports
} = require("winston");

const { metadata, combine, timestamp, label, printf, errors } = format;

require('winston-mongodb').MongoDB;

const config = require("src/config/index");

function buildDevLogger() {
    const myFormat = printf(({ level, message, timestamp, stack }) => {
        let msg = `${timestamp} ${level}: ${stack || message} `

        return msg
    });

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
                    // label({ label: 'CUSTOM' }),
                    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    metadata(),
                    errors({ stack: true }),
                    myFormat),
            })
        ]
    });
}

module.exports = buildDevLogger;
