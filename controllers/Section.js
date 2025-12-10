const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;
        //data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        //create section
        const newSection = await Section.create({ sectionName });

        //update course with section ObjectID 
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        ).populate({
            path: 'courseContent',
            populate: { path: 'subSection' }
        });

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }
        //return response
        return res.status(200).json({
            success: true,
            message: 'Section created and course updated',
            section: newSection,
            updatedCourse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating section',
        });
    }
};


exports.updateSection= async(req,res)=>{
    try {   
        //data input
        const {sectionName , sectionId} = req.body;
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        //return response
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully"
        })        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating section',
        });
    }
}



exports.deleteSection = async(req,res)=>{
    try {
        //get ID
        const {sectionId} = req.params
        //use findByIdAndDelete
         await Section.findByIdAndDelete(sectionId);
         //TODO : do we need to delete the entry from the course schema?

        //return response
        return res.status(200).json({
            success:true,
            message:"Deletion successful"
        })

    } catch (error) {
         console.error(error);
        return res.status(500).json({
                success: false,
                message: "Something went wrong while deleting section"
        });
    }
}



exports.getSectionDetails = async (req,res) => {
    try {
        //fetch the id from req
        const {sectionId} = req.params;

        //get all details from db
        const sectionDetails = await Section.findById(sectionId)
        .populate("subSection")
        .exec();

        if(!sectionDetails){
            return res.status(404).json({
                success:false,
                message:"Section not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Section details retrieved successfully"
        });

    } catch (error) {
        return res.status(500).json({
                success:false,
                message:"Something went wrong in getSectionDetails ",
                error: error.message,
            })
    }
}