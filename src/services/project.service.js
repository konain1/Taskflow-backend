const logger = require('../config/logger');
const { projectSchema } = require('../middlewares/validate.middleware')
const  Project  = require('../models/project.model')

const createService = async (data, userId) => {
    try {
        const validation = projectSchema.safeParse(data);
        if (!validation.success) {
            const error = new Error(validation.error.errors[0].message);
            error.statusCode = 400;
            throw error;
        }

        const { title, description } = data;

        const project = await Project.create({
            title,
            description,
            owner: userId,
            members: [userId],
        });

        return project;
    } catch (error) {
        logger.error(error, "Error in project createService");
        throw error;
    }
};

module.exports = { createService }