var express = require('express');
var bodyParser = require('body-parser');
var cron = require('cron'); 
var getAllRepos = require('../helpers/github.js');
var userRouter = require('./userRouter.js').userRouter;
var histRouter = require('./histRouter.js').histRouter;
var userName;
let app = express();
exports.tempHist = '';

var job = new cron.CronJob('*/10 * * * * *', function() {
    userName = require('./userRouter.js').currentUser;
    if (userName) {
        getAllRepos(userName).then((data) => {
          exports.tempHist = (data.map((repo) => {
              return {name: repo.name, lastWatered: repo.pushed_at}
            }));
          console.log(exports.tempHist);
        });
    }
  }, null, true, 'America/Los_Angeles');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/hist', histRouter);
app.use('/users', userRouter);

port = process && process.env.port || 8080;

app.listen(port, () => {
    console.log(`listening on ${port}`);
    console.log(__dirname + '/../client/dist');
});