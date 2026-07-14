const { createProject } = require('../controllers/project.controller')
const protect = require('../middlewares/auth.middleware')

const routes = (app) => {

    app.post('/taskflow/api/v1/create', protect, createProject)
    app.get('/taskflow/api/v1/test/project', protect, createProject, (req, res) => {
            res.status(200).json({ success: true, message: "project created", user: req.user });
        });
    
}

module.exports = routes;