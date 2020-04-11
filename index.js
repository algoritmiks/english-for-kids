import { cardsData } from "./modules/cards.js";

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

const cards = document.querySelector(".cards");

const cardsDesc = new CardsDesk();


let sound = document.querySelector(".mp3");

cards.addEventListener('click', (e) => {
    let card = e.target.closest(".card");
    if (card) {
    sound.src=`./assets/mp3/${card.dataset.name}.mp3`;
    sound.play();
  }
});

document.querySelector(".hamburger").addEventListener('click', (e)=>{
  document.querySelector(".menu-wrapper").style.left = "0";
  document.querySelector(".hamburger").classList.add("hamburger__opened");
})

setTimeout(()=> {cardsDesc.changeCathegory("clothes")}, 5000);
