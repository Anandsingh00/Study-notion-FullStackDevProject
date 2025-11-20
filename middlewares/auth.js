const jwt =  require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');


//auth
exports.auth = async ( req,res,next )=>{
    try {
        //extract token
        const authHeader = req.header("Authorization");
        const token =     req.cookies.token 
                     ||   req.body.token 
                     ||  (authHeader && authHeader.startsWith("Bearer ")
                            ? authHeader.replace("Bearer " ,"")   
                            :null);
        //if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message: "token is missing"
            });
        }

        try {
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
        next();
        
    } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Something went wrong while validating the token"
            });
    }
}
//isStudent
exports.isStudent = async( req, res, next )=>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(403).json({
                success:false,
                message:"This is a protected Rout for Students",
            });
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Only Students are allowed to access this route"
        });
    }
}


//isInstructor
exports.isInstructor = async( req, res, next )=>{
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(403).json({
                success:false,
                message:"This is a protected Rout for Instructor",
            });
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Only Instructor are allowed to access this route"
        });
    }
}


//isAdmin
exports.isAdmin = async( req, res, next )=>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(403).json({
                success:false,
                message:"This is a protected Rout for Admin",
            });
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Only Admin are allowed to access this route"
        });
    }
}