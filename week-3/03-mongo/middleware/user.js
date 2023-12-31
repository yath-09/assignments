const { User } = require("../db")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username=req.headers.username
    const password=req.headers.password
    User.findOne({
        username:username,  // tofind and tehn to check
        password:password
    })
    .then(function(value){
        if(value) next() // middle ware to call the next 

        else {
            res.status(403).json({
                msg:"user doest don't exist"
            })
        }
    })


}

module.exports = userMiddleware;