const { error } = require('console');
const mongoose = require('mongoose');
const database_url = process.env.DATAABSE_URL

mongoose.connect(database_url)
.then(()=>{
    console.log("Connected to DB")
})
.catch((error)=>{
    console.log("Error connecting to DB", error)
})