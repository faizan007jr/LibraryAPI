import mongoose from 'mongoose';
const Author = mongoose.model('Author');

const getAuthors = (req, res) => {
    Author
        .find()
        .sort([['firstName', 'ascending']])
        .exec((err, authorData) => {
            if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(authorData);
        });
};

const createAuthor = (req, res) => {
    Author
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bestTitle: req.body.bestTitle
        }, (err, authorData) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(authorData);
            }
        });
};

const getSingleAuthor = (req, res) => {
    Author
        .findById(req.params.authorid)
        .exec((err, author) => {
            if (!author) {
                return res
                    .status(404)
                    .json({
                        "message": "Author not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(author);
        });
};

const updateAuthor = (req, res) => {
    if (!req.params.authorid) {
        res.status(404)
            .json({
                "message": "Not found, Author ID is required"
            });
        return;
    }
    Author
        .findById(req.params.authorid)
        .exec((err, authorData) => {
            if (!authorData) {
                res
                    .status(404)
                    .json({
                        "message": "Author ID not found."
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            authorData.firstName = req.body.firstName;
            authorData.lastName = req.body.lastName;
            authorData.bestTitle = req.body.bestTitle;
            authorData.save((err, authorData) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(authorData);
                }
            });
        });
};

const deleteAuthor = (req, res) => {
    const authorid = req.params.authorid;

    if (authorid) {
        Author
            .findByIdAndRemove(authorid)
            .exec((err, authorData) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(204)
                        .json({ "message": "Author Document deleted" });
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "No Author ID" });
    }
};

export default {
    getAuthors,
    createAuthor,
    getSingleAuthor,
    updateAuthor,
    deleteAuthor
};