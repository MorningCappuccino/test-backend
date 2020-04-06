const Portfolio = require('../db/models/portfolio.module').portfolio;

const getPortfolio = (req, res) => {
  Portfolio.find({}).then(lists => {
    res.send(lists);
  });
};

const setPortfolio = (req, res) => {
  let title = req.body.title;
  let photos = req.body.photos;
  let newPortfolio = new Portfolio({
    title,
    photos,
  });
  newPortfolio
    .save()
    .then(PortfolioDoc => res.send(PortfolioDoc))
    .catch(err => res.send(err));
};

const patchPortfolio = (req, res) => {
  Portfolio.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(() => {
      res.sendStatus(200).send({ status: 'ok' });
    })
    .catch(err => {
      res.sendStatus(401);
      console.log(err);
    });
};

const deletePortfolio = (req, res) => {
  Portfolio.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.sendStatus(200).send({ status: 'ok' });
    })
    .catch(err => {
      res.sendStatus(401);
      console.log(err);
    });
};

module.exports = {
  getPortfolio,
  setPortfolio,
  patchPortfolio,
  deletePortfolio,
};
