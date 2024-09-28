const layout = require('express').Router();
const cookieParser = require('cookie-parser');
const { authLogged } = require('../middlewares/authCookies');
const { join } = require('path');

layout.get("/", cookieParser(), authLogged, (req, res)=>{
    res.sendFile(join(process.env.EXPRESS_STATIC, '/views/log-in.html'));
})
module.exports = layout;