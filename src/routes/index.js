const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');

const {store, Book} = require('../constants/books');
const user = require('./../constants/user');

// авторизация пользователя	
router.post('/user/login', (req, res) => {
    res.status(201);
    res.json(user);
});

// получить все книги	
router.get('/books', (req, res) => {
    const {books} = store;
    res.json(books);
});

// получить книгу по ID	
router.get('/books/:id', (req, res) => {
    const {id} = req.params;
    const {books} = store;
    const idx = books.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json({error: '404 | книга не найдена'})
    }
});

// создать книгу	
router.post('/books', (req, res) => {
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

    res.status(201);
    res.json(newBook);
});

// редактировать книгу по ID	
router.put('/books/:id', function (req, res) {
    const body = req.body;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = body;
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1){
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

        res.json(books[idx])
    } else {
        res.status(404);
        res.json({error: '404 | книга не найдена'});
    }
});

// удалить книгу по ID	
router.delete('/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json({error: '404 | книга не найдена'})
    }
});


// добавить файл книги
router.post('/books/:id/upload', fileMulter.single('file'), (req, res) => {
    if (req.file) {
        const {books} = store;
        const {id} = req.params;
    
        const idx = books.findIndex(el => el.id === id);
    
        if (idx !== -1){
            const {path} = req.file;
            books[idx] = {
                ...books[idx],
                fileBook: path
            }
            res.json(books[idx])
        } else {
            res.status(404)
            res.json({error: '404 | книга не найдена'})
        }
    } else {
        res.status(404)
        res.json({error: '404 | файл не обнаружен'})
    }
})

// скачать файл книги 
router.post('/books/:id/download', (req, res) => {

    const {books} = store;
    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.download(books[idx].fileBook, books[idx].fileName);
    } else {
        res.status(404)
        res.json({error: '404 | книга не найдена'})
    }
})

module.exports = router;