const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");

require('dotenv').config()

//subsection
exports.createSubSection = async( req , res ) => {
    try {
        //fetch the data from req body
        const {sectionId, title, timeDuration, description} = req.body;

        //video file validation
         if (!req.files || !req.files.videoFile) {
            return res.status(400).json({
                success: false,
                message: "Video file is required"
            });
        }
        //extract the file/video
        const video = req.files.videoFile;
        //validation
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json(
                {
                    success:false,
                    message:"All fields are required"
                }
            );
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.COURSE_FOLDER);

        //create the sub-section
        const  SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update Section with this sub section ObjectId
         const  updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                                {$push:{
                                                                    subSection:SubSectionDetails._id
                                                                }},
                                                            {new:true}).populate("subSection");
                                                                
        //log updated section here, after adding populate query
        console.log("Updated Section:", updatedSection);

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub-section created Successfully",
            updatedSection
        })

    } catch (error) {
        
        console.error("Error creating sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the sub-section",
            error: error.message
        });
        
    }
} 

// updateSection 
exports.updateSubSection = async ( req , res ) => {
    try {
        // fetch the subsectionId , title, description , timeDuration
        const { subsectionId, title, description, timeDuration } = req.body;

        // validate ID
        if(!subsectionId){
            return res.status(400).json({
                success:false,
                message:"Sub-Section Id is required"
            });
        }
          // Prepare object for fields to update
        const updates = {};

        if(title) updates.title = title;
        if(description) updates.description = description;
        if(timeDuration) updates.timeDuration = timeDuration;

        // Check if user uploaded a new video
        if (req.files && req.files.videoFile) {
            const video = req.files.videoFile;
             // Upload video to Cloudinary
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.COURSE_FOLDER
            );

            updates.videoUrl = uploadDetails.secure_url;
        }

        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subsectionId,
            updates,
            { new: true }
        )
        return res.status(200).json({
            success: true,
            message: "Sub-section updated successfully",
            updatedSubSection,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating sub section"
        })
    }
}
// deleteSection
exports.deleteSubSection = async (req, res) => {
    try {
        // Fetch subsectionId from URL params
        // const { subsectionId ,sectionId } = req.params;
        const { sectionId ,subSectionId } = req.body;

        console.log(`SectionId:${sectionId} || SubSectionId:${subSectionId}`)
        // Validate IDs
        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID and Section ID are required"
            });
        }

        // 1. Remove subsection reference from Section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSection: subSectionId } },
            { new: true }
        ).populate("subSection");

        // 2. Delete SubSection document
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "Sub-section not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-section deleted successfully",
            updatedSection
        });

    } catch (error) {
        console.error("Error deleting sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the sub-section",
            error: error.message
        });
    }
};
//getAllSubSection
exports.getAllSubSection = async ( req,res ) => {
     try {
        const subSections = await SubSection.find({});

        if (!subSections || subSections.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No SubSections found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "SubSections fetched successfully",
            data: subSections,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching all SubSections",
            error: error.message,
        });
    }
}