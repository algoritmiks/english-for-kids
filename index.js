import { cardsData } from "./modules/cards.js";

const $ = c => document.querySelector(c);
const $All = c => document.querySelectorAll(c);

class Card {
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
    img.style.backgroundImage = `url('./../../assets/img/${this.img}')`;
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
    this.currentCathegory = "main";
    this.cards = [];
    this.isModeGameActive = false;
    this.isGameStarted = false;
    this.loadCards();
  }

  loadCards() {
    const cathegoryItems = cardsData.cathegories[this.currentCathegory];
    cathegoryItems.forEach((card) => {
      this.cards.push(new Card(cardsData[card], this.currentCathegory));
    })
  }

  changeCathegory(cathegory) {
    this.currentCathegory = cathegory;
    this.cards = [];
    cards.innerHTML = "";
    this.loadCards();
  }

  setStartButtonStatus() {
    if (this.currentCathegory !== "main" && this.isModeGameActive) {
      $(".start-btn").classList.remove("start-btn_hidden");
    } else {
      $(".start-btn").classList.add("start-btn_hidden");
    }
  }

  changeGameModeActive() {
    this.isModeGameActive = !this.isModeGameActive;
    this.changeCardsMode();
    this.setStartButtonStatus();
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
    this.setStartButtonStatus();
  }

  changeGameStarted() {
    this.isGameStarted = !this.isGameStarted;
  }
}

const cards = $(".cards");
const cardsDesk = new CardsDesk();
const sound = $(".mp3");


const clickOnCardHandler = (e) => {
  let menuCard = e.target.closest(".menu-container");
  if (menuCard) {
    const selectedCathegory = menuCard.dataset.name;
    cardsDesk.changeCathegory(selectedCathegory);
    changeActiveMenu($(`[data-name="${selectedCathegory}"]`));
    cardsDesk.changeCardsMode();
  }

  const card = e.target.closest(".card-container");

  if (!cardsDesk.isModeGameActive) {
    const rotate = e.target.closest(".rotate");
    
    if (rotate) {
      card.classList.add("rotate_click");
    }
    if (card && !rotate && !card.classList.contains("rotate_click")) {
      sound.src = `./assets/mp3/${card.dataset.name}.mp3`;
      sound.play();
    }
  }

  if (cardsDesk.isModeGameActive && cardsDesk.isGameStarted) {
    if (card.dataset.name === currentCard.en && !card.classList.contains("card-container_done")) {
      card.classList.add("card-container_done");
      sound.src= `./assets/mp3/right.mp3`;
      sound.play();
      continueGame();
    } 
    if (card.dataset.name !== currentCard.en && !card.classList.contains("card-container_done")) {
      sound.src= `./assets/mp3/wrong.mp3`;
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
    cardsDesk.changeCathegory(e.target.dataset.name);
    changeActiveMenu(e.target);
    cardsDesk.changeCardsMode();
    closeSideMenu();
    if (cardsDesk.isGameStarted) {
      stopGame();
    }
  }
};

$(".menu-wrapper").addEventListener('click', clickMenuHandle);

const clickSwitcherHandle = (e) => {
  cardsDesk.changeGameModeActive();
  if (cardsDesk.isModeGameActive) {
    e.target.classList.add("switcher_on");
  } else {
    e.target.classList.remove("switcher_on");
    if (cardsDesk.isGameStarted) {
      stopGame();
    };
  }
}

$(".switcher").addEventListener('click', clickSwitcherHandle);

const shuffle = (arr) => {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

let currentCards = [];
let currentCard = {};

const stopGame = () => {
  $(".start-btn").classList.remove("repeat");
  currentCard = {};
  currentCards = [];
  $All(".card-container").forEach((el)=>{
    el.classList.remove("card-container_done");
  });
  cardsDesk.changeGameStarted();
}

const continueGame = (timeout=1000) => {
  setTimeout(() => {
    currentCard = getNextCard();
    sound.src = `./assets/mp3/${currentCard.mp3}`;
    sound.play();
  }, timeout);
}


const getNextCard = () => {
  if (currentCards.length > 0) {
    return currentCards.pop();
  } else {
    // alert('game over');
    sound.src = "./assets/mp3/winner.mp3";
    sound.play(); 
    stopGame();
  }
};

const runNewGame = () => {
  cardsDesk.changeGameStarted();
  currentCards = [...cardsDesk.cards];
  shuffle(currentCards);
  continueGame(0);
}


const repeatCurrentWord = () => {
  sound.src = `./assets/mp3/${currentCard.mp3}`;
  sound.play(); 
}


const clickStartButton = (e) => {
  if (!cardsDesk.isGameStarted) {
    $(".start-btn").classList.add("repeat");
    runNewGame();
  } else {
    repeatCurrentWord();
  }
}

$(".start-btn").addEventListener('click', clickStartButton);
