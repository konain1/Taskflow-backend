const dotenv = require('dotenv').config();
const app = require('./app');
const db = require('./src/config/db');
const logger = require('./src/config/logger');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {

    await db();
    
   
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
