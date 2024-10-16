const {User} = require('../models/user');
const bcrypt = require('bcrypt');

const identityName = 'email';
async function register(identity, name, password) {
    const  existing = await User.findOne({ [identityName] : identity});
    if(existing){
        throw new Error(`This user ${identityName} is already in use`)
    }
        const user = new User({
            [identityName] : identity,
            name,
            password : await bcrypt.hash(password, 10)
        });

        try{

            await user.save();
        }catch(err){
            if(err.code ==11000){
                throw new Error('This username already exists')
            }
        }

        return user;

}

async function login(identity, password) {

    const user = await User.findOne({ [identityName] : identity});

    if (!user) {
        throw new Error(`Incorrect ${identityName} or password`)
    }

    match = await bcrypt.compare(password , user.password)

    if (!match){
        throw new Error(`Incorrect ${identityName} or password`)
    }
    return user;

}
module.exports = {
    register,
    login
}; 