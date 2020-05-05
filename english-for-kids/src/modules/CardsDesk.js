import cardsData from './cards';
import Card from './Card';
import { cards, $, $All, scoreContainer } from '../index';

export default class CardsDesk {
  constructor() {
    this.currentCategory = 'main';
    this.cards = [];
    this.isModeGameActive = false;
    this.isGameStarted = false;
    this.loadCards();
  }

  loadCards(trainArray) {
    if (!trainArray) {
      const categoryItems = cardsData.categories[this.currentCategory];
      categoryItems.forEach((card) => {
        this.cards.push(new Card(cardsData[card], this.currentCategory));
      });
    } else {
      trainArray.forEach((card) => {
        this.cards.push(new Card(cardsData[card], this.currentCategory));
      });
      this.setCardsGameMode();
      this.changeCardsMode();
    }
  }

  getItemFromLocalStorage(cardName) {
    const cardInStorage = JSON.parse(localStorage.getItem(cardName));
    const dataToTable = {};
    if (cardInStorage) {
      dataToTable.clics = cardInStorage.clicks;
      dataToTable.right = cardInStorage.right;
      dataToTable.wrong = cardInStorage.wrong;
      if (cardInStorage.wrong === 0) {
        dataToTable.mistakesPercent = 0;
      } else {
        dataToTable.mistakesPercent = +(100 / ((cardInStorage.right + cardInStorage.wrong) || 1) * (cardInStorage.wrong || 1)).toFixed(2);
      }
    } else {
      dataToTable.clics = 0;
      dataToTable.right = 0;
      dataToTable.wrong = 0;
      dataToTable.mistakesPercent = 0;
    }
    return dataToTable;
  }

  generateTableRow(cat, elem) {
    const itemData = this.getItemFromLocalStorage(elem);
    const newTableRow = `
    <tr>
    <td>${elem}</td>
    <td>${cardsData.catNames[cat]}</td>
    <td>${cardsData[elem].ru}</td>
    <td>${itemData.clics}</td> 
    <td>${itemData.right}</td>
    <td>${itemData.wrong}</td>
    <td>${itemData.mistakesPercent}</td>
    </tr>
    `;
    return newTableRow;
  }

  loadStatistics() {
    Object.keys(cardsData.categories).forEach((cat) => {
      const tableBody = $('.table-body');
      if (cat !== 'main') {
        cardsData.categories[cat].forEach((elem) => {
          tableBody.innerHTML += (this.generateTableRow(cat, elem));
        });
      }
    });
  }

  clearStatisticsTable() {
    $('.table-body').innerHTML = '';
  }

  showStatisticsPage() {
    this.loadStatistics();
    $('.statistics').classList.remove('statistics_none');
  }

  hideStatisticsPage() {
    $('.statistics').classList.add('statistics_none');
    this.clearStatisticsTable();
  }

  changeCategory(category) {
    this.currentCategory = category;
    this.cards = [];
    cards.innerHTML = '';
    if (category === 'statistics') {
      this.showStatisticsPage();
    } else {
      this.hideStatisticsPage();
      this.loadCards();
    }
  }

  setStartButtonStatus() {
    if (this.currentCategory !== 'main' && this.isModeGameActive) {
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
