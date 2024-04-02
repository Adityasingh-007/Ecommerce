

const mongoose = require("mongoose");

const Review=require('./Review')

const productSchema= new mongoose.Schema({ // will accepts an object

    name:{                   // to add many functionalities in name,ing,desc we will use object 
        type:String,
        trim:true,
        required:true,
    },
    img:{
        type:String,  // img will be in url
        trim:true
    },
    price:{
        type:Number,
        min:0,
        required:true,
    },
    desc:{
        type:String,
        trim:true
    },

    reviews:[           // to put review here in reviews array , only id are store
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'     // ref used to tell kiska schema hai
    }
    
],

    author:{
        type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }
    

})

// findOneAndDelete is a mongodb  middleware use when mongoose methods are called ,(product) is a callback and product is a parameter which is id coming from route products
productSchema.post('findOneAndDelete', async (product)=>{
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

// example of vr camera reviews

// {
//     _id: ObjectId('6569faf9f1cc0f5225e8a6cf'),
//     name: 'vr camera',
//     img: 'https://plus.unsplash.com/premium_photo-1682124511924-dec955f230ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dnIlMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D',
//     price: 300000,
//     desc: 'raddi bekaar mehngaa mt hi le\r\nnext plzz',
//     __v: 3,
//     reviews: [
//       ObjectId('656e1cd0e817a32c5f0aae0a'),
//       ObjectId('656e1de8e817a32c5f0aae13'),
//       ObjectId('656e1e0ee817a32c5f0aae1b')
//     ]
//   },

// after schema make model

let Product=mongoose.model('Product',productSchema);   //Product singular collection name

// to use the model product
// to interchange anything between two files use model.exports
module.exports=Product