const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || 3050);

  // MIDDLEWARES
  app.use(bodyParser.json());

  /*
    Consign - utilizado pra não ter que informar no express toda vez que tiver uma rota nova
    e importa de forma que pareça com namespaces
  */
  consign({
    cwd: 'api',
    locale: 'pt-br',
    logger: console,
    verbose: true,
    extensions: ['.js', '.json', '.node'],
    loggingType: 'info'
  })
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};