const {Router} = require('express');
const { login } = require('../services/userService');
const { getRecent, getAll, getById, search } = require('../services/recipeService');
const homeRouter = Router();
homeRouter.get('/', async(req, res) => {
    const recipes = await getRecent();
    res.render('home', {recipes});

});

homeRouter.get('/catalog', async(req, res) => {
    const recipes = await getAll();
    res.render('catalog', {recipes});

});

homeRouter.get('/catalog/:id', async(req, res) => {
    const recipe = await getById(req.params.id);

    
    if(!recipe){
        res.render('404')
        return;

    }
    const isOwner = req.user?._id == recipe.author.toString();
    const hasRecommended = Boolean(recipe.recommendList.find(l=> req.user?._id == l.toString()));
    const recommendCount = recipe.recommendList.length;
    console.log(recipe.recommendList);

    res.render('details', {recipe, isOwner,hasRecommended,recommendCount});

});


homeRouter.get('/search', async (req, res) => {
    const title = req.query.search;

    let recipes = [];

    try {
        if (title) {
            recipes = await search(title);
        } else {
            recipes = await getAll();
        }

        res.render('search', { data: { title }, recipes });
    } catch (err) {
        console.error(err);
        res.render('search', { data: { title }, recipes: [], errors: ['An error occurred while searching for recipes.'] });
    }
});
module.exports = {homeRouter};