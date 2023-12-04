import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  pages: Number,
});

const Books = mongoose.model("Book", BookSchema);

export default Books;
