const express=require('express')
const Product=require('../models/Product')
const router=express.Router() // mini instance use in place of app
// const review=require('./Review')
const Review = require('../models/Review');

const {validateProduct,isLoggedIn,isSeller, isProductAuthor}=require('../middleware')


// to show all the products

// get request data bhejta hai usse pta chlta hai ki hm pr koi request aayi hai, post rquest jab db mein changes krne ho
// jab res mein koi page show krana ho to use routes(routing) kehte hai warna use 
router.get('/products' , async(req,res)=>{   
    
    try{
    let products = await Product.find({});
    res.render('products/index' , {products});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// to show form to add new product

router.get('/product/new',isLoggedIn,(req,res)=>{
    try{
    res.render('products/new')
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// to actually add the product to database

router.post('/products', validateProduct,isLoggedIn,isSeller,async(req,res)=>{

    try{
     let {name,img,price,desc}=req.body

     // author req.body mein nahi hai woh Logged in hai aur explicit access krenge in req.user

     await Product.create({name,img,price,desc,author:req.user._id})
     req.flash('success', 'product added succesfully')
     res.redirect('/products')  
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }

})

// to show a product

router.get('/products/:id',isLoggedIn,async(req,res)=>{
    try{
    let {id}=req.params

    let foundProduct= await Product.findById(id).populate('reviews')   // to populate the reviews wuth product to show both product and review,connecting both collections
    res.render('products/show',{foundProduct,msg:req.flash('msg')})
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// to edit the product

router.get('/products/:id/edit',isLoggedIn,async (req,res)=>{
    try{
    let{id}=req.params
    let foundProduct= await Product.findById(id)

    res.render('products/edit',{foundProduct})
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }

})

// to update the product/actually edit the product in db

router.patch('/products/:id',validateProduct,isLoggedIn,async (req,res)=>{
    try{
    let {id}=req.params
    let{name,img,price,desc}=req.body

    await Product.findByIdAndUpdate(id,{name,img,price,desc})

    req.flash('success', 'product edited succesfully')
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }

})

router.delete('/products/:id',isLoggedIn,isProductAuthor, async (req,res)=>{
    try{
    let {id}=req.params

    const product= await Product.findById(id)
    

    // Method 1 to delete reviews with product , reviews ko pehle delete krdiya hai

    // for(let id of product.reviews){
    //     await Product.findByIdAndDelete(id)
    // }

    // Method 2 ---Production Method

    await Product.findByIdAndDelete(id)
   // Now as mongodb method is called so we will use mongodb middleware used on schema to delete reviews
   req.flash('success', 'product deleted succesfully')
    res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})




module.exports=router;