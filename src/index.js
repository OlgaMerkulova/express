const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const indexRouter = require('./routes/index');

app.use('/api', indexRouter);

const PORT = 3000;
app.listen(PORT);
