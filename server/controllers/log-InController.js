const bcrypt = require('bcrypt');
const User = require('../model/user');
const user = new User();

exports.login = async(req, res) => {
    try {
        let {email, password} = req.body;
        let resExistsEmail = await user.findExistEmail(email);
        if(resExistsEmail.status==404) return res.status(resExistsEmail.status).json(resExistsEmail);
        let resFindUser = await user.findOneUserByEmail(email);
        if(resFindUser.status==404) return res.status(resFindUser.status).json(resFindUser);
        let resEmailAndPassword = await bcrypt.compare(password, resFindUser.data.password);
        if(!resEmailAndPassword) return res.status(406).json({status: 406, message: "Invalid password"})
        resFindUser.data.password = resFindUser.data.password.replace(/[^\w\s]_/g,'');
        // delete resFindUser.data.password
        res.cookie("token", JSON.stringify(resFindUser), {maxAge: 1800000}).status(200).json({status: 200, message: "Logged in user"})
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}

exports.findCookies = async(req, res) => {
    console.log(req.cookies.token);
    res.json({message: "ok"})
}