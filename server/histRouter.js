var express = require('express');

exports.histRouter = express.Router();

exports.histRouter.get('/', (req, res) => {
    res.status(200).send(require('./index').tempHist);
})