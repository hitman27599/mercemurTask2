const mongoose = require('mongoose');
const ProductDetails = require('./ProductDetails');
const AdvanceSettings = require('./AdvanceSettings');
const Seo = require('./Seo');
const Stock = require('./Stock');
const AttributeDetails = require('./AttributeDetails');
const Discount = require('./Discount');

const ProductSchema = new mongoose.Schema({
    productDetails:ProductDetails,
    advanceSettings:AdvanceSettings,
    seo:Seo,
    stock:{type:[mongoose.SchemaTypes.ObjectId] ,ref:'Stock'},
    attributeDetails:[AttributeDetails],
    discount:Discount
});

module.exports = Product = mongoose.model("Product",ProductSchema);