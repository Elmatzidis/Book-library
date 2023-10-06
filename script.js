// Variables
const bookContainer = document.querySelector(".book-container");
const bookForm = document.querySelector(".new-book-form");
const btn = document.querySelector(".btn");
const submit = document.querySelector("#submit");
const closeBookContainer = document.querySelector(".close-book-container");
const overlayShow = document.querySelector(".overlay");
const edit = document.querySelector(".edit-btn");
let indexOfBookToEdit = null;

// Array which stores all the books
let myLibrary = [];

getStorage();

// Sets the local storage
function setLocalStorage() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//Retrieves data from local storage
function getStorage() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
}
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
  setLocalStorage();
}

// Display the book according to the users input
function displayBooks() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Creation of the bookForm
    bookCard.innerHTML = `
    <div class="book-card-container">
    <button class="edit-btn" data-index="${index}"><img src="images/edit.svg" class="edit-btn" data-index="${index}"></button>
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
  setLocalStorage();
}

// If book.isRead is true or false
function toggleRead(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayBooks();
  setLocalStorage();
}

// Removes a book Card
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
  setLocalStorage();
}

// Removes invalid keys
function preventInvalidKeys(e) {
  const invalidKeys = [69, 187, 189, 109, 107, 110];

  if (invalidKeys.includes(e.keyCode)) {
    e.preventDefault();
  }
}

function editBook(index) {
  const book = myLibrary[index];

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const isRead = document.querySelector("#read");

  // Populate the form with book details
  title.value = book.title;
  author.value = book.author;
  pages.value = book.pages;
  isRead.checked = book.isRead;

  indexOfBookToEdit = index; // Set the index of the book being edited

  // Display the book form
  bookForm.style.display = "block";
  closeBookContainer.style.display = "block";
  overlayShow.classList.add("overlay-show");
}

function saveEditBook(index) {
  const book = myLibrary[index];

  const newTitle = document.querySelector("#title").value;
  const newAuthor = document.querySelector("#author").value;
  const newPages = document.querySelector("#pages").value;
  const newIsRead = document.querySelector("#read").checked;

  if (newTitle === "" || newAuthor === "" || newPages === "") {
    window.alert("Please fill in the rest of the field");
    return;
  } else if (newPages > 5000) {
    window.alert("Pages can not exceed 5000");
    return;
  }

  book.title = newTitle;
  book.author = newAuthor;
  book.pages = newPages;
  book.isRead = newIsRead;

  bookForm.style.display = "none";
  overlayShow.classList.remove("overlay-show");
  displayBooks();
}

// Clicking anywhere outside of bookForm closes the bookForm
window.addEventListener("click", (e) => {
  if (e.target == overlayShow) {
    bookForm.style.display = "none";
    overlayShow.classList.remove("overlay-show");
    bookForm.reset();
  }
});

// Displays the book Form input
btn.addEventListener("click", () => {
  bookForm.style.display = "block";
  closeBookContainer.style.display = "block";
  overlayShow.classList.add("overlay-show");
});

// Submits the user input from the form
// Check if user wants to edit book
// Validation if an input is empty
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (indexOfBookToEdit !== null) {
    saveEditBook(indexOfBookToEdit);
    indexOfBookToEdit = null;
  } else {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#read").checked;

    // Validation
    if (title === "" || author === "" || pages === "") {
      window.alert("Please fill in the rest of the field");
      return; // Exit the function if validation fails
    } else if (pages > 5000) {
      window.alert("Pages cannot exceed 5000");
      return; // Exit the function if validation fails
    }

    // Adds every new input from user input to a new book
    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);
  }

  // Resets the bookForm
  bookForm.reset();
  bookForm.style.display = "none";
  overlayShow.classList.remove("overlay-show");
  displayBooks();
});

//Changes the read textContent Read or Not-Read
//Removes 1 bookCard if buttons pressed
bookContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-read")) {
    const index = e.target.getAttribute("data-index");
    toggleRead(index);
  }

  if (e.target.classList.contains("edit-btn")) {
    const index = e.target.getAttribute("data-index");
    editBook(index);
  }

  if (e.target.classList.contains("remove-book")) {
    const index = e.target.getAttribute("data-index");
    removeBook(index);
  }
});

// Closes the booForm container
closeBookContainer.addEventListener("click", () => {
  // Resets the bookForm
  bookForm.reset();

  bookForm.style.display = "none";
  closeBookContainer.style.display = "none";
  overlayShow.classList.remove("overlay-show");
});

// AddEventListeners for invalid keys
pages.addEventListener("keydown", preventInvalidKeys);

//Book simple tests
// Checks if there are no books
if (myLibrary.length === 0) {
  addBookToLibrary(new Book("Book 1", "Author 1", 200, true));
  addBookToLibrary(new Book("Book 2", "Author 2", 300, false));
}

displayBooks();
