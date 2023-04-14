const express = require('express');
const readFile = require('../helpers/readFile');

const route = express.Router();

route.get('/', async(req, res) => {
  const readFileResp = await readFile();
  res.status(200).json(readFileResp);
});

route.get('/:id', async(req, res) => {
  const { id } = req.params;
  const readFileResp = await readFile();
  const filtred = readFileResp.find((element) => element.id === Number(id) )
  if(!filtred) {
    return res.status(404).json({ message: "Pessoa palestrante não encontrada"});
  }
  return res.status(200).json(filtred);
});

module.exports = route;