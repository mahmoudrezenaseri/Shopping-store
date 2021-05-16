const database = require("./database");
const message = require("./message");

module.exports = {
  database,
  port: process.env.API_SERVER_PORT,
  secretId: '235yereth56745',
  in_prod: false,
  env: process.env.NODE_ENV,
  message
};
