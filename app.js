const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
require('./database/conn');
const {PORT} = require('./keys');

require('./models/user');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/event'));

app.listen(PORT, ()=>{
    console.log(`server started ${PORT}`);
});