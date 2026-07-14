const Task = require('../models/task.model');
const Project = require('../models/project.model');
const logger = require('../config/logger');
const { taskSchema } = require('../middlewares/validate.middleware');

const createTaskService = async (taskData, userId) => {
    try {
        const validation = taskSchema.safeParse(taskData);
        if (!validation.success) {
            const error = new Error(validation.error.errors[0].message);
            error.statusCode = 400;
            throw error;
        }

        const { title, description, status, assignee, project: projectId, dueDate, priority } = taskData;

        // Check if project exists
        const project = await Project.findById(projectId);
        if (!project) {
            const error = new Error("Project not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user has permission to add task (must be owner or member)
        const isOwner = project.owner.toString() === userId.toString();
        const isMember = project.members.some(memberId => memberId.toString() === userId.toString());
        if (!isOwner && !isMember) {
            const error = new Error("You do not have permission to add tasks to this project");
            error.statusCode = 403;
            throw error;
        }

        // Check if assignee is member/owner of the project
        if (assignee) {
            const isAssigneeOwner = project.owner.toString() === assignee.toString();
            const isAssigneeMember = project.members.some(memberId => memberId.toString() === assignee.toString());
            if (!isAssigneeOwner && !isAssigneeMember) {
                const error = new Error("Assignee must be a member of this project");
                error.statusCode = 400;
                throw error;
            }
        }

        const task = await Task.create({
            title,
            description,
            status,
            assignee,
            project: projectId,
            dueDate,
            priority,
        });

        return await Task.findById(task._id).populate('assignee', '-password');
    } catch (error) {
        logger.error(error, "Error in createTaskService");
        throw error;
    }
};

const fetchTasksService = async (projectId, userId, filters = {}) => {
    try {
        // Check if project exists
        const project = await Project.findById(projectId);
        if (!project) {
            const error = new Error("Project not found");
            error.statusCode = 404;
            throw error;
        }

        // must be owner or member
        const isOwner = project.owner.toString() === userId.toString();
        const isMember = project.members.some(memberId => memberId.toString() === userId.toString());
        if (!isOwner && !isMember) {
            const error = new Error("You do not have permission to access this project's tasks");
            error.statusCode = 403;
            throw error;
        }

        const { page = 1, limit = 10, search, status, assignee, priority, startDate, endDate } = filters;
        const skip = (page - 1) * limit;

        // query object
        const query = { project: projectId };

        // Case-insensitive regex title search
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // Filtering options
        if (status) {
            query.status = status;
        }
        if (assignee) {
            query.assignee = assignee;
        }
        if (priority) {
            query.priority = priority;
        }

        // Date range filtering on dueDate
        if (startDate || endDate) {
            query.dueDate = {};
            if (startDate) {
                query.dueDate.$gte = new Date(startDate);
            }
            if (endDate) {
                query.dueDate.$lte = new Date(endDate);
            }
        }

        // Execute count query for pagination metadata
        const totalTasks = await Task.countDocuments(query);
        const totalPages = Math.ceil(totalTasks / limit);

        // Fetch task list (avoiding N+1 by using populate directly)
        const tasks = await Task.find(query)
            .skip(skip)
            .limit(limit)
            .populate('assignee', '-password')
            .sort({ createdAt: -1 });

        return {
            tasks,
            totalTasks,
            totalPages,
            currentPage: page,
            limit,
        };
    } catch (error) {
        logger.error(error, "Error in fetchTasksService");
        throw error;
    }
};

const updateTaskService = async (taskId, taskData, userId) => {
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }

        const project = await Project.findById(task.project);
        if (!project) {
            const error = new Error("Project not found for this task");
            error.statusCode = 404;
            throw error;
        }

        // Check if user is owner or member of project
        const isOwner = project.owner.toString() === userId.toString();
        const isMember = project.members.some(memberId => memberId.toString() === userId.toString());
        if (!isOwner && !isMember) {
            const error = new Error("You do not have permission to update tasks in this project");
            error.statusCode = 403;
            throw error;
        }

        // Validate partial update data
        const validation = taskSchema.partial().safeParse(taskData);
        if (!validation.success) {
            const error = new Error(validation.error.errors[0].message);
            error.statusCode = 400;
            throw error;
        }

        const { title, description, status, assignee, dueDate, priority } = taskData;

        // Check if updated assignee is a member of the project
        if (assignee) {
            const isAssigneeOwner = project.owner.toString() === assignee.toString();
            const isAssigneeMember = project.members.some(memberId => memberId.toString() === assignee.toString());
            if (!isAssigneeOwner && !isAssigneeMember) {
                const error = new Error("Assignee must be a member of this project");
                error.statusCode = 400;
                throw error;
            }
        }

        if (title) task.title = title;
        if (description !== undefined) task.description = description;
        if (status) task.status = status;
        if (assignee !== undefined) task.assignee = assignee;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (priority) task.priority = priority;

        await task.save();

        return await Task.findById(taskId).populate('assignee', '-password');
    } catch (error) {
        logger.error(error, "Error in updateTaskService");
        throw error;
    }
};

const deleteTaskService = async (taskId, userId, userRole) => {
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }

        const project = await Project.findById(task.project);
        if (!project) {
            const error = new Error("Project not found for this task");
            error.statusCode = 404;
            throw error;
        }

        // Only project owner or members can delete tasks (admin who is not a member cannot delete)
        const isOwner = project.owner.toString() === userId.toString();
        const isMember = project.members.some(memberId => memberId.toString() === userId.toString());
        if (!isOwner && !isMember) {
            const error = new Error("You do not have permission to delete this task");
            error.statusCode = 403;
            throw error;
        }

       let response= await Task.findByIdAndDelete(taskId).populate("assignee");
        logger.info({ taskId }, "Task deleted successfully");
        return response;
    } catch (error) {
        logger.error(error, "Error in deleteTaskService");
        throw error;
    }
};

module.exports = {
    createTaskService,
    fetchTasksService,
    updateTaskService,
    deleteTaskService,
};
