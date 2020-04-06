const mongoose = require('mongoose');
const mongoUri = require('../config').environment.mongoUri;

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connect to mongoose data base.'))
  .catch(err => console.log(err));

module.exports = {
  mongoose,
};
