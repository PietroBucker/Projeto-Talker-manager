const express = require('express');
const generateToken = require('../helpers/token');
const { validateEmail, validatePassword } = require('../middleware/validateLogin');

const route = express.Router();

route.post('/', validateEmail, validatePassword, async (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = route;