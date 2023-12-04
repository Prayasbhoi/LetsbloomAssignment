import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connect.js";
import Books from "./database/models/Books.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test ok");
});
// Endpoint 1: Retrieve All Books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Books.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve books" });
  }
});

// Endpoint 2: Add a New Book
app.post("/api/books", async (req, res) => {
  try {
    const { title, author, genre, pages } = req.body;
    const newBook = await Books.create({
      title,
      author,
      genre,
      pages,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Could not add the book" });
  }
});

// Endpoint 3: Update Book Details
app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await Books.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Could not update the book" });
  }
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
  } catch (error) {
    console.error("Error connecting to MongoDb");
  }
  app.listen(port, () => {
    console.log(`Server listening on port: http://localhost:${port}/`);
  });
};

startServer();
