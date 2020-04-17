import CardsDesk from './modules/CardsDesk';

const $ = (c) => document.querySelector(c);
const $All = (c) => document.querySelectorAll(c);
const scoreContainer = $('.score-container');
const cards = $('.cards');
const cardsDesk = new CardsDesk();
const sound = $('.mp3');

let currentCards = [];
let currentCard = {};
let currentGameErrors = 0;

const turnCardBack = (cardScene, card) => {
  card.classList.remove('rotate_click');
  cardScene.removeEventListener('mouseleave', () => { turnCardBack(cardScene, card); });
};

const playSound = (src) => {
  sound.src = src;
  sound.play();
};

const clickOnCardHandler = (e) => {
  if (e.target.className !== 'cards') {
    const menuCard = e.target.closest('.menu-container');
    if (menuCard) {
      const selectedCathegory = menuCard.dataset.name;
      cardsDesk.changeCathegory(selectedCathegory);
      changeActiveMenu($(`[data-name="${selectedCathegory}"]`));
      cardsDesk.changeCardsMode();
    }

    const card = e.target.closest('.card-container');
    const cardScene = e.target.closest('.card-scene');

    if (!cardsDesk.isModeGameActive) {
      const rotate = e.target.closest('.rotate');

      if (rotate) {
        card.classList.add('rotate_click');
        cardScene.addEventListener('mouseleave', () => { turnCardBack(cardScene, card); });
      }

      if (card && !rotate && !card.classList.contains('rotate_click')) {
        playSound(`./assets/mp3/${card.dataset.name}.mp3`);
      }
    }

    if (cardsDesk.isModeGameActive && cardsDesk.isGameStarted) {
      if (card.dataset.name === currentCard.en && !card.classList.contains('card-container_done')) {
        card.classList.add('card-container_done');
        playSound('./assets/mp3/right.mp3');

        cardsDesk.addRightSingToScoreContainer();
        continueGame();
      }

      if (card.dataset.name !== currentCard.en && !card.classList.contains('card-container_done')) {
        cardsDesk.addWrongSingToScoreContainer();
        currentGameErrors += 1;
        playSound('./assets/mp3/wrong.mp3');
      }
    }
  }
};

cards.addEventListener('click', clickOnCardHandler);


const openSideMenu = () => {
  $('.hamburger').classList.add('hamburger_opened');
  $('.menu-wrapper').classList.add('menu-wrapper_open');
  $('.menu-shadow').classList.add('menu-shadow_active');
  document.body.style.overflow = 'hidden';
};

const closeSideMenu = () => {
  $('.hamburger').classList.remove('hamburger_opened');
  $('.menu-wrapper').classList.remove('menu-wrapper_open');
  $('.menu-shadow').classList.remove('menu-shadow_active');
  document.body.style.overflow = 'visible';
};

const clickHamburgerHandler = () => {
  if ($('.menu-wrapper').classList.contains('menu-wrapper_open')) {
    closeSideMenu();
  } else {
    openSideMenu();
  }
};

$('.hamburger').addEventListener('click', clickHamburgerHandler);

$('.menu-shadow').addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-shadow_active')) {
    closeSideMenu();
  }
});

const changeActiveMenu = (current) => {
  $All('.menu-item').forEach((el) => {
    el.classList.remove('menu-item_active');
    if (el === current) {
      el.classList.add('menu-item_active');
    }
  });
};

const clickMenuHandle = (e) => {
  if (e.target.tagName === 'LI') {
    cardsDesk.changeCathegory(e.target.dataset.name);
    changeActiveMenu(e.target);
    cardsDesk.changeCardsMode();
    closeSideMenu();
    if (cardsDesk.isGameStarted) {
      stopGame();
    }
  }
};

$('.menu-wrapper').addEventListener('click', clickMenuHandle);


const clickSwitcherHandle = (e) => {
  cardsDesk.changeGameModeActive();
  if (cardsDesk.isModeGameActive) {
    e.target.classList.add('switcher_on');
  } else {
    e.target.classList.remove('switcher_on');
    if (cardsDesk.isGameStarted) {
      stopGame();
    }
  }
};

$('.switcher').addEventListener('click', clickSwitcherHandle);

const shuffle = (arr) => {
  arr.sort(() => Math.random() - 0.5);
  return arr;
};


const stopGame = () => {
  $('.start-btn').classList.remove('repeat');
  currentCard = {};
  currentCards = [];
  currentGameErrors = 0;
  scoreContainer.innerHTML = '';
  $All('.card-container').forEach((el) => {
    el.classList.remove('card-container_done');
  });
  cardsDesk.changeGameStarted();
};

const continueGame = (timeout = 1000) => {
  setTimeout(() => {
    currentCard = getNextCard();
    if (currentCard) {
      playSound(`./assets/mp3/${currentCard.mp3}`);
    }
  }, timeout);
};

const finishGame = () => {
  let timeOut = 5000;
  $('.switcher').classList.remove('switcher_on');
  cardsDesk.changeGameModeActive();
  $('.game-finish').classList.remove('game-finish_hidden');

  if (currentGameErrors > 0) {
    $('.game-finish').classList.add('game-finish_loser');
    $('.game-finish').dataset.errors = `Total ${currentGameErrors} errors.`;
    playSound('./assets/mp3/loser.mp3');
  } else {
    $('.game-finish').classList.add('game-finish_winner');
    timeOut = 3000;
    playSound('./assets/mp3/winner.mp3');
  }

  stopGame();

  setTimeout(() => {
    $('.game-finish').classList.add('game-finish_hidden');
    $('.game-finish').classList.remove('game-finish_winner');
    $('.game-finish').classList.remove('game-finish_loser');
    $('.game-finish').dataset.errors = '';
    cardsDesk.changeCathegory('main');
    changeActiveMenu($('[data-name="main"]'));
  }, timeOut);
};

const getNextCard = () => {
  if (currentCards.length > 0) {
    return currentCards.pop();
  } else {
    finishGame();
  }
};

const runNewGame = () => {
  cardsDesk.changeGameStarted();
  currentCards = [...cardsDesk.cards];
  shuffle(currentCards);
  continueGame(0);
};

const repeatCurrentWord = () => {
  playSound(`./assets/mp3/${currentCard.mp3}`);
};

const clickStartButton = () => {
  if (!cardsDesk.isGameStarted) {
    $('.start-btn').classList.add('repeat');
    runNewGame();
  } else {
    repeatCurrentWord();
  }
};

$('.start-btn').addEventListener('click', clickStartButton);

export { cards, $, $All, scoreContainer };
