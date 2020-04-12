import { cardsData } from "./modules/cards.js";

const $ = c => document.querySelector(c);

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
    this.loadCards();
  }

  loadCards() {
    const cathegoryItems = cardsData.cathegories[this.currentCathegory];
    cathegoryItems.forEach((card)=> {
      this.cards.push(new Card(cardsData[card]));
    })
  }

  changeCathegory(cathegory) {
    this.currentCathegory = cathegory;
    this.cards = [];
    cards.innerHTML = "";
    this.loadCards();
  }
}

const cards = $(".cards");

const cardsDesc = new CardsDesk();


let sound = $(".mp3");

cards.addEventListener('click', (e) => {
    let card = e.target.closest(".card");
    if (card) {
    sound.src=`./assets/mp3/${card.dataset.name}.mp3`;
    sound.play();
  }
});

const openSideMenu = () => {
  $(".hamburger").classList.add("hamburger__opened");
  $(".menu-wrapper").style.left = "0";
  $(".hamburger").classList.add("hamburger__opened");
  $(".menu-shadow").classList.add("menu-shadow__active");
}

const closeSideMenu = () => {
  $(".hamburger").classList.remove("hamburger__opened");
  $(".menu-wrapper").style.left = "-400px";
  $(".menu-shadow").classList.remove("menu-shadow__active");
}

const clickHamburgerHandler = () => {
  if ($(".menu-wrapper").style.left === "-400px" || $(".menu-wrapper").style.left === "") {
    openSideMenu();
  } else {
    closeSideMenu();
  }
}

$(".hamburger").addEventListener('click', clickHamburgerHandler);

$(".menu-shadow").addEventListener('click', (e)=>{
  if (e.target.classList.contains("menu-shadow__active")) {
    closeSideMenu();
  }
});

setTimeout(()=> {cardsDesc.changeCathegory("clothes")}, 5000);
