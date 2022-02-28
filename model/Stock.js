const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    SKU:{
        type:String
    },
    attribute:{
        type:[String]
    },
    quantity:{
        type:Number
    },
    stockStatus:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports = Stock = mongoose.model("Stock",StockSchema);