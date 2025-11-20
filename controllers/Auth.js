const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile  = require('../models/Profile')
//send otp
exports.sendOTP= async(req,res)=>{
    try {
        // fetch email from req body
        const {email} = req.body;
        
        if(!email){
            return  res.status(400).json({
                success:false,
                message: "Email is required"
            });
        }

        // check if user has entered a valid email or not
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return  res.status(400).json({
                success:false,
                message: "Invalid email format"
            });
        }


        const isUserExist = await User.findOne({email});
    
        //if user exist send a failure message
        if(isUserExist){
            return res.status().json({
                success:false,
                message:"User already exists"
            })
        }
    
        //generate the otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        
        // delete the old otps for the req email
            await OTP.deleteMany({ email });


         //save the otp to db
        const otpBody = await OTP.create({ email, otp });
        console.log("OTP Body: ",otpBody);

         return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp, // remove this in production
        });

    } catch (error) {

        console.log("Error in sendOTP:", error);
        return res.status(500).json({
            success: false,
            message: "Error sending OTP",
        });
    }
}

//signup
exports.signup = async (req,res)=>{
    try {
        //fetch the data from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
    
        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
              return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
    
        if(password !== confirmPassword){
            return res.status().json({
                success:false,
                message:"Password and ConfirmPassword values does not match, Please try again"
            });
        }
    
         //checking if the user has entered a valid phone number
        const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
        
        if (!phoneRegex.test(contactNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number format",
            });
        }

        //check for existing user
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered, Please login",
            })
        }
    
        //validate the otp
        //find the otp from db
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired",
            });
        }
    
        //match it with request body
        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
    
        //delete otp after verification
        await OTP.deleteMany({ email });
        
        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);
    
        //create db entry
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber
        })
    
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`
        });
    
        //return  success response
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        });


    } catch (error) {
        console.log("Something went wrong in signup function");
        console.log(error.message);

        return res.status(500).json({
            success:false,
            message:"User cannot be registered,Please  try again"
        });
    }

}

