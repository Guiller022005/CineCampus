const controllerSign_Up_3 = require('../controller/sign-UpController');
const express = require('express');
const product = express();

product.post("/", express.json(), controllerSign_Up_3.createUser)

module.exports = product;