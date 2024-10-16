const mongoose = require('mongoose');
require('../models/recipe')
require('../models/user')

async function configDatabase(){
    const connectionString = 'mongodb://127.0.0.1:27017/HomeCookingRecipes';

   await mongoose.connect(connectionString,{
   useNewUrlParser:true,
   useUnifiedTopology:true
   });
   
   console.log('Database connected');
}

module.exports ={configDatabase}
