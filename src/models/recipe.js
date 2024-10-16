const {Schema, model, Types } = require('mongoose');

const recipeShema = new Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    recommendList: [{ type: Types.ObjectId, ref: 'User',default: []} ],
    author:{type: Types.ObjectId,ref: 'User'}
});

const Recipe = model('Recipe',recipeShema)
module.exports = {Recipe};