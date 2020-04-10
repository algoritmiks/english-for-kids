import { cardsData } from "./modules/cards.js";


class Card {
  constructor(card) {
    this.mp3 = card.mp3;
    this.ru = card.ru;
    this.en = card.en;
    this.img = card.img; 
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


let cardsDesc = new CardsDesk();
alert(cardDesc);
