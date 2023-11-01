const fs = require('fs');

class DataController {
  constructor() {
    this.dataFilePath = `${__dirname}/data.json`;
  }

  getAllData(req, res) {
    fs.readFile(this.dataFilePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading data file.');
      } else {
        res.json(JSON.parse(data));
      }
    });
  }
}

module.exports = DataController;
