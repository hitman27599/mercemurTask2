const mongoose = require('mongoose');
const Attributes = require('./Attributes');

const AttributeDetailsSchema = new mongoose.Schema({
    attributeName:{
        type:String
    },
    attributes:{
        type:[String]
    }
});

module.exports = AttributeDetailsSchema ;