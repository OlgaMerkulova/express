const express = require('express');
const { v4: uuid } = require('uuid');
class Book {
    constructor(
        title = "", 
        description = "", 
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = "",
        id = uuid()
    ) {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.id = id;
    }
}

const store = {
    books: [
        new Book('title1', 'desc1', 'author1', 'fav1', 'cover1', 'name1'),
        new Book('title2', 'desc2', 'author2', 'fav2', 'cover2', 'name2'),
    ],
};

const user = { id: 1, mail: "test@mail.ru" };

const app = express();
app.use(express.json());

// авторизация пользователя	
app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json(user);
});

// получить все книги	
app.get('/api/books', (req, res) => {
    const {books} = store;
    res.json(books);
});

// получить книгу по ID	
app.get('/api/books/:id', (req, res) => {
    const {id} = req.params;
    const {books} = store;
    const idx = books.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | книга не найдена')
    }
});

// создать книгу	
app.post('/api/books', (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(
        title, 
        description, 
        authors,
        favorite,
        fileCover,
        fileName
    );
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

// редактировать книгу по ID	
app.put('/api/books/:id', (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1){
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }

        res.json(books[idx])
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

// удалить книгу по ID	
app.delete('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | книга не найдена')
    }
});

const PORT = 3000;
app.listen(PORT);