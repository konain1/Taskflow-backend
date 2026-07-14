const healthStatus = require('../controllers/health.controller');

const routes = (app) => {
    app.get('/taskflow/api/v1/health', healthStatus);
};

module.exports = routes;
