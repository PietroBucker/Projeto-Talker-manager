const express = require('express');

const validateEmail = (req, res, next) => {
  console.log(req);
  const { email } = req.body;
  const validation = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/.test(email);
  if(!email) {
    return res.status(400).json({ message: `O campo "email" é obrigatório` });
  };

  if(!validation) {
    return res.status(400).json({ message: `O "email" deve ter o formato "email@email.com"` });
  };

  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if(!password){
    return res.status(400).json({ message: `O campo "password" é obrigatório` });
  };

  if(password.length < 6) {
    return res.status(400).json({ message: `O "password" deve ter pelo menos 6 caracteres` });
  };

  return next();
};

module.exports = {
  validateEmail,
  validatePassword,
};