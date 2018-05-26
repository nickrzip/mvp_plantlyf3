var express = require ('express');
var getAllRepos = require('../helpers/github.js');

exports.userRouter = express.Router();

exports.currentUser = '';

exports.userRouter.get('/', () => {
  console.log('hey');
})

exports.userRouter.post('/', (req, res) => {
  exports.currentUser = req.body.userName;
  var newRepo = getAllRepos(req.body.userName).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.log(err);
    res.status(400).send();
  });
})
