const express = require('express');
const { readFile, writeFile } = require('../helpers/readFile');
const validaToken = require('../middleware/validaToken');
const { validaAge, validaName,
  validateWatched, validateRate, validateTalk } = require('../middleware/validaTalker');

const route = express.Router();

route.get('/', async (req, res) => {
  const readFileResp = await readFile();
  res.status(200).json(readFileResp);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readFileResp = await readFile();
  const filtred = readFileResp.find((element) => element.id === Number(id));
  if (!filtred) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filtred);
});

route.post('/', validaToken, validaName, validaAge, 
  validateTalk, validateWatched, validateRate, async (req, res) => {
    const { body } = req;

    const addTalker = await writeFile(body);

    res.status(201).json(addTalker);
});

module.exports = route;