const express = require("express");
const router = express.Router();
const User = require("../models/usermodels");
const jwt = require("jsonwebtoken");
const sendResetPasswordEmail = require("../controller/controller");


//Home Route
router.get("/", (req, res) => {
  res.send("this is working");
});

// SignUp Api
router.post("/signup", async (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    email,
    password,
    phone_number,
  } = req.body;
  try {
    //Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create a user
    const user = new User({
      first_name,
      last_name,
      date_of_birth,
      email,
      password,
      phone_number,
    });
    const result = await user.save();
    if (result) {
      res.status(201).json({ msg: "Registration Successfully!" });
    } else {
      res.status(400).json({ msg: "Registration Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

//Login Api
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check user exist
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({ msg: "user not found" });
    }
    // check password
    if (user.password === password) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(200).send({ token, msg: "login successfully" });
    } else {
      res.status(400).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
});

// Get all userdata
router.get("/alluser",async(req,res)=>{
    try {
        const alluser = await User.find();
        if(alluser){
            res.status(200).json(alluser);
        }
        else{
            res.status(400).json({msg:"No user found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
})

// Forgot password Api
router.post("/forgotpassword",async(req,res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1 minute'})
            user.token = token;
            await user.save();
            sendResetPasswordEmail(user.first_name,user.email,token)
            res.status(200).send({msg:"please check your email for reset password",token})
        }
        else{
          res.status(400).send({msg:"this email does't exist in our record"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
})

// Reset Passwrod
router.post('/reset-password',async(req,res)=>{
  try {
    const token = req.query.token;
    const tokendata = await User.findOne({token})
    if(tokendata){
      const password = req.body.password;
      const userdata = await User.findByIdAndUpdate({_id:tokendata._id},{$set:{password,token:''}},{new:true})
      console.log("userdata",userdata);
      res.status(200).send({msg:"user password has been reset!",data:userdata})
    }
    else{
      res.status(400).send("token does't match to our record")
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
})

module.exports = router;
