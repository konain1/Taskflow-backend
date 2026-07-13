const { register, login } = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");

const routes = (app) => {
    app.post('/taskflow/api/v1/register', register);
    app.post('/taskflow/api/v1/login', login);
    app.get('/taskflow/api/v1/test', protect, (req, res) => {
        res.status(200).json({ success: true, message: "Authenticated!", user: req.user });
    });
}

module.exports = routes;