const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require("../config/logger");
const User = require("../models/user.model");
const { generateAccessToken, verifyAccessToken } = require("../utils/accessToken.util");
const hashPassword = require("../utils/hashPassword.util");
const {userSchema} = require('../middlewares/validate.middleware')

const registerService = async (data) => {
    try {
        const { name, email, password, role } = data;

        const result =  userSchema.safeParse({ name, email, password, role });

        if (!result.success) {
            logger.warn({ email }, 'Signup attempt with invalid data');
            return ;
        }

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            logger.warn({ email }, "user already exists!");
            throw new Error("User already exists!");
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            role,
        });

       //Generate JWT access token
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

const loginService = async (data) => {
    try {
        const { email, password, token } = data;

        
        if (!email || !password) {
            logger.warn({ email }, "Missing email or password for login");
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            logger.warn({ email }, "User not found for login");
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn({ email }, "Invalid password attempt");
            throw new Error("Invalid credentials");
        }

        const newToken = generateAccessToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: newToken,
        };

    } catch (error) {
        logger.error(error, "Error in loginService");
        throw error;
    }
};

module.exports = {
    registerService,
    loginService,
};