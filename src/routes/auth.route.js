const register = require("../controllers/auth.controller")


const routes = (app) => {
    
    app.post('/taskflow/api/v1/register', register);
}

module.exports = routes