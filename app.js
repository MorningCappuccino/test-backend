const express = require('express');
const port = require('./config').environment.port;
const headers = require('./config').headers;
// eslint-disable-next-line no-unused-vars
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');
const routes = require('./config').routes;

const app = express();
app.use(bodyParser.json());
headers(app);
routes(app);

app.listen(port, console.log('server started'));
