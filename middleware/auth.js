const jwt = require('jsonwebtoken');

const verifyAuth = (req,res,next) =>{
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];
    if(!token) return  res.status(401).send({success: false,message:"Access token not found"});
    try {
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_CERT_KEY)
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log(error)
        res.status(403).json({success: false,message:"Invalid token"})
    }
}
module.exports = verifyAuth;