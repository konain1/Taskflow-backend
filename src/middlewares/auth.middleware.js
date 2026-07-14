const logger = require("../config/logger");
const User = require("../models/user.model");
const { verifyAccessToken } = require("../utils/accessToken.util");



const protect = async (req, res, next) => {
    
    try {

        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer ')) {
            logger.error({ header }, "unable to find token")
            return res.status(401).json({success:false,message:'unable to find token'})
            
        }

        // Extract token from Bearer <token>
        const token = header.split(' ')[1];

        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            logger.error({ user }, "user not found!");
            return res.status(401).json({ success: false, message: "user not found!!" });
        }

        req.user = user;
        next();

    } catch (error) {
        logger.error({ error: error.message || error });
        return res.status(401).json({ success: false, message: error.message || error });
    }
};

module.exports = protect;