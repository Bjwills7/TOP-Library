let myLibrary = [];
let iterator = 0;

// displays
const mainContainer = document.querySelector(".container");
const formModal = document.querySelector(".modal");

// buttons
const newBookButton = document.querySelector(".add-book");
const changeBookLeft = document.querySelector(".left");
const changeBookRight = document.querySelector(".right");
const formCancel = document.querySelector(".form-cancel");
const formSubmit = document.querySelector(".form-submit");
const markRead = document.querySelector(".card-is-read");
const removeBookButton = document.querySelector(".remove-book");

// form inputs
const formTitle = document.querySelector(".form-title");
const formAuthor = document.querySelector(".form-author");
const formPages = document.querySelector(".form-pages");
const formRead = document.querySelector(".form-read");

changeBookLeft.addEventListener("click", () => {
  if (myLibrary[iterator - 1] === undefined) {
    iterator = myLibrary.length - 1;
    changeCard();
    return;
  }
  iterator -= 1;
  changeCard();
});
changeBookRight.addEventListener("click", () => {
  if (myLibrary[iterator + 1] === undefined) {
    iterator = 0;
    changeCard();
    return;
  }
  iterator += 1;
  changeCard();
});
newBookButton.addEventListener("click", () => {
  openForm();
});
formCancel.addEventListener("click", () => {
  closeForm();
});
formSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addBook(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
  closeForm();
});
markRead.addEventListener("click", () => {
  if (!!!myLibrary[iterator]) return;
  myLibrary[iterator].toggleReadBool();
  changeCard();
});
removeBookButton.addEventListener("click", () => {
  removeBook();
});

let titleP = document.querySelector(".title");
let authorP = document.querySelector(".author");
let pagesP = document.querySelector(".pages");
let readP = document.querySelector(".read");

addBook("Beeg Yoshi", "donkey", 1, true);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  iterator = myLibrary.indexOf(newBook);
  changeCard();
}

function changeCard() {
  if (myLibrary.length === 0) {
    titleP.textContent = "";
    authorP.textContent = "Add a book with the new book button!";
    pagesP.textContent = "";
    readP.textContent = "";
  } else {
    titleP.textContent = myLibrary[iterator].title;
    authorP.textContent = myLibrary[iterator].author;
    pagesP.textContent = myLibrary[iterator].pages;
    if (myLibrary[iterator].read) {
      readP.textContent = "Read";
    } else {
      readP.textContent = "Not Read";
    }
  }
}

function openForm() {
  mainContainer.style.display = "none";
  formModal.style.display = "grid";
}

function closeForm() {
  formModal.style.display = "none";
  mainContainer.style.display = "grid";
}

Book.prototype.toggleReadBool = function () {
  if (this.read) {
    this.read = false;
  } else {
    this.read = true;
  }
};

function removeBook() {
  myLibrary.splice(iterator, 1);
  if (myLibrary[iterator] === undefined) iterator -= 1;
  changeCard();
}
