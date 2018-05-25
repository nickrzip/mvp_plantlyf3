const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/plantlyf3');

db = db.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var plantSchema = mongoose.Schema({
    // let's design a schema;
    // name
    // url
    // NOT THIS updated_at
    // NOT THIS created_at
    // THIS --> pushed_at
})