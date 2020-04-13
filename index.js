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
    //card scene
    const cardScene = document.createElement('div');
    cardScene.classList = "card-scene";
    cards.appendChild(cardScene);

    //card container
    const cardContainer = document.createElement('div');
    cardContainer.classList = "card-container";
    cardContainer.dataset.name = this.en;
    cardScene.appendChild(cardContainer);

    //back card
    const cardBack = document.createElement('div');
    cardBack.classList = "card card__back";
    cardContainer.appendChild(cardBack);

    const imgBack = document.createElement('div');
    imgBack.classList = "card__img";
    imgBack.style.backgroundImage = `url('./../../assets/img/${this.img}')`;
    cardBack.appendChild(imgBack);

    const descriptionBack = document.createElement('div');
    descriptionBack.classList = "card__description";
    descriptionBack.innerText = this.ru;
    cardBack.appendChild(descriptionBack);

    //front card
    const cardFront = document.createElement('div');
    cardFront.classList = "card";
    cardContainer.appendChild(cardFront);

    const imgFront = document.createElement('div');
    imgFront.classList = "card__img";
    imgFront.style.backgroundImage = `url('./../../assets/img/${this.img}')`;
    cardFront.appendChild(imgFront);

    const descriptionFront = document.createElement('div');
    descriptionFront.classList = "card__description";
    descriptionFront.innerText = this.en;
    cardFront.appendChild(descriptionFront);

    const rotate = document.createElement('div');
    rotate.classList = "rotate";
    descriptionFront.appendChild(rotate);

    this.cardDOM = cardContainer;
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
const sound = $(".mp3");


const clickOnCardHandler = (e) => {
  if (!cardsDesc.isModeGameActive) {
    let rotate = e.target.closest(".rotate");
    let card = e.target.closest(".card-container");
    if (rotate) {
      card.classList.add("rotate_click");
    }
    if (card && !rotate && !card.classList.contains("rotate_click")) {
      sound.src = `./assets/mp3/${card.dataset.name}.mp3`;
      sound.play();
    }
  }
};

cards.addEventListener('click', clickOnCardHandler);



const moveMouseOutCardHandler = (e) => {
  if (!e.target.closest(".card-container")) {
    $All(".card-container").forEach(card => {
      card.classList.remove("rotate_click");
    });
  }
};

window.addEventListener('mousemove', moveMouseOutCardHandler);


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