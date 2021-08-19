const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const Event = require('../models/event');
const User = require('../models/user');
const JoinedUser = require('../models/joinedUserList');

//create and post event
router.post('/createEvent', (req, res)=>{
    const {name, startDate, endDate, status, price} = req.body;
    if(!name || !startDate || !endDate || !status || !price){
        res.status(422).json({error:"Plz add all fields"});
    };
    
    const post = new Event({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        price: req.body.price
    });
    post.save().then(result=>{
        res.json({
            message:"event created",
            post:result
        });
    }).catch(err=>{console.log(err)});
});

//update event
router.put('/eventupdate/:id', (req, res)=>{
    Event.findOneAndUpdate({_id: req.params.id},{
        $set:{
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            price: req.body.price
        }
    }).then(result=>{
        res.status(200).json({message:"updated successfully"});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    })
});

//delete event
router.delete('/delete/:id', (req, res)=>{
    Event.remove({_id: req.params.id}).then(result=>{
        res.status(200).json({
            message:"Event deleted",
            result:result
        });
    }).catch(err=>{
        res.status(500).json({error:err});
    })
});

//join event
router.post('/join/:id', requireLogin,async(req, res)=>{
    const eventName = await Event.findOne({_id: req.params.id});
    const posts = new JoinedUser({
        participants: req.user,
        event_name: eventName
    });
    posts.save().then(result=>{
        // User.findOneAndUpdate({_id: req.user},{
        // $set:{
        //     wallet: req.body.wallet-500
        // }
        // }).then(result=>{
        //     res.status(200).json({message:"wallet updated"});
        // }).catch(err=>{
        //     console.log(err);
        //     res.status(500).json({error:err});
        // });
        res.json({message:"user jpoined"});
    }).catch(err=>{console.log(err)});
});

//get events
router.get('/eventDetails',(req, res)=>{
    JoinedUser.find().populate("participants", "fullname username").populate("event_name", "name startDate endDate").then(result=>{
        res.status(200).json({Event:result});
    }).catch(err=>{
        console.log(err);
    })
});

module.exports = router;