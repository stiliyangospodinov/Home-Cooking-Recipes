const express = require('express');
const { configDatabase } = require('./config/configDatabase');
const { configHbs } = require('./config/configHbs');
const { configExpress } = require('./config/configExpress');
const { configRoutes } = require('./config/configRoutes');
const { register, login } = require('./services/userService');
const {createToken, verifyToken} = require('./services/jwt')

start();

async function start(){
const app = express();

await configDatabase();
configHbs(app);
configExpress(app);
configRoutes(app);

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000")
    // testFunction()
});
}
// async function testFunction(){
// try{
// const result = await register('leah', '12345');
//     console.log(result);
//     const token = createToken(result);
//     console.log(token);
//     const parsedData = verifyToken(token);
//     console.log(parsedData);
// } catch (err){
//     console.log('Caught error');

//     console.log(err.message);
// }

// }