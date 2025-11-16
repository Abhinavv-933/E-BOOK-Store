const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
   title: {
      type: String ,
      required : [true, "Title is required"]
   },
   author: {
      type: String ,
      required : [true, "Author is required"]
   },
   Description: {
      type: String ,
      required : [true, "Description is required"]
   },
   price: {
      type: Number ,
      required : [true, "Price is required"],
      min: 0 ,
   },
   genre: {
      type: String ,
      required : [true, "Genre is required"]
   },
   condition: {
      type: String ,
      enum : ["New", "Like New", " Used - Good", "Used - Acceptable"],
      required : [true, "Condition is required"]
   },
   edition: {
      type: String ,
   },
   imageUrl: {
      type: String ,
      required : true,
   },
   status: {
      type: String ,
      enum : ["Available", "Solid"],
      default : "Available",
   },
}, {timestamps: true});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;