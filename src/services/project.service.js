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

const fetchService = async (userId) => {
    try {
        const response = await Project.find({
            $or: [
                { owner: userId },
                { members: userId }
            ]
        }).populate("owner", "-password").populate("members", "-password");
        return response;
    } catch (error) {
        logger.error(error, "Error in project fetchService");
        throw error;
    }
};

const getProjectByIdService = async (projectId, userId) => {
    try {
        const project = await Project.findById(projectId)
            .populate("owner", "-password")
            .populate("members", "-password");

        if (!project) {
            const error = new Error("Project not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user is owner or member
        const isOwner = project.owner._id.toString() === userId.toString();
        const isMember = project.members.some(member => member._id.toString() === userId.toString());

        if (!isOwner && !isMember) {
            const error = new Error("You do not have permission to access this project");
            error.statusCode = 403;
            throw error;
        }

        return project;
    } catch (error) {
        logger.error(error, "Error in project getProjectByIdService");
        throw error;
    }
};

const updateProjectService = async (projectId, userId, updateData) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            const error = new Error("Project not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user is owner or member
        const isOwner = project.owner.toString() === userId.toString();
        const isMember = project.members.some(memberId => memberId.toString() === userId.toString());

        if (!isOwner && !isMember) {
            const error = new Error("You do not have permission to update this project");
            error.statusCode = 403;
            throw error;
        }

        // Validate partial update data if provided
        const validation = projectSchema.partial().safeParse(updateData);
        if (!validation.success) {
            const error = new Error(validation.error.errors[0].message);
            error.statusCode = 400;
            throw error;
        }

        const { title, description } = updateData;
        if (title) project.title = title;
        if (description) project.description = description;

        await project.save();
        
        // Return updated project with populated fields
        return await Project.findById(projectId)
            .populate("owner", "-password")
            .populate("members", "-password");
    } catch (error) {
        logger.error(error, "Error in project updateProjectService");
        throw error;
    }
};

module.exports = { 
    createService, 
    deleteService, 
    fetchService, 
    getProjectByIdService, 
    updateProjectService 
};