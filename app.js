const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const bookForm = document.querySelector('#book-form');
const submitForm = document.querySelector('#submit');
const books = document.querySelector(".books");
const formDialog = document.querySelector("#formDialog");
const showDialog = document.querySelector("#showDialog");
const closeBtn = document.querySelector('#closeBtn');
const removeBookBtn = document.querySelector(".removeBookBtn");

let num = 0;

const book = { title: "The beginning After The End", Author: "Tega", pages: 200, read: true }

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook() {
  myLibrary.pop();
  books.removeChild(books.lastChild);
  
  console.log(myLibrary);
}

function removeEachBook(deleteBook) {
  for (let i = 0; i < myLibrary.length; i++) {
    deleteBook.addEventListener('cl')
  }
}

function displayBooks() {

  for (let i = 0; i < myLibrary.length; i++) {
    num++;
    console.log(num += 1);
  }
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";

  const titleDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const pagesDiv = document.createElement('div');
  const readDiv = document.createElement('div');

  for (let i = 0; i < myLibrary.length; i++) {
    
    titleDiv.textContent = myLibrary[i].title;
    authorDiv.textContent = myLibrary[i].author;
    pagesDiv.textContent = myLibrary[i].pages;
    readDiv.textContent = myLibrary[i].read;

    bookCard.appendChild(titleDiv);
    bookCard.appendChild(authorDiv);
    bookCard.appendChild(pagesDiv);
    bookCard.appendChild(readDiv);
  }
  books.appendChild(bookCard);
}


showDialog.addEventListener('click', () => {
  formDialog.show();
});

closeBtn.addEventListener('click', () => {
  // Close the dialog when the close button is clicked
  formDialog.close();
});


submitForm.addEventListener('click', (event) => {
  event.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookpages = pages.value;
  const bookRead = read.checked;
  const newBook = new Book(bookTitle, bookAuthor, bookpages, bookRead);

  addBookToLibrary(newBook);

  bookForm.reset();
  displayBooks();
  console.log(myLibrary)
})


removeBookBtn.addEventListener('click', () => {
  removeBook();
});
