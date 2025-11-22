const Book = require('../../models/Book');

const fetchAllBook = async() => {
   return await Book.find();
};

const fetchBookById = async(id) => {
   return await Book.findById(id);
};

const searchBookByGenre = async(genre) => {
   return await Book.find({genre: genre});
};

module.exports= {fetchAllBook, fetchBookById, searchBookByGenre};