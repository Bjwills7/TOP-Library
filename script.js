let myLibrary = [];

let newBookButton = document.querySelector(".add-book");

addBook("Beeg Yoshi", "donkey", 1, "has been read");

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
}

// remove current card?
// add next card?
// or just change the content?
function changeCard() {}
