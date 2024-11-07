require('dotenv').config();
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.use('/account', accountRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
