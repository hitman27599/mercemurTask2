const Brand = require('../../model/Brand');

const router = require('express').Router();


// get all brands
router.get('/',async(req,res)=>{
    const brands = await Brand.find({});
    res.status(200).send(brands);
})

// create a brand
router.post('/',async(req,res)=>{
    const name = req.body.name;
    const image= req.body.image;

    const brand =new Brand({
        name:name,
        image:image
    });
    await brand.save();
    res.status(200).send("brand created");
});


module.exports = router;