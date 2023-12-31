const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../../03-mongo/db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username=req.body.username
    const password=req.body.password
    //check if user exist
    await User.create({
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

    const user=await User.find({
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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const username=req.username //using the middleware
    const courseId = req.params.courseId;
    

    await User.updateOne({ //adds a column to ddata entry or row
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
  
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const username=req.username
    const user = await User.findOne({
        username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses // where id in cousres
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router