const {Schema, model} = require('mongoose');

const userShema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
}, {
    collation:{
        locale:'en',
        strength: 2
    }

});

const User = model('User',userShema)
module.exports = {User};