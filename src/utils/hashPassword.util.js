const bcrypt = require('bcrypt');
const logger = require('../config/logger');

const hashPassword = async (password) => {
    if (!password) {
        logger.warn("Password is required to generate a hash");
        throw new Error("Password is required");
    }

    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(password, saltRounds);
        logger.info("Password hashed successfully");
        return hashed;
    } catch (error) {
        logger.error(error, "Error while hashing password");
        throw error;
    }
};

module.exports = hashPassword;