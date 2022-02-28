const mongoose = require('mongoose');

const ProductDetailsSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productShortDesc:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    }
});

module.exports = ProductDetailsSchema ;