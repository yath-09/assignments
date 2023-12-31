// Middleware for handling auth

const JWT_SECRET = "123";
const secret=require("../index")
const jwt=require("jsonwebtoken")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    
    const token=req.headers.authorization;
    // get back the token
    const words=token.split(" ")
    const jwtToken=words[1]

    const decodedValue=jwt.verify(jwtToken,JWT_SECRET)
    if(decodedValue.username) next()
    else res.status(403).json({
              msg:"Not authenticated "
            
     })

     


    


}

module.exports = adminMiddleware;