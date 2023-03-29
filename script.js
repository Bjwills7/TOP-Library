let myLibrary = [];
let iterator = 0;

window.onload = () => {
  createPlaceholder();
};

// displays
const mainContainer = document.querySelector(".container");
const formModal = document.querySelector(".modal");
const cardContainer = document.querySelector(".main");

// buttons
const newBookButton = document.querySelector(".add-book");
const changeBookLeft = document.querySelector(".left");
const changeBookRight = document.querySelector(".right");
const formCancel = document.querySelector(".form-cancel");
const formSubmit = document.querySelector(".form-submit");
const markRead = document.querySelector(".card-is-read");
let markReadAll = document.querySelectorAll(".card-is-read");
const removeBookButton = document.querySelector(".remove-book");

// form inputs
const formTitle = document.querySelector(".form-title");
const formAuthor = document.querySelector(".form-author");
const formPages = document.querySelector(".form-pages");
const formRead = document.querySelector(".form-read");

newBookButton.addEventListener("click", () => {
  openForm();
});
formCancel.addEventListener("click", (e) => {
  e.preventDefault();
  closeForm();
});
formSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addBook(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
  createCard();
  changeCard(iterator);
  if (myLibrary[iterator].read) {
    document.querySelector(`#cb${iterator}`).checked = true;
  }
  if (cards[0].lastChild.classList.value === "add-book") {
    cards[0].remove();
  }
  closeForm();
});

cardContainer.addEventListener("change", () => {
  if (myLibrary.length < 1) {
    createPlaceholder();
  }
});

let titleP = document.querySelector(".title");
let authorP = document.querySelector(".author");
let pagesP = document.querySelector(".pages");
let readP = document.querySelector(".read");

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
}

function changeCard(index) {
  titleP.textContent = myLibrary[index].title;
  authorP.textContent = `By: ${myLibrary[index].author}`;
  pagesP.textContent = `Pages: ${myLibrary[index].pages}`;
  if (myLibrary[index].read) {
    readP.textContent = "Read";
  } else {
    readP.textContent = "Unread";
  }
}

function openForm() {
  // mainContainer.style.display = "none";
  formModal.style.display = "grid";
}

function closeForm() {
  formModal.style.display = "none";
  // mainContainer.style.display = "grid";
}

Book.prototype.toggleReadBool = function () {
  if (this.read) {
    this.read = false;
  } else {
    this.read = true;
  }
};

// branch refactor stuff
function createCard() {
  let newCard = cardContainer.appendChild(document.createElement("div"));
  let newTitleP = newCard.appendChild(document.createElement("p"));
  let newAuthorP = newCard.appendChild(document.createElement("p"));
  let newPagesP = newCard.appendChild(document.createElement("p"));
  let newReadP = newCard.appendChild(document.createElement("p"));
  let newMarkRead = newCard.appendChild(document.createElement("input"));
  let newMarkReadL = newCard.appendChild(document.createElement("label"));
  let newRemoveBookButton = newCard.appendChild(
    document.createElement("button")
  );
  newCard.setAttribute("class", "card");
  newTitleP.setAttribute("class", "title");
  newAuthorP.setAttribute("class", "author");
  newPagesP.setAttribute("class", "pages");
  newReadP.setAttribute("class", "read");
  newMarkRead.setAttribute("class", "card-is-read");
  newMarkRead.setAttribute("type", "checkbox");
  newMarkRead.setAttribute("data-index", iterator);
  newMarkRead.setAttribute("id", `cb${iterator}`);
  newMarkReadL.setAttribute("for", `cb${iterator}`);
  newMarkReadL.textContent = "✔";
  newRemoveBookButton.setAttribute("class", "remove-book");
  newRemoveBookButton.setAttribute("data-index", iterator);
  newRemoveBookButton.textContent = "✖";
  titleP = newTitleP; // these need to be redefined in the event listener below
  authorP = newAuthorP;
  pagesP = newPagesP;
  readP = newReadP;
  markReadAll = document.querySelectorAll(".card-is-read");
  newMarkRead.addEventListener("click", (e) => {
    setActiveElements(e);
    myLibrary[e.target.dataset.index].toggleReadBool();
    changeCard(e.target.dataset.index);
  });
  newRemoveBookButton.addEventListener("click", (e) => {
    myLibrary.forEach((book) => {
      if (myLibrary.indexOf(book) > e.target.dataset.index) {
        cardContainer.children[myLibrary.indexOf(book)].querySelector(
          ".card-is-read"
        ).dataset.index -= 1;
        cardContainer.children[myLibrary.indexOf(book)].querySelector(
          ".remove-book"
        ).dataset.index -= 1;
      }
    });
    myLibrary.splice(e.target.dataset.index, 1);
    e.target.parentElement.remove();
  });
}

// create placeholder card on page load and when library.length === 0
function createPlaceholder() {
  let newCard = cardContainer.appendChild(document.createElement("div"));
  let title = newCard.appendChild(document.createElement("p"));
  let addCardButton = newCard.appendChild(document.createElement("button"));
  newCard.setAttribute("class", "card");
  title.setAttribute("class", "title");
  title.textContent = "Add a book!";
  addCardButton.textContent = "+";
  addCardButton.setAttribute("class", "add-book");
  addCardButton.addEventListener("click", () => {
    openForm();
  });
}

// testing mutation observer
let cards = document.querySelectorAll(".card");
const mutationObserver = new MutationObserver((entries) => {
  cards = document.querySelectorAll(".card");
  if (myLibrary.length < 1 && cards.length < 1) {
    createPlaceholder();
  }
});
mutationObserver.observe(cardContainer, { childList: true });

// end mutation observer tests
function setActiveElements(e) {
  readP = e.target.previousElementSibling;
  pagesP = readP.previousElementSibling;
  authorP = pagesP.previousElementSibling;
  titleP = authorP.previousElementSibling;
}
