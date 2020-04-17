import cardsData from './cards';
import { cards } from  './../index';

export class Card {
  constructor(card, cathegory) {
    this.img = card.img;
    if (cathegory === "main") {
      this.cathegoryID = cardsData.menu[card.en][0];
      this.cathegoryName = cardsData.menu[card.en][1];
      this.addMenuCardToDOM();
    } else {
      this.mp3 = card.mp3;
      this.ru = card.ru;
      this.en = card.en;
      this.addCardToDOM();
    }
  }

  addMenuCardToDOM() {
    //menu container
    const menuContainer = document.createElement('div');
    menuContainer.classList = "menu-container";
    menuContainer.dataset.name = this.cathegoryID;
    cards.appendChild(menuContainer);

    //menu card
    const menuCard = document.createElement('div');
    menuCard.classList = "menu-card";
    menuContainer.appendChild(menuCard);

    const img = document.createElement('div');
    img.classList = "menu-card__img";
    img.style.backgroundImage = `url('./assets/img/${this.img}')`;
    menuCard.appendChild(img);

    const descr = document.createElement('div');
    descr.classList = "menu-card__description";
    descr.innerText = this.cathegoryName;
    menuCard.appendChild(descr);
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
    imgBack.style.backgroundImage = `url('./assets/img/${this.img}')`;
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
    imgFront.style.backgroundImage = `url('./assets/img/${this.img}')`;
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