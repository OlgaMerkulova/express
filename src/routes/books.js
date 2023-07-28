const express = require('express');
const router = express.Router();

const {store, Book} = require('../constants/books');
const user = require('./../constants/user');


router.get('/', (req, res) => {
    const {books} = store;
    res.render("books/index", {
        title: "Список всех книг",
        books: books,
    });
});


module.exports = router;