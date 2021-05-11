const {
    createLogger,
    format,
    transports
} = require("winston");

const { splat, combine, timestamp, label, printf, simple } = format;
const database = require("./database");

require('winston-mongodb').MongoDB;

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `
    if (metadata) {
        msg += JSON.stringify(metadata)
    }
    return msg
});

const logger = createLogger({
    transports: [
        new transports.MongoDB({
            db: database.url,
            level: 'error',
            options: {
                useUnifiedTopology: true,
            },
            collection: 'logs',
            format: format.combine(
                label({ label: 'CUSTOM', message: true }),
                format.timestamp(),
                format.json())
        })
    ]
});

module.exports = logger;