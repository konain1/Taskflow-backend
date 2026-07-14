const {
    createTaskService,
    fetchTasksService,
    updateTaskService,
    deleteTaskService,
} = require('../services/task.service');

const createTask = async (req, res, next) => {
    try {
        const response = await createTaskService(req.body, req.user._id);
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const fetchTasks = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        // Optional search, status, and priority query filters
        const response = await fetchTasksService(projectId, req.user._id, req.query);
        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const response = await updateTaskService(req.params.id, req.body, req.user._id);
        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const response = await deleteTaskService(req.params.id, req.user._id, req.user.role);
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    fetchTasks,
    updateTask,
    deleteTask,
};
