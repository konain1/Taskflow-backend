
const { createService } = require('../services/project.service');

const createProject = async (req, res, next) => {
    try {
        const response = await createService(req.body, req.user._id);

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProject
};