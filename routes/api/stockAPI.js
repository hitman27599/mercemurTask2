const Product = require('../../model/Product');
const Stock = require('../../model/Stock');

const router = require('express').Router();

// get single stock details by id
router.get('/stock/:id',async(req,res)=>{
    const id = req.params.id;
    const stock = await Stock.findById(id);
    if(stock === null){
        return res.status(400).send("no stock found");
    }
    res.status(200).send(stock);
});

// add array of stocks
router.post('/',async(req,res)=>{
    const id = req.body.id;
    const attributeDetails = req.body.attributeDetails;
    const stock1 = await Stock.insertMany(req.body.stock,forceServerObjectId=true);
    var stock2=[];
    stock1.forEach((stk)=>{
        stock2.push(stk._id);
    });
    const product = await Product.findByIdAndUpdate(id,{$push:{stock:{$each:stock2}},attributeDetails:attributeDetails},{new:true});
    res.status(200).send(product);
});


// delete a single stock by id
router.delete('/stock:id',async(req,res)=>{
    const id = req.params.id;
    const stock = await Stock.findByIdAndDelete(id);
    if(stock === null){
        return res.status(400).send("no stock found");
    }
    res.status(200).send("stock deleted");
});

module.exports = router;