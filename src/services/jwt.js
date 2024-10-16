const jwt = require('jsonwebtoken');
const secert = 'super secret'


function  createToken (userData){
    const payload = {
        email : userData.email,
        name: userData.name,
        _id: userData._id
    };

    const token = jwt.sign(payload,secert,{
        expiresIn: '1d'
    });

    return token;
}

function verifyToken (token){

    const data = jwt.verify(token,secert);
    return data;


}

module.exports = {
    createToken,
    verifyToken
}