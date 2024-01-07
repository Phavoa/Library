// Encapsulate in an IIFE to avoid polluting the global scope

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
const image = document.querySelector("#image");

const myLibrary = [];

function Book(title, author, pages, read, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.image = image;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  console.log(index);
  displayBooks();
}

function changeRead() {
  if (myLibrary.read === false)
    return true;
  displayBooks();
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayBooks() {
  books.textContent = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    if (book.image) {
      const reader = new FileReader();
      reader.onload = function (e) {
        bookCard.style.background = `url('${e.target.result}') center/cover`;
      };
      reader.readAsDataURL(book.image);
    } else {
      bookCard.style.backgroundColor = book.backgroundColor;
    }

    const titleDiv = createDivWithText(book.title);
    const authorDiv = createDivWithText(book.author);
    const pagesDiv = createDivWithText(book.pages);
    const readDiv = createDivWithText(book.read ? 'Read' : 'Unread');
    const removeBtn = createButton('Remove', () =>
      deleteBook(index));
    removeBtn.className = "removeBtn";
    const toggleInput = createToggle(() => changeRead());
    toggleInput.id = 'toggleInput';



    bookCard.appendChild(titleDiv);
    bookCard.appendChild(authorDiv);
    bookCard.appendChild(pagesDiv);
    bookCard.appendChild(readDiv);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(inputToggle);

    books.appendChild(bookCard);
  });
  console.log(myLibrary)
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

function createToggle(onChange) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener('click', onChange);
  return input;
}


showDialog.addEventListener('click', () => formDialog.show());

closeBtn.addEventListener('click', () => formDialog.close());

submitForm.addEventListener('click', (event) => {
  event.preventDefault();
  if (title.value.length === 0 || author.value.length === 0 || pages.value > 500) {
    alert("Please fill in all fields and ensure the page count is not greater than 500.");
    return; // Stop further execution if validation fails
  }

  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookPages = pages.value;
  const bookRead = read.checked;
  const bookImage = image.files[0];;

  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead, bookImage);

  newBook.backgroundColor = getRandomColor();

  addBookToLibrary(newBook);

/*     bookForm.reset();
 */    displayBooks();
});

removeBookBtn.addEventListener('click', () => {
  // Check if there are books to remove
  if (myLibrary.length > 0) {
    myLibrary.pop();
    displayBooks();
  }
});

