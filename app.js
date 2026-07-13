const express = require('express');
const routes = require('./src/routes/auth.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK' });
// });

module.exports = app;
