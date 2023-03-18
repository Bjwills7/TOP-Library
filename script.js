let myLibrary = [];
let iterator = 0;

// buttons
let newBookButton = document.querySelector(".add-book");
let changeBookLeft = document.querySelector(".left");
let changeBookRight = document.querySelector(".right");

// event listeners
changeBookLeft.addEventListener("click", () => {
  iterator -= 1;
  changeCard(iterator);
});
changeBookRight.addEventListener("click", () => {
  iterator += 1;
  changeCard(iterator);
});

let titleP = document.querySelector(".title");
let authorP = document.querySelector(".author");
let pagesP = document.querySelector(".pages");
let readP = document.querySelector(".read");

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
  changeCard(myLibrary.indexOf(newBook));
}

function changeCard(i) {
  if (myLibrary[i] === undefined) {
    return;
  }
  titleP.textContent = myLibrary[i].title;
  authorP.textContent = myLibrary[i].author;
  pagesP.textContent = myLibrary[i].pages;
  readP.textContent = myLibrary[i].read;
}

// remove card and replace it with form?
function openForm() {}
