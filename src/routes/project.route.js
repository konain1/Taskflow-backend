const { createProject,deleteProject } = require('../controllers/project.controller')
const protect = require('../middlewares/auth.middleware')
const authorize = require('../middlewares/authorise.middleware')
const routes = (app) => {

    app.post('/taskflow/api/v1/create', protect, createProject)
    app.delete('/taskflow/api/v1/test/project/delete/:id', protect,authorize("admin","owner"),deleteProject,(req, res) => {
            res.status(200).json({ success: true, message: "project created", user: req.user });
        });
    
}

module.exports = routes;