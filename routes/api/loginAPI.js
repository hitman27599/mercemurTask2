const User = require('../../model/User');
const router = require('express').Router();

const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv').config();

router.post('/',(req,res)=>{
    const name = req.body.name;
    const password = req.body.password;

    User.findOne({name:name},(err,user)=>{
        if(err){
            return res.status(400).send(err);
        }else{
            if(user === null){
                return res.status(400).send("user not found");
            }
            // check password
            if(user.password == password){
                const token = jwt.sign(user.toJSON(),process.env.ACCESS_JWT_KEY);
                req.headers.authorization = "Bearer " + token;
                cookieSession.user = user;
                cookieSession.token = token;
                // res.redirect('http://localhost:3000/home');
                res.status(200).send({token:token});
            }else{
                return res.status(400).send("password incorrect");
            }
        }
    });
});

module.exports = router;