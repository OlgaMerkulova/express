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
        title: "Создать книгу",
        book: {}
    });
});

router.post('/create', (req, res) => {
    const {books} = store;
    
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

    const newBook = new Book(
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    );
    books.push(newBook);

    res.redirect('/books')
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



router.get('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    res.render("books/update", {
        title: "Редактировать книгу",
        book: books[idx],
    });
});

router.post('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    }

    res.redirect(`/books/${id}`);
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