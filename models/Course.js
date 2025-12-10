const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        required:true,
    },
    courseDescription:{
        type:String,
        trim:true,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String,
        trim:true,
        required:true,
    },
    courseContent:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"    
        }
    ],
    ratingAndReviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews"
    },
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
    },
    tag:{
        type:[string],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        }
    ],
    scheduledDeletion: {
         type: Date,
        default: null,
    }

});                     

module.exports = mongoose.model("Course",courseSchema);