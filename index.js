import { cardsData } from "./modules/cards.js";

const $ = c => document.querySelector(c);
const $All = c => document.querySelectorAll(c);

class Card {
  constructor(card) {
    this.mp3 = card.mp3;
    this.ru = card.ru;
    this.en = card.en;
    this.img = card.img;
    this.addCardToDOM();
  }

  addCardToDOM() {
    const card = document.createElement('div');
    card.classList = "card";
    card.dataset.name = this.en;
    cards.appendChild(card);

    const img = document.createElement('div');
    img.classList = "card__img";
    img.style.backgroundImage = `url('./../../assets/img/${this.img}')`;
    card.appendChild(img);

    const description = document.createElement('div');
    description.classList = "card__description";
    description.innerText = this.en;
    card.appendChild(description);

    this.cardDOM = card;
  }
}

class CardsDesk {
  constructor() {
    this.currentCathegory = "emotion";
    this.cards = [];
    this.isModeGameActive = false;
    this.loadCards();
  }

  loadCards() {
    const cathegoryItems = cardsData.cathegories[this.currentCathegory];
    cathegoryItems.forEach((card) => {
      this.cards.push(new Card(cardsData[card]));
    })
  }

  changeCathegory(cathegory) {
    this.currentCathegory = cathegory;
    this.cards = [];
    cards.innerHTML = "";
    this.loadCards();
  }

  changeGameModeActive() {
    this.isModeGameActive = !this.isModeGameActive;
    this.changeCardsMode();
  }

  setCardsGameMode() {
    $All(".card").forEach(card => {
      card.firstElementChild.classList.add("card__img_play");
      card.lastElementChild.classList.add("card__description_play");
    });
  }

  setCardsTrainingMode() {
    $All(".card").forEach(card => {
      card.firstElementChild.classList.remove("card__img_play");
      card.lastElementChild.classList.remove("card__description_play");
    });
  }

  changeCardsMode() {
    if (this.isModeGameActive) {
      this.setCardsGameMode();
    } else {
      this.setCardsTrainingMode();
    }
  }
}

const cards = $(".cards");

const cardsDesc = new CardsDesk();


let sound = $(".mp3");


const clickOnCard = (e) => {
  if (!cardsDesc.isModeGameActive) {
    let card = e.target.closest(".card");
    if (card) {
      sound.src = `./assets/mp3/${card.dataset.name}.mp3`;
      sound.play();
    }
  }
};

cards.addEventListener('click', clickOnCard);


const openSideMenu = () => {
  $(".hamburger").classList.add("hamburger_opened");
  $(".menu-wrapper").classList.add("menu-wrapper_open");
  $(".menu-shadow").classList.add("menu-shadow_active");
  document.body.style.overflow = "hidden";
}

const closeSideMenu = () => {
  $(".hamburger").classList.remove("hamburger_opened");
  $(".menu-wrapper").classList.remove("menu-wrapper_open");
  $(".menu-shadow").classList.remove("menu-shadow_active");
  document.body.style.overflow = "visible";
}

const clickHamburgerHandler = () => {
  if ($(".menu-wrapper").classList.contains("menu-wrapper_open")) {
    closeSideMenu();
  } else {
    openSideMenu();
  }
}

$(".hamburger").addEventListener('click', clickHamburgerHandler);

$(".menu-shadow").addEventListener('click', (e) => {
  if (e.target.classList.contains("menu-shadow_active")) {
    closeSideMenu();
  }
});


const changeActiveMenu = (current) => {
  $All(".menu-item").forEach(el => {
    el.classList.remove("menu-item_active");
    if (el === current) {
      el.classList.add("menu-item_active");
    }
  });
};

const clickMenuHandle = (e) => {
  if (e.target.tagName === "LI") {
    cardsDesc.changeCathegory(e.target.dataset.name);
    changeActiveMenu(e.target);
    cardsDesc.changeCardsMode();
    closeSideMenu();
  }
};

$(".menu-wrapper").addEventListener('click', clickMenuHandle);

const clickSwitcherHandle = (e) => {
  cardsDesc.changeGameModeActive();
  if (cardsDesc.isModeGameActive) {
    e.target.classList.add("switcher_on");
  } else {
    e.target.classList.remove("switcher_on");
  }
}

$(".switcher").addEventListener('click', clickSwitcherHandle);


