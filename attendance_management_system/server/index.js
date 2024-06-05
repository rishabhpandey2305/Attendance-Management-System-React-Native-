const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const attendanceRouter = require('./src/models/attendance');
const attendanceCheck = require('./src/models/attendanceCheck');
const authRouter = require('./src/routes/auth');
const loggingMiddleware = require('./src/middlewares/loggingMiddleware');
const authenticationMiddleware = require('./src/middlewares/authMiddleware');
const dbConnection = require('./src/db/db_connection');
const apiRoutes = require("./src/routes/api");
const profile = require('./src/models/profile');
// Adjusted path


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', attendanceRouter);
app.use('/', attendanceCheck);
app.use('/auth', authRouter);
app.use('/', profile);

// app.use(loggingMiddleware);
// app.use(authenticationMiddleware);
app.use((req, res, next) => {
  dbConnection()
    .then(connection => {
      req.dbConnection = connection;
      next();
    })
    .catch(err => {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
