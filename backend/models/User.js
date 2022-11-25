const mongoose = require("mongoose");
// const {Schema}  = mongoose;

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

const usermodel = mongoose.model('user',userschema);

module.exports = usermodel;