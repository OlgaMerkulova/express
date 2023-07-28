const { v4: uuid } = require('uuid');

class Book {
    constructor(
        title = "", 
        description = "", 
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = "",
        fileBook = "",
        id = uuid()
    ) {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
        this.id = id;
    }
}

const store = {
    books: [
        new Book('title1', 'desc1', 'author1', 'fav1', 'cover1', 'name1', "public/books/1688848568108-book.txt"),
        new Book('title2', 'desc2', 'author2', 'fav2', 'cover2', 'name2', ""),
    ],
};

module.exports = {store, Book};