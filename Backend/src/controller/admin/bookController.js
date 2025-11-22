const {postBook, fetchAllBook, fetchBookById , removeBook, modifyBook, searchBookByGenre} = require('../../services/admin/bookService');

const createBook = async(req, res)=> {
   try {
      const newBook = await postBook(req.body);
      res.status(201).json({message:'Book Created', body: newBook});
   } catch (error) {
      res.status(400).json({error: error.message});
   }
};

const getAllBook = async(req, res)=> {
   try {
      const books = await fetchAllBook();
      res.status(200).json(books);
   } catch (error) {
      res.status(500).json({error: error.message});
   }
};

const getBookById = async(req, res)=> {
   try {
      const book = await fetchBookById(req.params.id);
      if(!book){
         return res.status(404).json({message: "Book not found"});
      }
      res.status(200).json(book);
   } catch (error) {
      res.status(500).json({error: error.message});
   }
};

const deleteBook = async(req, res)=> {
   try {
      const deleted = await removeBook(req.params.id);
      if(!deleted){
         return res.status(404).json({message: "Book not found"});
      }
      res.status(200).json({message: "Book deleted successfully"});
   } catch (error) {
      res.status(500).json({error: error.message});
   }
};

const updateBook = async(req, res)=> {
   try {
      const book = await modifyBook(req.params.id, req.body);
      if(!book){
         return res.status(404).json({message: "Book not found"});
      }
      res.status(200).json({message: "Book updated successfully", book});
   } catch (error) {
      res.status(500).json({error: error.message});
   }
};

const searchBook = async(req, res)=> {
   try {
      const books = await searchBookByGenre(req.params.genre);
      res.status(200).json(books);
   } catch (error) {
      res.status(500).json({error: error.message});
   }
};

module.exports = { createBook, getAllBook, getBookById , deleteBook, updateBook, searchBook };
