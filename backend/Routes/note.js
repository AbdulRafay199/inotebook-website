const express = require("express");
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body , validationResult } = require("express-validator");

const router = express.Router();

// fetching notes by user id and auth-token
router.get('/fetchnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({userid : req.user.id});
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal error occurred")
    }
})

// adding notes by user id and auth-token
router.post('/addnotes',[
    body("title").isLength({min:5}).exists(),
    body("description").isLength({min:5}).exists(),
],fetchuser, async (req, res)=>{
    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json("Please Enter Valid Title and description")
        }
        const notes = await Note.create({
            userid: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        notes.save();
        res.json(notes);
    }catch(error){
        console.log(error)
        res.status(500).json("Internal error occurred")
    }
    
})


// delete notes by user id and auth token
router.delete('/deletenotes/:id', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.findById(req.params.id);
        if(!notes){
            return res.status(400).json("Please Enter Note first");
        }
        else{
            if(notes.userid !== req.user.id){
                return res.status(400).json("Warning: You are not allowed to delete notes other than yours!");
            }
            const notetodlt = await Note.findByIdAndDelete(req.params.id)
            res.json(notetodlt);
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal error occurred")
    }
    
})

// updating notes
router.put('/updatenotes/:id', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.findById(req.params.id);
        if(!notes){
            return res.status(400).json("Please Enter Note first");
        }
        else{
            if(notes.userid !== req.user.id){
                return res.status(400).json("Warning: You are not allowed to Update notes other than yours!");
            }
            const notetoupdate = await Note.findByIdAndUpdate(req.params.id)
            const newnote = await notetoupdate.updateOne({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag
            });
            res.json(newnote);
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal error occurred")
    }
    
})

module.exports = router