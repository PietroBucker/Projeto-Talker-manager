const fs = require('fs').promises;
const path = require('path');

const FILE_PATH = './talker.json'

const readFile = async() => {
  const response = await fs.readFile(path.resolve(__dirname, FILE_PATH ));
  const data = JSON.parse(response);
  return data;
}

module.exports = readFile;