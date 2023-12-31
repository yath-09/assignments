const {Admin} =require ("../db/index.js")


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers.username
    const password=req.headers.password
    Admin.findOne({
        username:username,  // tofind and tehn to check
        password:password
    })
    .then(function(value){
        if(value) next() // middle ware to call the next 

        else {
            res.status(403).json({
                msg:"Admin doest don't exist"
            })
        }
    })

}

module.exports = adminMiddleware;