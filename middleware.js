
const{productSchema,reviewSchema}=require('./schema')

const Product=require('./models/Product')

const validateProduct=(req,res,next)=>{
    const{name,img,price,desc}=req.body;
    const{error}=productSchema.validate({name,img,price,desc})  //.validate is a joi method

    if(error){
        return res.render('error')
    }
    next()
}

// here we are creating a middleware ,This middleware is designed to validate the incoming request body, which presumably contains data related to a product.

// For server side validation

//If there's no error, it calls the next() callback function or next middleware to pass control to the next middleware or route handler in the Express.js middleware stack.

//Many seem to forget (or are just lazy) that any client-side validation can be easily bipassed. What is on the server is the true gateway that needs to be passed for any data and that can’t be (easily) bipassed.
// so it is suggest to use both server side validation and client side validation

const validateReview=(req,res,next)=>{
    const{rating,comment}=req.body;
    const{error}=reviewSchema.validate({rating,comment})

    if(error){
        return res.render('error')
    }
    next()
}


const isLoggedIn=(req,res,next)=>{

    if(!req.isAuthenticated()){
        req.flash('error','please login first')
        return res.redirect('/login')
    }
    next();
}

const isSeller=(req,res,next)=>{

    if(!req.user.role){
        req.flash('error','You do not have permission to do that')
        return res.redirect('/products');
    }

    if(req.user.role!='Seller'){
        req.flash('error','you do not have permission to do that')
        return res.redirect('/products');
    }

    next();
}

const isProductAuthor= async(req,res,next)=>{

    let {id}=req.params;

    // let product= Product.findbyById(id); //entire product

    let product= await Product.findById(id); //entire product

    if(!product.author.equals(req.user._id)){
        req.flash('error','you do not have permission to do that')
        return res.redirect('/products');
    }

    next()

    
}




module.exports={validateProduct,isLoggedIn,validateReview,isSeller,isProductAuthor}