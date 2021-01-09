import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let authorSchema = new Schema({
    firstName: { type: String, required: true, minLength: 2 },
    lastName: { type: String, required: true, minLength: 2 },
    bestTitle: { type: String }
},
    {
        collection: 'Authors'
    });

let authorModel = mongoose.model('Author', authorSchema);

let publisherSchema = new Schema({
    name: { type: String, required: true, minLength: 3 },
    city: { type: String }
},
    {
        collection: 'Publishers'
    });

let publisherModel = mongoose.model('Publisher', publisherSchema);

let bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.ObjectId, ref: 'Author', required: true },
    publisher: { type: Schema.ObjectId, ref: 'Publisher', required: true },
    available: { type: Number, required: true, min: 0 },
    pages: { type: Number },
    genre: { type: String },
    language: { type: String }
},
    {
        collection: 'Books'
    });

let bookModel = mongoose.model('Book', bookSchema);

let reviewSchema = new Schema({
    title: { type: Schema.ObjectId, ref: 'Book', required: true },
    ratings: { type: Number, min: 0, max: 5, required: true },
    comment: { type: String }
},
    {
        collection: 'Reviews'
    });

let reviewModel = mongoose.model('Review', reviewSchema);

export default {
    authorModel,
    publisherModel,
    bookModel,
    reviewModel
}