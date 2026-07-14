const {
    createTask,
    fetchTasks,
    updateTask,
    deleteTask,
} = require('../controllers/task.controller');
const protect = require('../middlewares/auth.middleware');

const routes = (app) => {
    app.post('/taskflow/api/v1/tasks', protect, createTask);
    app.get('/taskflow/api/v1/projects/:projectId/tasks', protect, fetchTasks);
    app.put('/taskflow/api/v1/tasks/:id', protect, updateTask);
    app.delete('/taskflow/api/v1/tasks/:id', protect, deleteTask);
};

module.exports = routes;
