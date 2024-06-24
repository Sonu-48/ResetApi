const nodemailer = require('nodemailer')



const sendResetPasswordEmail = async(name,email,token)=>{
try {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: "smpt.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password",
        html: `
          <p>Hi ${name},</p>
          <p>Click <a href="http://localhost:4000/reset-password?token=${token}">here</a> to reset your password.</p>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `
      };
      transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log("Mail has been sent",info.response)
        }
      })
} catch (error) {
    console.log(error);
    res.status(500).send("server errror")
}
}

module.exports = sendResetPasswordEmail;