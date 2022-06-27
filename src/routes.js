const auth = require('./modules/auth');

const routes = (app) => {
  app.use('/api/auth', auth);
};

module.exports = routes;
