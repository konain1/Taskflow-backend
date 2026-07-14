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

const deleteService = async (projectId, userId, userRole) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            const error = new Error("Project not found");
            error.statusCode = 404;
            throw error;
        }

        if (userRole !== 'admin' && project.owner.toString() !== userId.toString()) {
            const error = new Error("You do not have permission to delete this project");
            error.statusCode = 403;
            throw error;
        }

        await Project.findByIdAndDelete(projectId);
        logger.info({ projectId }, "project has been deleted successfully");
        return project;
    } catch (error) {
        logger.error(error, "Error in project deleteService");
        throw error;
    }
};

const fetchService = async () => {
    try {
        const response = await Project.find({}).populate("owner");
        return response;
    } catch (error) {
        logger.error(error, "Error in project fetchService");
        throw error;
    }
};

module.exports = { createService, deleteService, fetchService };