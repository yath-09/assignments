const jwt=require("jsonwebtoken")


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization;
    // get back the token
    const words=token.split(" ")
    const jwtToken=words[1]

    const decodedValue=jwt.verify(jwtToken,"123")
    if(decodedValue.username){ 
        req.username=decodedValue.username; // imp step as we can put the value in thwe req.usrena,me
        next()
        
    }
    else res.status(403).json({
              msg:"Not authenticated "
            
     })
}

module.exports = userMiddleware;