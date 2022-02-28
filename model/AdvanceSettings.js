const mongoose = require('mongoose');
const Brand = require('./Brand');

const AdvanceSettingsSchema = new mongoose.Schema({
    slug:{
        type:String
    },
    brand:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Brand"
    },
    featured:{
        type:String
    },
    cateogary:{
        type:[String]
    },
    productContent:{
        type:String
    }
});

module.exports = AdvanceSettingsSchema ;