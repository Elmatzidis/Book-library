// Array which stores all the books
const myLibrary = [];

// Creation of a book
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Adds the book to array myLibrary
function addBookToLibrary(book) {
  myLibrary.push(book);
}

