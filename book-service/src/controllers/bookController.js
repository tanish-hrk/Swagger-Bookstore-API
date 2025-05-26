const Book = require('../models/Book');

class BookController {
  // Create a new book
  static async createBook(req, res) {
    try {
      const bookData = req.body;
      const existingBook = Book.findByIsbn(bookData.isbn);
      
      if (existingBook) {
        return res.status(400).json({
          message: 'Book with this ISBN already exists'
        });
      }

      const book = Book.create(bookData);
      res.status(201).json({
        message: 'Book created successfully',
        book: book.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }

  // Get all books
  static async getAllBooks(req, res) {
    try {
      const books = Book.findAll();
      res.json({
        books: books.map(book => book.toJSON())
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  // Get book by ID
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = Book.findById(parseInt(id));

      if (!book) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      res.json({
        book: book.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  // Update book
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const bookData = req.body;
      
      const updatedBook = Book.update(parseInt(id), bookData);
      
      if (!updatedBook) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      res.json({
        message: 'Book updated successfully',
        book: updatedBook.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }

  // Delete book
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const deleted = Book.delete(parseInt(id));

      if (!deleted) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      res.json({
        message: 'Book deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  // Search books
  static async searchBooks(req, res) {
    try {
      const { query } = req.query;
      const books = Book.findAll();
      
      const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query)
      );

      res.json({
        books: filteredBooks.map(book => book.toJSON())
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = BookController;
