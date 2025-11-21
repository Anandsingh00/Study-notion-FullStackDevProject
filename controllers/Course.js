const Course = require('../models/Course');
const Tag = require('../models/Tags');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');


//createCourse function
exports.createCourse = async (req,res)=>{
    try {
        //fetch data
        const {courseName , courseDescription , whatYouWillLearn , price , tag } = req.body; 

        const thumbnail = req.files.thumbnailImage;

        //vadiation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({ 
                success:false,
                message:"All fields are required"
            }); 
        }

        //check for instructor
        const instructorDetails = await User.findById(req.user.id); 
        console.log("Instructor details: ",instructorDetails);

        if(!instructorDetails ){
            return res.status(403).json({
                success:false,
                message:"instructor not found"
            });
        }

        //check given tag is valid or not
        const tagDetails = await Tag.findById(tag);

        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"Tag not found"
            }); 
        }

        //upload image to cloudinary
        const uploadDetails = await uploadImageToCloudinary(thumbnail,process.env.COURSE_THUMBNAIL_FOLDER);
        
        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:uploadDetails.secure_url,
        });
        console.log("New Course created: ",newCourse);

        // add the new course to the user schema
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new:true},
        )

        //update the tag schema
        await Tag.findByIdAndUpdate(
            {_id:tagDetails._id},
            {
                $push:{
                    course: newCourse._id
                }
            },
            {new:true}
        )



        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the course",
            error: error.message
        });
    }

}


//get all courses
exports.getAllCourses = async(req,res)=>{
    try {
        const allCourses = await Course.find({},{courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReviews:true,
                                                studentsEnrolled:true,
                                                }).populate("instructor","firstName lastName email").exec(); 
        return res.status(200).json({
            success:true,
            message:"Data for all courses fetch  successfully",
            data:allCourses,
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot fetch couse data",
            error:error.message
        })
    }
}