const express = require('express');
const { readFile, writeFile, writeUpdateFile } = require('../helpers/readFile');
const validaToken = require('../middleware/validaToken');
const { validaAge, validaName,
  validateWatched, validateRate, validateTalk, 
  validateRateRange, RateRange, watchedDateFormat } = require('../middleware/validaTalker');
const filterTalker = require('../helpers/filterTalker');
const talkDb = require('../db/talkerDb');

const route = express.Router();

route.get('/db', async (req, res) => {
  const [result] = await talkDb.select();
  const editedResult = result.map((el) => (
    { name: el.name,
      age: el.age,
      id: el.id, 
      talk: { watchedAt: el.talk_watched_at, rate: el.talk_rate } }));
  res.status(200).json(editedResult);
});

route.get('/search', validaToken, watchedDateFormat, RateRange, async (req, res) => {
  const { rate, q = '', date = '' } = req.query;
  
  const search = await filterTalker(rate, q, date);
  console.log(search);
  if (!search) {
    return res.status(200).json([]);
  }
  return res.status(200).json(search);
});

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
  validateTalk, validateWatched, validateRate, validateRateRange, async (req, res) => {
    const { body } = req;

    const addTalker = await writeFile(body);

    res.status(201).json(addTalker);
});

route.patch('/rate/:id', validaToken, validateRate, validateRateRange, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
    const readFileResp = await readFile();

    const searchId = readFileResp.some((element) => element.id === Number(id));

    if (!searchId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const fileEdited = readFileResp.map((element) => {
      if (element.id === Number(id)) {
        return { ...element, talk: { ...element.talk, rate } }; 
      }
      return element;
});
    await writeUpdateFile(fileEdited);
    return res.status(204).json();
}); 

route.put('/:id', validaToken, validaName, validaAge, 
  validateTalk, validateWatched, validateRate, validateRateRange, async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const readFileResp = await readFile();

    const searchId = readFileResp.some((element) => element.id === Number(id));

    if (!searchId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const fileEdited = readFileResp.map((element) => (
      element.id === Number(id) ? { id: element.id, ...body } : element
    ));
    await writeUpdateFile(fileEdited);
    return res.status(200).json({ id: Number(id), ...body });
});

route.delete('/:id', validaToken, async (req, res) => {
  const { id } = req.params;
  const readFileResp = await readFile();
  const updateFile = readFileResp.map((element) => {
    if (element.id !== Number(id)) {
      return element;
    }
    return null;
  });
  await writeUpdateFile(updateFile);
  return res.status(204).json();
});

module.exports = route;