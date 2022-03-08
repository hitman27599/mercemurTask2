const { default: mongoose } = require('mongoose');
const AdvanceSettings = require('../../model/AdvanceSettings');
const AttributeDetails = require('../../model/AttributeDetails');
const Discount = require('../../model/Discount');
const Product = require('../../model/Product');
const ProductDetails = require('../../model/ProductDetails');
const Seo = require('../../model/Seo');
const Stock = require('../../model/Stock');
const {ROLES,authenticate} = require('../../auth');

const router = require('express').Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// get all products
router.get('/',async(req,res)=>{
    const products = await Product.find({}).populate("stock");
    res.status(200).send(products);
})

// get single product by id
router.get('/product/:id',async(req,res)=>{
    const id = req.params.id;
    const product =await Product.findById(id).populate("stock");
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
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "DEV"
    },
});
const upload = multer({ storage: storage });
router.post('/',upload.array('image'),async(req,res)=>{
    // console.log(req.body);
    console.log(req.files);
    var images=[];
    for(let img of req.files){
        images.push(img.path);
    }
    console.log(JSON.parse(req.body.stock));
    const productDetails ={
        productName : req.body.productName,
        productShortDesc : req.body.productShortDesc,
        images : images
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

    const stock1 = await Stock.insertMany(JSON.parse(req.body.stock),forceServerObjectId=true);
    var stock=[];
    stock1.forEach((stk)=>{
        stock.push(stk._id);
    });
    

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
        discount:discount
    });
    if(req.body.attributeDetails === ''){
        const attributeDetails = req.body.attributeDetails;
        product[attributeDetails] = attributeDetails;
    }
    const prod = await product.save();
    res.json(prod);

});

// deleted all items
router.delete('/',async(req,res)=>{
    const products = await Product.deleteMany({});
    res.status(200).send("all items deleted");
})

// deleted by id
router.delete('/',async(req,res)=>{
    const id = req.params.id;
    const products = await Product.findByIdAndDelete(id);
    res.status(200).send("all items deleted");
});



module.exports = router;