const logger = require('../config/logger');

const requests = new Map();

const myRateLimit = (req, res, next) => {
    const myIp = req.ip;
    const maxRequests = 5;
    const windowTime = 10; 

    const record = requests.get(myIp);
    const now = Date.now();

  
    if (!record || now > record.windowEnd) {
        requests.set(myIp, { count: 1, windowEnd: now + windowTime * 1000 });
        return next();
    }

   
    record.count++;

   
    if (record.count > maxRequests) {
        const timeLeft = Math.ceil((record.windowEnd - now) / 1000);
        logger.warn({ ip: myIp, timeLeft }, "Rate limit exceeded");
        return res.status(429).json({
            success: false,
            message: `Too many requests, Please wait for ${timeLeft} seconds`
        });
    }


    next();
};

module.exports = myRateLimit;