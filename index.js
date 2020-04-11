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
    this.currentCathegory = "action1";
    this.cards = [];
    this.loadCards();
  }

  loadCards() {
    const cathegoryItems = cardsData.cathegories[this.currentCathegory];
    cathegoryItems.forEach((card)=> {
      this.cards.push(new Card(cardsData[card]));
    })
  }
}

const cards = document.querySelector(".cards");

const cardsDesc = new CardsDesk();


let sound = document.querySelector(".mp3");

cards.addEventListener('click', (e) => {
  if (e.path[1].classList.contains("card")) {
    sound.src=`./assets/mp3/${e.path[1].dataset.name}.mp3`;
    sound.play();
  }
});

