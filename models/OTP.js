const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

//  pre hook  (b/w schema and model)
//function
async function SendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification Email from StudyNotion",otp);
        console.log("Email Sent successfully: ",mailResponse);
    } catch (error) {
        console.log("Error occured while sending the mail:",error);
        throw error; 
    }
}

// pre-save hook  (b/w schema and model)
OTPSchema.pre("save",async function (next) {
        await SendVerificationEmail(this.email,this.otp);
        next();
});


module.exports=mongoose.model("OTP",OTPSchema);