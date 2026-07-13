const logger = require("../config/logger");
const User = require("../models/user.model");
const generateAccessToken = require("../utils/accessToken.util");

const registerService = async (data) => {
    try {
        const { name, email, password, role } = data;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            logger.warn({ email }, "user already exists!");
            throw new Error("User already exists!");
        }

        // 2. Create new user (password is automatically hashed by model pre-save hook)
        const newUser = await User.create({
            name,
            email,
            password,
            role,
        });

        // 3. Generate JWT access token
        const token = generateAccessToken({
            id: newUser._id,
            email: newUser.email,
            role: newUser.role,
        });

        return {
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        };
        
    } catch (error) {
        logger.error(error, "Error in registerService");
        throw error;
    }
};

module.exports = registerService;