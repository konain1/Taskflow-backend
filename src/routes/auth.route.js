const { register, login, getAllUsers } = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");
const authorize = require('../middlewares/authorise.middleware');
const  myRateLimit = require('../middlewares/rateLimit.middleware')
const routes = (app) => {
    app.post('/taskflow/api/v1/register', register);
    app.post('/taskflow/api/v1/login',myRateLimit, login);
    app.get('/taskflow/api/v1/users', protect, getAllUsers);
    app.get('/taskflow/api/v1/test', protect, authorize('admin'), (req, res) => {
        res.status(200).json({ success: true, message: "Authenticated!", user: req.user });
    });
}

module.exports = routes;