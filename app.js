const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB=require('./seed')
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');



const productRoutes=require('./routes/product')
const reviewRoutes=require('./routes/review')
const authRoutes=require('./routes/auth')
const cartRoutes=require('./routes/cart')


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>{
    console.log("DB connected succesfully")
})
.catch((err)=>{
    console.log("DB error")
    console.log(err)
})


let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true , 
    cookie: { 
        httpOnly: true ,
        expires: Date.now() + 24*7*60*60*1000 , 
        maxAge:24*7*60*60*1000
    }
}



app.engine('ejs',ejsMate) // ejs file be read by ejsMate engine, setting defaut engine to ejsMate
app.set('view engine' , 'ejs'); // view engine works to read ejs file
app.set('views' , path.join(__dirname , 'views')); // views folder 
app.use(express.static(path.join(__dirname , 'public'))); // public folder


app.use(express.urlencoded({extended:true})) // res.redirect('/products)

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// seeding database
//    seedDB()

app.use(session(configSession)); 
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser()); //User.serializeUser(), User coming exporting from User.js
passport.deserializeUser(User.deserializeUser());

// below error occurs when
// passport.serializeUser(User.serializeUser()); //User.serializeUser(), User coming exporting from User.js
//                             ^

// TypeError: User.serializeUser is not a function

// above error occur if you dont add userSchema.plugin(passportLocalMongoose) to schema This will automatically add the necessary fields and methods required by Passport-Local-Mongoose for authentication, including serializeUser and deserializeUser


app.use((req,res,next)=>{
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')

    res.locals.currentUser=req.user
    next()
})

//PASSPORT
passport.use(new LocalStrategy(User.authenticate()))


app.use(productRoutes)  //so that harr incoming request ke liye path check kiya jaae
app.use(reviewRoutes)
app.use(authRoutes)
app.use(cartRoutes)


app.listen(8080,()=>{
    console.log("server connected at 8080")
})