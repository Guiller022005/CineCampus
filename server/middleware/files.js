const fileUpload = require('express-fileupload');
const express = require('express').Router;

const file = express();

file.use(fileUpload({
    limits: { fileSize: 50 * 1024 *1024 },
}));

module.exports = file;