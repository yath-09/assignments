const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin,Course, User } = require("../../03-mongo/db");
const router = Router();
const jwt=require("jsonwebtoken");
const JWT_SECRET = "123";
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

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username
    const password=req.body.password

    const user=await Admin.find({
        username,password
    })
    if (user) {
        const token=jwt.sign({
            username
        },JWT_SECRET)
        res.json({token})
    } else {
        res.status(403).json({msg:"wrong token"})
    }
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

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

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
     const allCourse=await Course.find({
        // need to find all courses
     })
     .then(function(response){
         res.json({
             courses:response
         })
     })

});

module.exports = router;