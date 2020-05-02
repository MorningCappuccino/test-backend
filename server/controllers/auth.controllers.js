const { User } = require('../db/models/user.module');

const signUp = (req, res) => {
  const { body } = req;
  const newUser = new User(body);
  newUser
    .save()
    .then(() => {
      return newUser.createSession();
    })
    .then(refreshToken => {
      return newUser.generateAccessAuthToken().then(accessToken => {
        return { accessToken, refreshToken };
      });
    })
    .then(authTokens => {
      res
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(newUser);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findByCredentials(email, password)
    .then(user => {
      if (user.error) {
        res.status(401).send(user);
      } else {
        user
          .createSession()
          .then(refreshToken => {
            return user.generateAccessAuthToken().then(accessToken => {
              console.log(accessToken);
              console.log(refreshToken);
              return { accessToken, refreshToken };
            });
          })
          .then(authTokens => {
            res
              .header('x-refresh-token', authTokens.refreshToken)
              .header('x-access-token', authTokens.accessToken)
              .send(user);
          });
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const getNewAccessToken = (req, res) => {
  req.userObject
    .generateAccessAuthToken()
    .then(accessToken => {
      res.header('x-access-token', accessToken).send({ accessToken });
    })
    .catch(e => res.status(401).send(e));
};

module.exports = { signUp, login, getNewAccessToken };
