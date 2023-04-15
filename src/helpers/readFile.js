const fs = require('fs').promises;
const path = require('path');

const FILE_PATH = '../talker.json';

const readFile = async () => {
  try {
    const response = await fs.readFile(path.resolve(__dirname, FILE_PATH));
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.error(`Erro ao ler o file ${error.message}`);
  }
};

const writeFile = async (data) => {
  const oldArray = await readFile();
  const newArray = [...oldArray, { id: oldArray.length + 1, ...data }];
  try {
   await fs.writeFile(path.resolve(__dirname, FILE_PATH), JSON.stringify(newArray));
   return { id: oldArray.length + 1, ...data };
  } catch (error) {
    console.error(`Erro ao escrever no file ${error.message}`);
  }
};

module.exports = {
  readFile,
  writeFile,
};