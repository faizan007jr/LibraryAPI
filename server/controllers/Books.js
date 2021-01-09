import mongoose from 'mongoose';
const Book = mongoose.model('Book');

const getBooks = (req, res) => {
    Book
        .find()
        .populate('author publisher')
        .sort([['firstName', 'ascending']])
        .exec((err, bookData) => {
            if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(bookData);
        });
};

const createBook = (req, res) => {
    Book
        .create({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            available: req.body.available,
            pages: req.body.pages,
            genre: req.body.genre,
            language: req.body.language
        }, (err, bookData) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(bookData);
            }
        });
};

const getSingleBook = (req, res) => {
    Book
        .findById(req.params.bookid)
        .populate('author publisher')
        .exec((err, book) => {
            if (!book) {
                return res
                    .status(404)
                    .json({
                        "message": "Book not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(book);
        });
};

const updateBook = (req, res) => {
    if (!req.params.bookid) {
        res.status(404)
            .json({
                "message": "Not found, Book ID is required"
            });
        return;
    }
    Book
        .findById(req.params.bookid)
        .populate('author publisher')
        .exec((err, boookData) => {
            if (!boookData) {
                res
                    .status(404)
                    .json({
                        "message": "Book ID not found."
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            boookData.title = req.body.title;
            boookData.author = req.body.author;
            boookData.publisher = req.body.publisher;
            boookData.available = req.body.available;
            boookData.pages = req.body.pages;
            boookData.genre = req.body.genre;
            boookData.language = req.body.language;

            boookData.save((err, bookData) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(bookData);
                }
            });
        });
};

const deleteBook = (req, res) => {
    const bookID = req.params.bookid;

    if (bookID) {
        Book
            .findByIdAndRemove(bookID)
            .exec((err, bookData) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(204)
                        .json({ "message": "Book Document deleted" });
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "No Book ID" });
    }
};

export default {
    getBooks,
    createBook,
    getSingleBook,
    updateBook,
    deleteBook
};