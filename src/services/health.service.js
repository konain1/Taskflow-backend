const mongoose = require('mongoose');

const healthService = async () => {
    const health_status = mongoose.connection.readyState === 1 ? 'up' : 'down';
    return health_status;
};

module.exports = healthService;