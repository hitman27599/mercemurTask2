const User = require('../../model/User');
const router = require('express').Router();

router.post('/',async(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    await user.save();
    res.status(200).send("user created");

})

module.exports = router;