const mongoose = require('mongoose');


// userSchema
const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type:String,
        required: true,
    },
    date_of_birth:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    phone_number:{
        type:Number,
        required: true,
    },
    token:{
        type:String,
        default:''
    }
})


// Create a Collection
const User = new mongoose.model('User',userSchema);
module.exports = User;