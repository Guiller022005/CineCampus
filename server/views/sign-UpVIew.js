const layout = require('express').Router();
const cookieParser = require('cookie-parser');
const { authLogged } = require('../middleware/authCookies');
const { join } = require('path');

layout.get("/", cookieParser(), authLogged, (req, res)=>{
    res.sendFile(join(process.env.EXPRESS_STATIC, '/views/log-in-1.html'));
})
module.exports = layout;