const mongoose = require('mongoose');
const Attribute = require('./Attribute');

const AttributesSchema = new mongoose.Schema({
    attribute:{
        type:[Attribute]
    }
});

module.exports = AttributesSchema ;