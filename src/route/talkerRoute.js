const express = require('express');
const readFile = require('../readFile');

const route = express.Router();

route.get('/', async(req, res) => {
  const readFileResp = await readFile();
  res.status(200).json(readFileResp);
})

module.exports = route;