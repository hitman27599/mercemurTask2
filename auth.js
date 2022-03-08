const jwt = require('jsonwebtoken');
const cookieSession = require('cookie-session');
const dotenv= require('dotenv').config();

const ROLES = {
    ADMIN:"Admin",
    USER: "user"
}

const authenticate = (req,res,next)=>{
    const token = cookieSession.token;
    console.log(token);
    if(token === null){
        console.log("user not authenticated");
        return res.status(400).send("user not authenticated");
    }
    jwt.verify(token,process.env.ACCESS_JWT_KEY,(err,user)=>{
        if(err){
            console.log("token tampered");
            return res.status(403).send("token tampered");
        }
        req.user = user;
        next();
    })
}

function authAdmin(req,res,next){
    const user = cookieSession.user;
    if(user.role !== ROLES.ADMIN ){
        return res.status(403).send("forbidden");
    }
    next();

}

module.exports = {authenticate,authAdmin,ROLES};