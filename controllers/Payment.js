const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require('mongoose');
const { ObjectId } = mongoose;

exports.capturePayment = async (req, res) => {
    try {
        const { course_id } = req.body;
        const userId = req.user.id;

        // Validate courseId
        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid course ID"
            });
        }

        // Find course
        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check if already enrolled
        if (course.studentsEnrolled.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "Student is already enrolled"
            });
        }

        // Check for price
        if (!course.price) {
            return res.status(400).json({
                success: false,
                message: "Course price missing"
            });
        }

        // Create Razorpay order
        const amount = course.price * 100; // convert to paisa
        const currency = "INR";

        const options = {
            amount,
            currency,
            receipt: `receipt_${Date.now()}`,
            //used in verify signature
            notes: {
                courseId: course_id,
                userId: userId
            }
        };

        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDesc: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in capturePayment",
            error: error.message
        });
    }
};


//verify signature of Razorpay and server
exports.verifySignature =  async(req,res) => {
        const webhookSecret = "123456";
        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256",webhookSecret);
        shasum.update(jJSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature == digest){
            console.log("Payment is authorised");
            const {courseId, userId} = req.body.payload.payment.entity.notes;

            try {
                //fulfill the action 
                const enrolledCourse = await Course.findOneAndUpdate(
                                                    {_id: courseId},
                                                    {$push:{studentsEnrolled: userId}},
                                                    {new:true}
                                                );
                
                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:"Course not Found"
                    })
                }


                console.log(enrolledCourse);
                
                //find the course and enroll the student in it
                const enrolledStudent = await User.findOneAndUpdate(
                                                 {_id:userId},
                                                 {$push:{courses:courseId}},
                                                 {new:true},
                );

                console.log(enrolledStudent);

                //mail send kardo
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    "Congratulations",
                    "You are enrolled in the course"
                );
                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Signature Verifed and course Added"
                })

            } catch (error) {
                console.error("Error while verifying signature:", error);

                return res.status(500).json({
                    success: false,
                    message: "Error while processing enrollment",
                    error: error.message
                });
            }
        }

        else{
            return res.json(400).json({
                success:false,
                message:"Invalid  request"
            });
        }
















};

