require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/account');
const groupRoutes = require('./routes/group');
const app = express();

app.use(bodyParser.json());

app.use('/account', accountRoutes);
app.use('/group', groupRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});