exports.verify = ((req, res, next)=>{
    try {
        let {nick:user, password, rol} = JSON.parse(req.cookies.token).data;
        req.data = {
            user,
            pwd: password,
            rol
        }
        next();
    } catch (error) {
        res.status(401).json({status: 401, message: "You cannot access the requested view"});
    }
});