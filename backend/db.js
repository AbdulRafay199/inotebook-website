const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/inotebook"

const connecttomongo = ()=>{

    mongoose.connect(url, ()=>{
        console.log("Connection to mongodb for inotebook is successfully done!")
    })
}

module.exports = connecttomongo;