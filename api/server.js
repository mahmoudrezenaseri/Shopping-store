require("app-module-path").addPath(__dirname);
require("dotenv").config();

const error = require("src/functions/errors");
global.handleErrors = error.handleErrors;

global.config = require("src/config/index");
global.common = require("src/functions/common");

const App = require("src/index");
new App();


