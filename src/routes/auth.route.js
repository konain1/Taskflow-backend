const { register, login } = require("../controllers/auth.controller");

const routes = (app) => {
    app.post('/taskflow/api/v1/register', register);
    app.post('/taskflow/api/v1/login', login);
}

module.exports = routes;