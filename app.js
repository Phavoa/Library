// Encapsulate in an IIFE to avoid polluting the global scope
(function () {
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

  function deleteBook(index) {
    myLibrary.splice(index, 1);
    console.log(index);
    displayBooks();
  }

  function displayBooks() {
    // Clear existing content in the books div
    books.textContent = "";

    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";

      const titleDiv = createDivWithText(book.title);
      const authorDiv = createDivWithText(book.author);
      const pagesDiv = createDivWithText(book.pages);
      const readDiv = createDivWithText(book.read ? 'Read' : 'Unread');
      const removeBtn = createButton('Remove', () => 
      deleteBook(index));

      bookCard.appendChild(titleDiv);
      bookCard.appendChild(authorDiv);
      bookCard.appendChild(pagesDiv);
      bookCard.appendChild(readDiv);
      bookCard.appendChild(removeBtn);

      books.appendChild(bookCard);
    });
  }

  function createDivWithText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div;
  }

  function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  }

  showDialog.addEventListener('click', () => formDialog.show());

  closeBtn.addEventListener('click', () => formDialog.close());

  submitForm.addEventListener('click', (event) => {
    event.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const bookRead = read.checked;

    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

    addBookToLibrary(newBook);

    bookForm.reset();
    displayBooks();
  });

  removeBookBtn.addEventListener('click', () => {
    // Check if there are books to remove
    if (myLibrary.length > 0) {
      myLibrary.pop();
      displayBooks();
    }
  });
})();
