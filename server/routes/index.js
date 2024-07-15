const configureRoutes = (app) => {
  app.use('/decplmax/v1/api/auth', require('./api/auth'));
  app.use('/decplmax/v1/api/login', require('./api/auth_meta'));
  app.use('/decplmax/v1/api/users', require('./api/users'));
  app.use('/decplmax/v1/api/mails', require('./api/mails'));
  app.use('/decplmax/v1/api/meta', require('./api/meta'));
  app.use('/decplmax/v1/api/tx', require('./api/transaction'));
  app.use('/decplmax/v1/api/video', require('./api/video'));
  app.use('/', (req, res) => {
    res.status(200).send('Welcome to Decplmax!');
  });
};

module.exports = configureRoutes;
