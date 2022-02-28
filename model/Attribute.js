const mongoose = require('mongoose');

const AttributeSchema = new mongoose.Schema({
    name:{
        type:String
    }
});

module.exports = AttributeSchema ;