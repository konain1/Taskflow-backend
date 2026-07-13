
const Redis = require('ioredis');
const logger = require('./logger');


const redis = new Redis(process.env.REDIS_URL);

redis.on('connect',()=>{
    logger.info("Redis client connected successfully")
})

redis.on('error',(error)=>{
    logger.error("There is redis client connection error",error.message)
})

module.exports = redis;