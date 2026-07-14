const { 
    createProject, 
    deleteProject, 
    fetchAllProjects, 
    getProjectById, 
    updateProject 
} = require('../controllers/project.controller');
const protect = require('../middlewares/auth.middleware');

const routes = (app) => {
    app.post('/taskflow/api/v1/create', protect, createProject);
    app.get('/taskflow/api/v1/get-project', protect, fetchAllProjects);
    app.get('/taskflow/api/v1/project/:id', protect, getProjectById);
    app.put('/taskflow/api/v1/project/:id', protect, updateProject);
    app.delete('/taskflow/api/v1/delete/:id', protect, deleteProject);
};

module.exports = routes;