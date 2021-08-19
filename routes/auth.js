const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWTSECRET} = require('../keys');

//register api
router.post('/register', (req, res)=>{
    const {fullname, username, password, } = req.body;
    if(!fullname || !username || !password ){
        return res.status(422).json({error:"Please fill the fields"});
    }
    
    User.findOne({username:username}).then((userExists)=>{
        if(userExists){
            return res.status(422).json({message:"User already exists"});
        }
        //hashing password
        bcrypt.hash(password,12).then(hashedPassword=>{
            const user = new User({fullname, username, password:hashedPassword})
            user.save().then((user)=>{
                res.status(201).json({message: "User registeration success"});
            }).catch(err=>{
                console.log(err);
            })
        })
    }).catch(err=>{
        console.log(err);
    })
});

//login api
router.post('/login', (req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        res.status(422).json({error:"Please fill the fields"});
    }
    User.findOne({username:username}).then(loginUser=>{
        if(!loginUser){
            return res.status(422).json({message:"Invalid username or password"});
        }
        bcrypt.compare(password, loginUser.password).then(doMatch=>{
            if(doMatch){
                //res.json({message: "Loged in Success"});
                const token = jwt.sign({_id:loginUser._id}, JWTSECRET);
                const  {_id, fullname, username} = loginUser;
                res.json({token, user:{_id, fullname, username}});
            }else{
                return res.status(422).json({message:"Invalid username or password"});
            }
        }).catch(err=>{
            console.log(err);
        })
    })
});

module.exports = router;