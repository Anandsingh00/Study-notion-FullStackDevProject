const Category = require('../models/Category');

//create Category
exports.createCategory = async(req,res) =>{
    try {
        //fetch data from req body
        const { name, description } = req.body;

        if(!name || !description){
            return res.status(400).json({
                successs:false,
                message:"All fields are required",
            });
        }

        //create entry in db
        const CategoryDetails = await Category.create({
            name:name,
            description:description,
        });

        console.log(CategoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
}

//getAllCategory
exports.showAllCategory=async(req,res)=>{
    try {
        const allCategory = await Category.find({},{name:true, description:true});
        return res.status(200).json({
            success:true,
            message:"All  Category returned successfully",
            allCategory
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

