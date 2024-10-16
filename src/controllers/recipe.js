const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { validationResult, body } = require("express-validator");
const { parseError } = require("../util");
const { create, getById, update, deleteById, recommendRecipe } = require("../services/recipeService");

const recipeRouter = Router();
recipeRouter.get('/create',isUser(), async(req, res) => {
    res.render('create');

});
recipeRouter.post ('/create',isUser(), 
body('title').isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
body('description').isLength({ min: 10, max: 100 }).withMessage('Description must be between 10 and 100 characters'),
body('ingredients').isLength({ min: 10, max: 200 }).withMessage('Ingredients must be between 10 and 200 characters'),
body('instructions').isLength({ min: 10 }).withMessage('Instructions must be at least 10 characters'),
body('image').isURL({require_tld:false}).withMessage('Image must start with http:// or https://'),
async(req, res) => {
console.log(req.user);

    try{
        const validation = validationResult(req);
        if(validation.errors.length) {
            throw validation.errors;
        }
        const result = await create(req.body, req.user._id);

        res.redirect('/catalog')
    } catch(err){
        res.render('create',{data:req.body, errors:  parseError(err).errors})
    }
});

recipeRouter.get('/edit/:id',isUser(), async(req, res) => {
    const recipe = await getById(req.params.id);

    if(!recipe){
        res.render('404');
        return;

    }
    const isOwner = req.user._id == recipe.author.toString();
    if(!isOwner){
        res.redirect('/login');
        return;
    }
    res.render('edit', {data:recipe});

});
recipeRouter.post ('/edit/:id',isUser(), 
body('title').isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
body('description').isLength({ min: 10, max: 100 }).withMessage('Description must be between 10 and 100 characters'),
body('ingredients').isLength({ min: 10, max: 200 }).withMessage('Ingredients must be between 10 and 200 characters'),
body('instructions').isLength({ min: 10 }).withMessage('Instructions must be at least 10 characters'),
body('image').isURL({require_tld:false}).withMessage('Image must start with http:// or https://'),
async(req, res) => {

    const recipeId = req.params.id;
    const userId = req.user._id;

    try{
        const validation = validationResult(req);
        if(validation.errors.length) {
            throw validation.errors;
        }
        const result = await update(recipeId, req.body, req.user._id);

        res.redirect('/catalog/' + recipeId)
    } catch(err){
        res.render('edit',{data:req.body, errors:  parseError(err).errors})
    }
});

recipeRouter.get ('/recommend/:id',isUser(), async(req, res) => {

    const recipeId = req.params.id;
    const userId = req.user._id;

    try{
        const result = await recommendRecipe(recipeId, userId);
        res.redirect('/catalog/' + recipeId)
        
    } catch(err){
        res.redirect('/')
    }
});

recipeRouter.get ('/delete/:id',isUser(), async(req, res) => {

    const recipeId = req.params.id;
    const userId = req.user._id;

    try{
        const result = await deleteById(recipeId, userId);

        res.redirect('/')
    } catch(err){
        res.redirect('/catalog/' + recipeId)
    }
});

module.exports = {recipeRouter}
