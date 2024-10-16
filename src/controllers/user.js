
// const result = await login('leah', '12345');
 // const token = createToken(result);
 // res.cookie('token' ,token);

 const {Router} = require('express');
 const {body , validationResult } = require('express-validator');
 const {parseError} = require('../util');
 const { isGuest } = require('../middlewares/guards');
 const { register, login } = require('../services/userService');
 const { createToken } = require('../services/jwt'); 
 const userRouter = Router();
 userRouter.get('/register', isGuest(), (req, res) => {
 
     res.render('register')
 });
 userRouter.post('/register', isGuest(),
 body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Email must be at least 10 characters'),
 body('name').trim().isLength({ min: 2, max: 20 }).withMessage('Name must be between 2 and 20 characters'),
 body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
 body('repass').trim().custom((value, { req }) => value === req.body.password).withMessage("Passwords don't match"),
 
 async (req, res) => {
     const {email,name, password} = req.body;
 
     try{
         const validation = validationResult(req);
         if(validation.errors.length) {
             throw validation.errors;
         }
         const result = await register(email,name, password);
         const token = createToken(result);
 
 
         res.cookie('token', token);
         res.redirect('/')
     } catch(err){
         res.render('register',{data:{email, name}, errors:  parseError(err).errors})
     }
 });
 
 userRouter.get('/login', isGuest(), (req, res) => {
 
     res.render('login')
 });
 userRouter.post('/login', isGuest(),
 body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Email must be at least 10 characters'),
 body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
 
 async (req, res) => {
     const {email, password} = req.body;
 
     try{
 
         const result = await login(email, password);
         const token = createToken(result);
 
 
         res.cookie('token', token);
         res.redirect('/')
     } catch(err){
         res.render('login',{data:{email}, errors:  parseError(err).errors})
     }
 });

 
userRouter.get('/logout',  (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
});

 
 module.exports = {userRouter};