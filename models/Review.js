

const mongoose = require('mongoose');

const reviewSchema= new mongoose.Schema({ 

    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    }

},{timestamps:true})         // timestamps to add time with review

// after schema make model

let Review=mongoose.model('Review',reviewSchema);

// to use the model product
// to interchange anything between two files use model.exports
module.exports=Review