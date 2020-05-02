const express = require('express');
const port = process.env.PORT || require('./config').environment.port;
const headers = require('./config').headers;
// eslint-disable-next-line no-unused-vars
const database = require('./db/mongoose');
const bodyParser = require('body-parser');
const routes = require('./config').routes;

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
headers(app);
routes(app);

database()
  .then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    app.listen(port, () =>
      console.log(`App listening at http://localhost:${port}`)
    );
  })
  .catch(() => {
    console.error('Unable to conenct to database');
    process.exit(1);
  });
