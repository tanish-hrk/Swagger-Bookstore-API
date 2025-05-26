const express = require('express');
const BookController = require('../controllers/bookController');
const { validateBook, validateToken } = require('../middleware/validation');

const router = express.Router();

// Get all books
router.get('/', BookController.getAllBooks);

// Search books
router.get('/search', BookController.searchBooks);

// Get book by ID
router.get('/:id', BookController.getBookById);

// Create new book (requires authentication)
router.post('/', validateToken, validateBook, BookController.createBook);

// Update book (requires authentication)
router.put('/:id', validateToken, validateBook, BookController.updateBook);

// Delete book (requires authentication)
router.delete('/:id', validateToken, BookController.deleteBook);

module.exports = router;
