const mongoose = require('mongoose');
const { ROLES } = require('../auth');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:ROLES.USER
    }
});

module.exports = User = mongoose.model("User",UserSchema);