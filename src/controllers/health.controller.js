const healthService = require('../services/health.service');

const healthStatus = async (req, res, next) => {
    try {
        const status = await healthService();
        return res.status(200).json({
            success: true,
            message: "health status is good",
            database: status
        });
    } catch (error) {
        next(error);
    }
};

module.exports = healthStatus;
