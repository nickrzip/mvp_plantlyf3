var express = require('express');
var bodyParser = require('body-parser');

var userRouter = require('./userRouter.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/users', userRouter)

port = process && process.env.port || 8080;

app.listen(port, () => {
    console.log(`listening on ${port}`);
    console.log(__dirname + '/../client/dist');
});