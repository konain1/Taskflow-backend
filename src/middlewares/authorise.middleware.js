const logger = require("../config/logger");


const authorize = (...allowedRoles) => (req, res, next) => {
    
    if (!req.user) {
          logger.error({},"not authenticate user not found on req.user" )
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
        let role = req.user.role
        logger.warn({ role }, "You don't have permission to do this")
        return res.status(403).json({
            success: false,
            message: "You don't have permission to do this",
        });
    }
    next()
}

module.exports = authorize;