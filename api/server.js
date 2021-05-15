require("app-module-path").addPath(__dirname);
require("dotenv").config();

global.config = require("src/config/index");
global.funcs = require("src/functions/index");

const App = require("src/index");
new App();


