const express = require('express');
require('dotenv').config();
require('./db/connection');
const router = require('./routes/route')
const bodyParser = require('body-parser');

const app = express();
port = process.env.PORT || 5000
app.use(express.json());
app.use(router);
app.use(bodyParser.json());

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})