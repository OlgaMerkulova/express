const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');

app.use(express.urlencoded());
app.set("view engine", "ejs");

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT);