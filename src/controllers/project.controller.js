
const { 
    createService, 
    deleteService, 
    fetchService, 
    getProjectByIdService, 
    updateProjectService,
    addMemberService
} = require('../services/project.service');

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
        const response = await fetchService(req.user._id);
        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const getProjectById = async (req, res, next) => {
    try {
        const response = await getProjectByIdService(req.params.id, req.user._id);
        return res.status(200).json({
            success: true,
            message: "Project details fetched successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const response = await updateProjectService(req.params.id, req.user._id, req.body);
        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const addMember = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { memberId } = req.body; // User ID to add to project members list

        if (!memberId) {
            const error = new Error("Member ID is required");
            error.statusCode = 400;
            throw error;
        }

        const response = await addMemberService(projectId, memberId, req.user._id);

        return res.status(200).json({
            success: true,
            message: "Member added to project successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProject,
    deleteProject,
    fetchAllProjects,
    getProjectById,
    updateProject,
    addMember,
};