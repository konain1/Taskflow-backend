const pino = require('pino');
const path = require('path');

const logger = pino({
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty',            
        options: { 
          destination: 1,
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },      
      },
      {
        target: 'pino/file',               
        options: { 
          destination: path.join(__dirname, '../log/app.log'),
          mkdir: true 
        },
      },
    ],
  },
});

module.exports = logger;