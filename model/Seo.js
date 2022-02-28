const mongoose = require('mongoose');

const SeoSchema = new mongoose.Schema({
    metaName:{
        type:String,
    },
    metaKeyword:{
        type:[String],
    },
    metaDescription:{
        type:String
    }
});

module.exports = SeoSchema;