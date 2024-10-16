const { default: mongoose } = require('mongoose');
const {Recipe} = require('../models/recipe')

async function getAll(){
    return Recipe.find().lean();
}
async function search(title){
    return Recipe.find({ title: new RegExp(title, 'i') }).lean();
}
async function getById(id) {
    return Recipe.findById(id).lean();
}
async function getRecent(){
    return Recipe.find().sort({$natural: -1}).limit(3).lean();
}


async function create(data,authorId) {
    console.log('Creating recipe with data:', data, 'and authorId:', authorId);
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
        throw new Error('Invalid author ID');
    }

    const record = new Recipe ({
        title:data.title, 
        ingredients: data.ingredients,
        instructions:data.instructions,
        description:data.description, 
        image:data.image, 
        author:authorId
    });
    
await record.save();
console.log('Recipe created successfully');

return record;

}
async function update(id, data, userId) {
    const record = await Recipe.findById(id);
    if(!record){
       throw new ReferenceError('Record not found'+ id);
    }

    if (record.author.toString() != userId) {
       throw new Error('Access denied');

    }


    record.title=data.title, 
    record.ingredients= data.ingredients,
    record.instructions=data.instructions,
    record.description=data.description, 
    record.image=data.image
    await record.save();
    return record;
}

async function recommendRecipe(recipeId, userId) {
    console.log('recommendRecipe function called with recipeId:', recipeId, 'and userId:', userId);

    const record = await Recipe.findById(recipeId); 
    if (!record) {
        throw new ReferenceError('Record not found: ' + recipeId);
    }

    if (record.author.toString() === userId) {
        throw new Error('Access denied: You cannot reccomend your own recipe.');
    }

    if (record.recommendList.find(l => l.toString() === userId)) {
        console.log('User already recommend this recipe');
        return;
    }

    record.recommendList.push(userId);
    await record.save();
    console.log('Recipe recomennded successfully');
    return record;
}
async function deleteById(id, userId) {
    
    const record = await Recipe.findById(id);
    if(!record){
       throw new ReferenceError('Record not found'+ id);
    }

    if (record.author.toString() != userId) {
       throw new Error('Access denied');

    }
    await Recipe.findByIdAndDelete(id);
}

module.exports = {create, update,recommendRecipe, getAll, search, getById,getRecent, deleteById }