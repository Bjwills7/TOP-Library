class Library {
  constructor() {
    this.bookCase = [];
  }

  addBook() {
    let newBook = new Book(
      inputs.title.value,
      inputs.author.value,
      inputs.pages.value,
      inputs.read.checked
    );
    this.bookCase.push(newBook);
    iterator = this.bookCase.indexOf(newBook);
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadBool() {
    this.read ? (this.read = false) : (this.read = true);
  }
}

class UserInterface {
  constructor() {}
}

class Display extends UserInterface {
  constructor() {
    super();
    this.formModal = document.querySelector(".modal");
    this.mainContainer = document.querySelector(".container");
    this.cardContainer = document.querySelector(".main");
  }

  openForm() {
    this.formModal.style.display = "grid";
  }

  closeForm() {
    this.formModal.style.display = "none";
  }
}

class Card extends Display {
  constructor() {
    super();
    this.titleP = document.querySelector(".title");
    this.authorP = document.querySelector(".author");
    this.pagesP = document.querySelector(".pages");
    this.readP = document.querySelector(".read");
  }

  setActiveElements(target) {
    this.readP = target.previousElementSibling;
    this.pagesP = this.readP.previousElementSibling;
    this.authorP = this.pagesP.previousElementSibling;
    this.titleP = this.authorP.previousElementSibling;
  }

  changeCard(index) {
    this.titleP.textContent = library.bookCase[index].title;
    this.authorP.textContent = `By: ${library.bookCase[index].author}`;
    this.pagesP.textContent = `Pages: ${library.bookCase[index].pages}`;
    if (library.bookCase[index].read) {
      this.readP.textContent = "Read";
    } else {
      this.readP.textContent = "Unread";
    }
  }

  createCard() {
    let newCard = display.cardContainer.appendChild(
      document.createElement("div")
    );
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
    this.setActiveElements(newMarkRead);
    newMarkRead.addEventListener("click", (e) => {
      this.setActiveElements(e.target); // needed to ensure the appropriate checkbox is changed
      library.bookCase[e.target.dataset.index].toggleReadBool();
      card.changeCard(e.target.dataset.index);
    });
    newRemoveBookButton.addEventListener("click", (e) => {
      library.bookCase.forEach((book) => {
        if (library.bookCase.indexOf(book) > e.target.dataset.index) {
          display.cardContainer.children[
            library.bookCase.indexOf(book)
          ].querySelector(".card-is-read").dataset.index -= 1;
          display.cardContainer.children[
            library.bookCase.indexOf(book)
          ].querySelector(".remove-book").dataset.index -= 1;
        }
      });
      library.bookCase.splice(e.target.dataset.index, 1);
      e.target.parentElement.remove();
    });
  }

  createPlaceholder() {
    let newCard = display.cardContainer.appendChild(
      document.createElement("div")
    );
    let title = newCard.appendChild(document.createElement("p"));
    let addCardButton = newCard.appendChild(document.createElement("button"));
    newCard.setAttribute("class", "card");
    title.setAttribute("class", "title");
    title.textContent = "Add a book!";
    addCardButton.textContent = "+";
    addCardButton.setAttribute("class", "add-book");
    addCardButton.addEventListener("click", () => {
      display.openForm();
    });
  }
}

class Buttons extends UserInterface {
  constructor() {
    super();
    this.newBookButton = document.querySelector(".add-book");
    this.formCancel = document.querySelector(".form-cancel");
    this.formSubmit = document.querySelector(".form-submit");
    this.markRead = document.querySelector(".card-is-read");
    this.removeBookButton = document.querySelector(".remove-book");
  }

  initListeners() {
    buttons.newBookButton.addEventListener("click", () => {
      inputs.read.checked = false;
      display.openForm();
    });

    buttons.formCancel.addEventListener("click", (e) => {
      e.preventDefault();
      display.closeForm();
    });

    buttons.formSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      library.addBook(
        inputs.title.value,
        inputs.author.value,
        inputs.pages.value,
        inputs.read.checked
      );
      card.createCard();
      card.changeCard(iterator);
      if (library.bookCase[iterator].read) {
        document.querySelector(`#cb${iterator}`).checked = true;
      }
      if (cards[0].lastChild.classList.value === "add-book") {
        cards[0].remove();
      }
      display.closeForm();
    });
  }
}

class Inputs extends UserInterface {
  constructor() {
    super();
    this.title = document.querySelector(".form-title");
    this.author = document.querySelector(".form-author");
    this.pages = document.querySelector(".form-pages");
    this.read = document.querySelector(".form-read");
  }
}

let iterator = 0; // used to match book objects to display cards

const library = new Library();
const display = new Display();
const card = new Card();
const buttons = new Buttons();
const inputs = new Inputs();

buttons.initListeners();

window.onload = () => {
  card.createPlaceholder();
};

// checks for DOM changes on cards and creates placeholder if no books are present
let cards = document.querySelectorAll(".card");
const mutationObserver = new MutationObserver((entries) => {
  cards = document.querySelectorAll(".card");
  if (library.bookCase.length < 1 && cards.length < 1) {
    card.createPlaceholder();
  }
});
mutationObserver.observe(display.cardContainer, { childList: true });
