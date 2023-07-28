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

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Добавить книгу",
        todo: {},
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const {books} = store;
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404');
    } 
        
    res.render("books/view", {
        title: "Просмотреть книгу",
        book: books[idx],
    });
});



router.post('/delete/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.redirect(`/books`);
    } else {
        res.redirect('/404');
    }
});


module.exports = router;