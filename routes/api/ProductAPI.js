const { default: mongoose } = require('mongoose');
const AdvanceSettings = require('../../model/AdvanceSettings');
const AttributeDetails = require('../../model/AttributeDetails');
const Discount = require('../../model/Discount');
const Product = require('../../model/Product');
const ProductDetails = require('../../model/ProductDetails');
const Seo = require('../../model/Seo');
const Stock = require('../../model/Stock');

const router = require('express').Router();

// get all products
router.get('/',async(req,res)=>{
    const products = await Product.find({});
    res.status(200).send(products);
})

// get single product by id
router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    const product =await Product.findById(id);
    res.status(200).send(product);
})

// greater/lesser than than price
router.get('/pricerange',async(req,res)=>{
    const gt = req.body.gt;
    const lt = req.body.gt;

    const products = await Product.find({},{stock:1}).populate("stock");
    var result = [];
    for(prod of products){
        const res1=prod.stock.filter((data)=>{return data.price>gt && data,price>lt});
        result.push({
            productId:prod._id,
            stock:res1
        });
    }
    res.json(result);
});

// get products by brand
// need to change to id(currently string)
router.get('/brand/:brand',async(req,res)=>{
    const brand = req.params.brand;
    const products = await Product.find({'advanceSettings.brand':brand});
    res.status(200).send(products);
});

// get products by cateogary
router.get('/cateogary/:cateogary',async(req,res)=>{
    const cateogary = req.params.cateogary;
    const products = await Product.find({'advanceSettings.cateogary':cateogary});
    res.status(200).send(products);
});

// add product
router.post('/',async(req,res)=>{

    const productDetails ={
        productName : req.body.productName,
        productShortDesc : req.body.productShortDesc,
        images : req.body.images
    };

    const advanceSettings = {
        slug : req.body.slug,
        brand : req.body.brand,
        featured : req.body.featured,
        cateogary : req.body.cateogary,
        productContent : req.body.productContent
    };

    const seo = {
        metaName : req.body.metaName,
        metaKeyword : req.body.metaKeyword,
        metaDescription : req.body.metaDescription
    };

    const stock1 = await Stock.insertMany(req.body.stock,forceServerObjectId=true);
    var stock=[];
    stock1.forEach((stk)=>{
        stock.push(stk._id);
    });
    

    const attributeDetails = req.body.attributeDetails;

    const discount = {
        discountType : req.body.discountType,
        discountStartDate : req.body.discountStartDate,
        discountEndDate : req.body.discountEndDate
    };

    const product = new Product({
        productDetails:productDetails,
        advanceSettings:advanceSettings,
        seo:seo,
        stock:stock,
        attributeDetails:attributeDetails,
        discount:discount
    });
    const prod = await product.save();
    res.json(prod);

});

// deleted all items
router.delete('/',(req,res)=>{
    const products = Product.deleteMany({});
    res.status(200).send("all items deleted");
})

// deleted by id
router.delete('/',(req,res)=>{
    const id = req.params.id;
    const products = Product.findByIdAndDelete(id);
    res.status(200).send("all items deleted");
})


module.exports = router;