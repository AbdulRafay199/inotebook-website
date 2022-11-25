const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const jwtseckey = "abdulrafayawebdeveloper2002"

// for signup
router.post('/createuser',[
    body('email',"please Enter valid email").isEmail(),
    body("name","Name should be minimum 3 characters long").isLength({min:3}),
    body("password","password should be minimum 8 characters long").isLength({min:8}),
], async (req, res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    else{
        try {
            const useremail = await User.findOne({email: req.body.email});
            if(useremail){
                console.log("Email already exist! Please try with other email.")
                res.status(400).json({success, error:"Email already exist! Please try with other email."});
            }
            else{
                const pwsalt = await bcrypt.genSalt(10)
                const secpass = await bcrypt.hash(req.body.password,pwsalt)
                const result = await User.create({
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email,
                    password: secpass
                })
                // res.json(result);

                const data = {
                    user : {
                        id: result.id
                    }
                }
                success = true;
                const authtoken = jwt.sign(data,jwtseckey);
                res.json({success,authtoken})
            }       
        } catch (err) {
            console.log(err)
            res.status(500).json({success, error:"Internal error occurred"})
        }        
    }
})

// for login
router.post('/loginuser', async (req, res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    else{
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user){
                console.log("Please Login with correct email and password")
                res.status(400).json({success, error:"Please Login with correct email and password"});
            }
            else{
                const pwauth = await bcrypt.compare(req.body.password,user.password);
                if(!pwauth){
                    console.log("Please Login with correct email and password")
                    res.status(400).json({success, error:"Please Login with correct email and password"});
                }
                else{

                    const data = {
                        user : {
                            id: user.id
                        }
                    }
                    success = true
                    const authtoken = jwt.sign(data,jwtseckey);
                    res.json({success,authtoken})
                }
            }       
        } catch (err) {
            console.log(err)
            res.status(500).json("Internal error occurred")
        }       
    }
})

// fetching user
router.get('/getuser',fetchuser, async (req, res)=>{

        try {
            const userid = req.user.id;
            const user = await User.findById(userid).select("-password");
            res.json(user)
            }       
        catch (err) {
            console.log(err)
            res.status(500).json("Internal error occurred")
        }        
})

module.exports = router;