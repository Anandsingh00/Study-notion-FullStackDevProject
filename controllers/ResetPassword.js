const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');

//resetPasswordToken
exports.resetPasswordToken = async( req , res )=>{
   try {
     //get email from the req.body
     const email = req.body.email;
     if(!email) {
         return res.status(400).json({
                 success: false,
                 message: 'Email is required',
             });
     }
     //check email validation and check user for this email
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
             return res.status(400).json({
                 success: false,
                 message: 'Invalid email format',
             });
         }
 
         const user = await  User.findOne({email:email});
         if(!user){
             return res.status(200).json({
                success: true,
                message: "If this email exists, a reset link has been sent",
            });
         }
 
         //generate token
         const token = crypto.randomUUID();
 
         //update user by adding token and expiration time
         const updatedDetails = await User.findOneAndUpdate(
                                         {email:email},
                                         {   
                                             token:token,
                                             resetPasswordExpires:Date.now() + 5*60*1000
                                         },
                                         {new:true});
 
     //create url
     const url = `http://localhost:3000/update-password/${token}`;
     //send the mail
     await mailSender(email,
                      "Password Reset Link",
                     `
                        <h2>Password Reset Request</h2>
                        <p>Click the link below to reset your password:</p>
                        <a href="${url}">${url}</a>
                        <p>This link will expire in 5 minutes.</p>
                    `
                     );
     //return response
     return res.status(200).json({
         success:true,
         message:"Email sent successfully,please check email and change the pwd"
     })

   } catch (error) {
        console.log("Error in resetPasswordToken")
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, Please try again"
        })
   }
}


//resetPassword
exports.resetPassword = async(req,res)=>{
    try {
        //data fetch
        const { password , confirmPassword , token} = req.body;

        if(!password || !confirmPassword || !token){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match",
            });
        }
    
        //get user details
        const userDetails = await User.findOne({token:token});
        
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"token invalid"
            });
        }
        //token time check
        if( userDetails.resetPasswordExpires < Date.now() ){
            return res.status(400).json({
                success:false,
                message:"Token is expired , Please regenerate it"
            });
        }

        //hash pwd
        const hashedPassword = await bcrypt.hash(password,10);
        //password update
        userDetails.password = hashedPassword;
        userDetails.token = null;
        userDetails.resetPasswordExpires = null;

        await userDetails.save();

        //send success response
        return res.status(200).json({
            success:true,
            message:"Password reset successful"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong in resetPassword function"
        });
    }



}