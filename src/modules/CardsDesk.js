import cardsData from './cards';
import Card from './Card';
import { cards, $, $All, scoreContainer } from '../index';

export default class CardsDesk {
  constructor() {
    this.currentCathegory = 'main';
    this.cards = [];
    this.isModeGameActive = false;
    this.isGameStarted = false;
    this.loadCards();
  }

  loadCards() {
    const cathegoryItems = cardsData.cathegories[this.currentCathegory];
    cathegoryItems.forEach((card) => {
      this.cards.push(new Card(cardsData[card], this.currentCathegory));
    });
  }

  changeCathegory(cathegory) {
    this.currentCathegory = cathegory;
    this.cards = [];
    cards.innerHTML = '';
    this.loadCards();
  }

  setStartButtonStatus() {
    if (this.currentCathegory !== 'main' && this.isModeGameActive) {
      $('.start-btn').classList.remove('start-btn_hidden');
    } else {
      $('.start-btn').classList.add('start-btn_hidden');
    }
  }

  changeGameModeActive() {
    this.isModeGameActive = !this.isModeGameActive;
    this.changeCardsMode();
    this.setStartButtonStatus();
  }

  setCardsGameMode() {
    $All('.card').forEach((card) => {
      card.firstElementChild.classList.add('card__img_play');
      card.lastElementChild.classList.add('card__description_play');
    });
  }

  setCardsTrainingMode() {
    $All('.card').forEach((card) => {
      card.firstElementChild.classList.remove('card__img_play');
      card.lastElementChild.classList.remove('card__description_play');
    });
  }

  changeCardsMode() {
    if (this.isModeGameActive) {
      this.setCardsGameMode();
    } else {
      this.setCardsTrainingMode();
    }
    this.setStartButtonStatus();
  }

  changeGameStarted() {
    this.isGameStarted = !this.isGameStarted;
  }

  addRightSingToScoreContainer() {
    scoreContainer.innerHTML += '<div class="score-item score-item_right"></div>';
  }

  addWrongSingToScoreContainer() {
    scoreContainer.innerHTML += '<div class="score-item score-item_wrong"></div>';
  }
}
