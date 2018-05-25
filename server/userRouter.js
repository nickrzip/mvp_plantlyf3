var express = require ('express');
var getAllRepos = require('../helpers/github.js');

var userRouter = express.Router();

userRouter.get('/', () => {
  console.log('hey');
})

userRouter.post('/', (req, res) => {
  var newRepo = getAllRepos('jamiecounsell').then((data) => {
    console.log(data);
  }).then(() => {
    res.status(200).send();
  }).catch((err) => {
    res.status(400).send(err);
    console.log(err);
  });
})

module.exports = userRouter;