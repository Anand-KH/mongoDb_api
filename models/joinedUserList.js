const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    participants:{
        type: ObjectId,
        ref:"User"
    },
    event_name:{
        type: ObjectId,
        ref:"Event"
    },
})

const JoinedUser = mongoose.model('JoinedUser', userSchema);
module.exports = JoinedUser;