const mongoose = require("mongoose");

const noteschema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "None"
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    }
})

const notemodel = mongoose.model('notes',noteschema);

module.exports = notemodel;