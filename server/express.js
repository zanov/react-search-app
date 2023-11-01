const express = require('express');
const DataController = require('./dataController');
const app = express();
const dataController = new DataController();

app.get('/api/get-data', dataController.getAllData.bind(dataController));

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
