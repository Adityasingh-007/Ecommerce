const express=require('express')
const passport = require('passport');
const User = require('../models/User');
const router=express.Router()


// to show the form of signup

router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

// actually add a user into the DB

router.post('/register',async(req,res)=>{

    try{
    
    let {email,username,password,role}=req.body;

    const user=new User({email,username,role})

    const newUser= await User.register(user,password)  // in register method paasword is always a separate argument thats why in user we only takes email and username
    // res.send(newUser)
    // res.redirect('/login')

    req.login(newUser,function(err){
        if(err){
            return next(err)
        }

        req.flash('success',"welcome,you are registered successfully")

        return res.redirect('/products')
    })
}

    catch(e){
        req.flash('error','e.message')
        return res.redirect('/signup')
    }



})

// to get login form

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

// to actually login via db


router.post('/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureMessage: true 
    }),
    (req,res)=>{
        // console.log(req.user,'sam');
        req.flash('success' , 'welcome back')
        res.redirect('/products');
})


router.get('/logout',(req,res)=>{

    ()=>{
        req.logout()
    }
    req.flash('success' , 'Good Bye')
        res.redirect('/login');

})







module.exports=router