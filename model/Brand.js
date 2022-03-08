const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports = Brand = mongoose.model("Brand",BrandSchema);