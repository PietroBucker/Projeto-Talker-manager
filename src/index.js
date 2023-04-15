const express = require('express');
const talkerRoute = require('./route/talkerRoute');
const loginRoute = require('./route/loginRoute');

const app = express();

// faz leitura de arquivos no formato json
app.use(express.json());

// rotas para os chamadas de endPoint
app.use('/talker', talkerRoute);
app.use('/login', loginRoute);

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
