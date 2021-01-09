import mongoose from 'mongoose';

const dbURI = 'mongodb+srv://admin:admin1@cluster0-ucnfp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURI, { dbName: 'LibraryDB', useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to LibraryDB`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

import './library.js';