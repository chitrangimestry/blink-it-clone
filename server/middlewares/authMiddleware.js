const jwt = require("jsonwebtoken");

exports.authMiddleware = async(req, res, next) => {
    try {

        const token = req.cookies.accessToken || req?.header?.authorization.spilt("")[1];
        console.log("token: ", token );

        if(!token){
            return res.status(401).json({
                message: "Please provide the token"
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        if(!decode){
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            })
        }
        console.log("decode: ", decode);
        req.userId = decode.id;
        
        next();
        
    } catch (error) {
        return res.status(500).json({
            message: error + "Internal Server Error",
            error: true,
            success: false
        })
    }
}