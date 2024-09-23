const express = require('express');
const cookieParser = require('cookie-parser');
const controllerLog_In_1 = require('../controllers/log-InController');
const login = express();

login.post("/", cookieParser(), express.json(), controllerLog_In_1.login)
login.get("/", cookieParser(), controllerLog_In_1.findCookies)

module.exports = login;