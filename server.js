require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorhandler = require('./_handlers_vaidators/error_handler');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', require('./users/user-controller'));

app.use(errorhandler);

app.listen(9090, ()=> console.log('server listening on 9090'));