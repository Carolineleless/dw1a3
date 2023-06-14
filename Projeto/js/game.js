const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  { name: 'sage', sound: 'sage.mp3' },
  { name: 'skye', sound: 'skye.mp3' },
  { name: 'brimstone', sound: 'brimstone.mp3' },
  { name: 'cypher', sound: 'cypher.mp3' },
  { name: 'raze', sound: 'raze.mp3' },
  { name: 'neon', sound: 'neon.mp3' }
];

const audioPath = '../sound/';

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 12) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}segundos. `);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    const characterObj = characters.find((character) => character.name === firstCharacter);
    playSound(characterObj.sound);

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    setTimeout(() => {
      checkEndGame(); 
    }, 100);
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character.name}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character.name);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  let currentTime = 0;
  const interval = setInterval(() => {
    currentTime++;
    timer.innerHTML = currentTime;
  }, 1000);

  return interval;
};

const playSound = (sound) => {
  const audio = new Audio(`${audioPath}${sound}`);
  audio.play();
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  const loop = startTimer();
  loadGame();
};
