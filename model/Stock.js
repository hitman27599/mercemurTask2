const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    SKU:{
        type:String
    },
    variant:{
        type:String
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
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

module.exports = Stock = mongoose.model("Stock",StockSchema);