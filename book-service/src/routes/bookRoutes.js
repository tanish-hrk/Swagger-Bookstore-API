const express = require('express');
const BookController = require('../controllers/bookController');
const { validateBook, validateToken } = require('../middleware/validation');

const router = express.Router();

router.get('/', BookController.getAllBooks);

router.get('/search', BookController.searchBooks);

router.get('/:id', BookController.getBookById);

router.post('/', validateToken, validateBook, BookController.createBook);

router.put('/:id', validateToken, validateBook, BookController.updateBook);

router.delete('/:id', validateToken, BookController.deleteBook);

module.exports = router;
