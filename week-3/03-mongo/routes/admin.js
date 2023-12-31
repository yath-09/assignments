const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username
    const password=req.body.password
    //check if user exist
    await Admin.create({
        username,password
    })
    
    res.json({
        msg:"Created successfully"
    })

});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    //admin middle ware hits first 

    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;

    const newCourse=await Course.create({
        title,description,imageLink,price
    })

    res.json({
        msg:"Course sent Successfully",
        courseId:newCourse._id
    })
});

router.get('/courses', adminMiddleware,(req, res) => {
    // Implement fetching all courses logic

    const allCourse=Course.find({
       // need to find all courses
    })
    .then(function(response){
        res.json({
            courses:response
        })
    })
});

module.exports = router;