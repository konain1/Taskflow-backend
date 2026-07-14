const { createProject, deleteProject, fetchAllProjects } = require('../controllers/project.controller');
const protect = require('../middlewares/auth.middleware');

const routes = (app) => {
    app.post('/taskflow/api/v1/create', protect, createProject);
    app.get('/taskflow/api/v1/get-project', protect, fetchAllProjects);
    app.delete('/taskflow/api/v1/delete/:id', protect, deleteProject);
};

module.exports = routes;