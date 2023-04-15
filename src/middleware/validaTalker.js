const validaName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  return next();
};

const validaAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age <= 18 || !Number.isInteger(age)) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }

  return next();
};

const validateTalk = (req, res, next) => {
  const { body } = req;
  if (!('talk' in body)) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  return next();
};

const validateWatched = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const validateWatchedAt = /^\d{2}[/]\d{2}[/]\d{4}$/.test(watchedAt);

  if (!(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }

  if (!validateWatchedAt) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }

  return next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  const teste = rate <= 0 ? toString(rate) : rate;

  if (!(teste)) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  if (!(Number.isInteger(rate) && (teste <= 5))) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  return next();
};

module.exports = {
  validaName,
  validaAge,
  validateTalk,
  validateWatched,
  validateRate,
};
