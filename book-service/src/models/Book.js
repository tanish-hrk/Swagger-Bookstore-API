const books = [];

class Book {
  constructor(id, title, author, isbn, price, description, stock) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.description = description;
    this.stock = stock;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(bookData) {
    const id = books.length + 1;
    const book = new Book(
      id,
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.price,
      bookData.description,
      bookData.stock
    );
    books.push(book);
    return book;
  }

  static findById(id) {
    return books.find(book => book.id === id);
  }

  static findAll() {
    return books;
  }

  static findByIsbn(isbn) {
    return books.find(book => book.isbn === isbn);
  }

  static update(id, bookData) {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return null;

    const updatedBook = {
      ...books[index],
      ...bookData,
      updatedAt: new Date()
    };
    books[index] = updatedBook;
    return updatedBook;
  }

  static delete(id) {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      price: this.price,
      description: this.description,
      stock: this.stock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Book;
