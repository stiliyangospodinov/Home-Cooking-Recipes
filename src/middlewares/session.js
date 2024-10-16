const { verifyToken } = require("../services/jwt");

function session () {
    return function (req, res, next) {
    const token = req.cookies ?.token;
    if (token) {
        try{
            const sesisonData = verifyToken(token);
            req.user = {
                email : sesisonData.email,
                _id : sesisonData._id
            };
            res.locals.hasUser = true;
        } catch(err){
            res.clearCookie('token');
           }
}
next();
    };
}
module.exports = {session};