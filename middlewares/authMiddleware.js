const jwt = require('jsonwebtoken');


const authToken = async (req,res,next)=>{
    const token = req.header("authorization");
    if(!token){
            return res.status(403).json({
                message:"Access Denied:No token provided"
            });
    }
    try {
        const tokenDetails = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET_KEY
        );  
        req.user=tokenDetails
        next()    
    } catch (error) {
        res.status(403).json({
            message:"Access Denied:No token provided"
        }); 
    }
}

module.exports = authToken;