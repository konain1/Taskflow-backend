
const { createService , deleteService, fetchService } = require('../services/project.service');

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

const deleteProject = async (req, res, next) => {
    try {
        const response = await deleteService(req.params.id, req.user._id, req.user.role);

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const fetchAllProjects = async (req, res, next) => {
    

    try {
        const response = await fetchService();
        return res.status(200).json({
            success: true,
            message: "Project fetched successfully",
            data : response
        })
        
    } catch (error) {
        next(error)
    }
    
    
}
module.exports = {
    createProject,
    deleteProject,
    fetchAllProjects
};