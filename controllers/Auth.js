const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');


require('dotenv').config();

// send otp
exports.sendotp = async (req, res) => {
    try {
        // fetch email from req body
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required',
            });
        }

        // check if user has entered a valid email or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format',
            });
        }

        const isUserExist = await User.findOne({ email });

        // if user exist send a failure message
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // generate the otp
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // delete the old otps for the req email
        await OTP.deleteMany({ email });

        // save the otp to db
        const otpBody = await OTP.create({ email, otp });
        console.log('OTP Body: ', otpBody);

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            // otp, // remove this in production
        });
    } catch (error) {
        console.log('Error in sendOTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Error sending OTP',
        });
    }
};

// signup
exports.signup = async (req, res) => {
    try {
        // fetch the data from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        // validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and ConfirmPassword values does not match, Please try again',
            });
        }

        // checking if the user has entered a valid phone number
        const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

        if (!phoneRegex.test(contactNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number format',
            });
        }

        // check for existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already registered, Please login',
            });
        }

        // validate the otp
        // find the otp from db
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: 'OTP not found or expired',
            });
        }

        // match it with request body
        if (otpRecord.otp !== String(otp)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP',
            });
        }

        // delete otp after verification
        await OTP.deleteMany({ email });

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create db entry
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: 'User is registered successfully',
            user,
        });
    } catch (error) {
        console.log('Something went wrong in signup function');
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: 'User cannot be registered,Please  try again',
        });
    }
};

// login
exports.login = async (req, res) => {
    try {
        // fetch the data from req body
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required,Please try again',
            });
        }

        // validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format',
            });
        }

        // find user
        const user = await User.findOne({ email }).populate('additionalDetails');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered,Please create your account',
            });
        }

        // match the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect',
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        const userData = user.toObject();
        userData.token = token;
        delete userData.password;

        // create a cookie and send response
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        return res
            .cookie('token', token, cookieOptions)
            .status(200)
            .json({
                success: true,
                token,
                user: userData,
                message: 'Logged In Successfully',
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login failure , please try again',
        });
    }
};
//change password
exports.changePassword = async (req, res)=>{
    try {
        const { email , oldPassword , newPassword , confirmNewPassword } = req.body;

        if(!email || !oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }


        if(oldPassword === newPassword){
            return res.status(400).json({
                success:false,
                message:"New password cannot be same as old password"
            });
        }
    
        //fetch the user by db call
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        //check  : newPassword & confirmNewPassword match
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                    success: false,
                    message: 'Password and ConfirmPassword values does not match, Please try again',
            });
        }
        
        //validate oldPassword
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
       
        if(!isPasswordMatch){
            return res.status(401).json({
                    success: false,
                    message: 'Password is incorrect',
            });
        }

        //hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //now update password inside the db
        user.password = hashedPassword;
        await user.save();

        //send a mail to the user -(that password is changed) (email,title,body)
        const mailResponse = await mailSender(
            email,
            "Password Changed Successfully",
            `
                <h2>Hello ${user.firstName},</h2>
                <p>Your password has been <b>successfully updated</b>.</p>
                <p>If you did not request this change, please reset your password immediately or contact support.</p>
                <br/>
                <p>Regards,<br>StudyNotion Team</p>
            `
        );

        console.log("Email sent:", mailResponse);

        return res.status(200).json({
            success:true,
            message:"Password changed successfully",
        });


    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while changing password',
        });
    }
    
};
 
