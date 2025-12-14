const ratingAndReviews = require('../models/RatingsAndReview');
const Course = require("../models/Course");

//createRating 
exports.createRating = async (req,res)=>{
    try {
        // get user id
        const userId = req.user.id;
        // fetch data from req body
        const { rating , review , courseId } = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                            { _id:courseId,
                                            studentsEnrolled: {$elemMatch : {$eq: userId} },
                                            });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed  = await ratingAndReviews({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed){
            res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            })
        }

        
        //create rating
        const ratingReview = await ratingAndReviews.create({
                                                    rating,review,
                                                    course:courseId,
                                                    user:userId
                                                });
        //update the course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push:{
                                            ratingAndReviews:ratingReview._id,
                                        }
                                    },{new:true});
        console.log(updatedCourseDetails);
        //return res
        return res.statu(200).json({
            success:true,
            message:"Rating and review created successfully",
            ratingReview,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//getAverageRating
exports.getAverageRating = async (req,res) => {
    try {
        const courseId = req.body.courseid;
        //calc average rating

        const result = await ratingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg: "$rating"},
                    
                }
            }
        ])
         
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//getAllRating

