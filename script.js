// Variables
const bookContainer = document.querySelector(".book-container");
const bookForm = document.querySelector(".new-book-form");
const btn = document.querySelector(".btn");
const submit = document.querySelector("#submit");
const closeBookContainer = document.querySelector(".close-book-container");
const overlayShow = document.querySelector(".overlay");

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

// Display the book according to the users input
function displayBooks() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Creation of the bookForm
    bookCard.innerHTML = `\
    <div class="book-card-container">
      <span>${book.title}</span>
      <span>Author: ${book.author}</span>
      <span>Pages: ${book.pages}</span>
      <span class="book-read">${book.isRead ? "Read" : "Not-Read"}</span>
      <button class="toggle-read" data-index="${index}">Read</button>
      <button class="remove-book" data-index="${index}">Remove</button>
    </div>
    `;

    // Changes read button based on what the textContent is
    if (book.isRead) {
      const bookRead = bookCard.querySelector(".book-read");
      const toggle_Read = bookCard.querySelector(".toggle-read");

      if (bookRead.textContent === "Read") {
        toggle_Read.textContent = "Not-Read";
        toggle_Read.style.backgroundColor = "#E68C8C";
      } else if (bookRead.textContent === "Not-Read") {
        toggle_Read.textContent = "Read";
        toggle_Read.style.backgroundColor = "#9fff9c";
      }
    }

    //Appends the bookcard to the book Container
    bookContainer.appendChild(bookCard);
  });
}

// If book.isRead is true or false
function toggleRead(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayBooks();
}

// Removes a book Card
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// Removes invalid keys
function preventInvalidKeys(e) {
  const invalidKeys = [69, 187, 189, 109, 107, 110];

  if (invalidKeys.includes(e.keyCode)) {
    e.preventDefault();
  }
}

// Displays the book Form input
btn.addEventListener("click", () => {
  bookForm.style.display = "block";
  closeBookContainer.style.display = "block";
  overlayShow.classList.add("overlay-show");
});

// Submits the user input from the form
// Validation if an input is empty
submit.addEventListener("click", (e) => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#read").checked;

  // Validation
  if (title === "" || author === "" || pages === "") {
    window("Please fill in the rest of the field");
  } else if (pages > 5000) {
    window("Pages cannot exceed 5000");
  }

  //Adds every new input from user input to a new book
  const newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);

  //Resets the bookForm
  bookForm.reset();
  bookForm.style.display = "none";
  overlayShow.classList.remove("overlay-show");
  displayBooks();
  e.preventDefault();
});

//Changes the read textContent Read or Not-Read
//Removes 1 bookCard if buttons pressed
bookContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-read")) {
    const index = e.target.getAttribute("data-index");
    toggleRead(index);
  }

  if (e.target.classList.contains("remove-book")) {
    const index = e.target.getAttribute("data-index");
    removeBook(index);
  }
});

// Closes the booForm container
closeBookContainer.addEventListener("click", () => {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const isRead = document.querySelector("#read");

  // Clears the value after book form is closed
  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.checked = false;

  bookForm.style.display = "none";
  closeBookContainer.style.display = "none";
  overlayShow.classList.remove("overlay-show");
});

// AddEventListeners for invalid keys
title.addEventListener("keydown", preventInvalidKeys);
author.addEventListener("keydown", preventInvalidKeys);
pages.addEventListener("keydown", preventInvalidKeys);

//Book simple tests
addBookToLibrary(new Book("Book 1", "Author 1", 200, true));
addBookToLibrary(new Book("Book 2", "Author 2", 300, false));

displayBooks();
