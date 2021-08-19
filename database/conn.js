const  mongoose = require('mongoose');
const {DB} = require('../keys');

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('Mongobd Connected');
}).catch((err)=> console.log(err));