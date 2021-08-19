const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    startDate:{
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})


const Event = mongoose.model('Event', userSchema);
module.exports = Event;