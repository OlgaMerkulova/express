const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const indexRouter = require('./routes/index');

app.use('/api', indexRouter);

const PORT = 3000;
app.listen(PORT);