const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    discountType:{
        type:String,
        required:true
    },
    discountStartDate:{
        type:Date,
    },
    discountEndDate:{
        type:Date,
    }
});

module.exports = DiscountSchema ;