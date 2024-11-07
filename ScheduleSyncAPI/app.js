require('dotenv').config();
const express = require('express');
const pool = require('./db');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/account');
const groupRoutes = require('./routes/group');
const scheduleRoutes = require('./routes/schedule');
const ocrRoutes = require('./routes/ocr');

const app = express();
app.use(bodyParser.json());

app.use('/account', accountRoutes);
app.use('/group', groupRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/ocr', ocrRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});