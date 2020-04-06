const {
  login,
  signUp,
  getNewAccessToken,
} = require('../controllers/auth.controllers');
const authMiddlewares = require('../middlewares/auth.middlewares');
const {
  getPortfolio,
  setPortfolio,
  patchPortfolio,
  deletePortfolio,
} = require('../controllers/portfolio.controllers');
module.exports = app => {
  app.post(
    '/users',
    (require, response, next) => {
      require.body.role = 'user';
      next();
    },
    signUp
  );

  app.post('/users/login', login);

  app.get(
    '/users/me/access-token',
    authMiddlewares.verifySession,
    getNewAccessToken
  );

  app.get('/portfolio', authMiddlewares.authenticate, getPortfolio);

  app.post('/portfolio', authMiddlewares.authenticate, setPortfolio);

  app.patch('/portfolio/:id', authMiddlewares.authenticate, patchPortfolio);

  app.delete('/portfolio/:id', authMiddlewares.authenticate, deletePortfolio);
};
