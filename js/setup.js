'use strict';

// КОНСТАНТЫ
var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var MAGES_AMOUNT = 4;

var KEY_ENTER = 13;
var KEY_ESC = 27;


// ПЕРЕМЕННЫЕ (пути)
var mageListElement = document.querySelector('.setup-similar-list');
var mageItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupElement = document.querySelector('.setup');
var avatarElement = document.querySelector('.setup-open');
var avatarImgElement = avatarElement.querySelector('.setup-open-icon');
var setupCrossElement = setupElement.querySelector('.setup-close');
var setupUserNameElement = setupElement.querySelector('.setup-user-name');
var setupEyesElement = setupElement.querySelector('.setup-wizard .wizard-eyes');
var setupEyesValElement = setupElement.querySelector('input[name=eyes-color]');
var setupFireBallElement = setupElement.querySelector('.setup-fireball-wrap');
var setupFireBallValElement = setupElement.querySelector('input[name=fireball-color]');


// ФУНКЦИИ
var getRandElem = function (arr) {
  var randomIndex = Math.random() * arr.length;
  randomIndex = Math.floor(randomIndex);

  return arr[randomIndex];
};

/**
 * Создает мага
 * @return {array} - Массив из MAGES_AMOUNT магов
 */
var createMages = function () {
  var mages = [];

  for (var i = 0; i < MAGES_AMOUNT; i++) {
    mages[i] = {
      name: getRandElem(FIRST_NAMES) + ' ' + getRandElem(LAST_NAMES),
      coatColor: getRandElem(COAT_COLORS),
      eyesColor: getRandElem(EYES_COLORS)
    };
  }

  return mages;
};

/**
 * Создает DOM-элемент мага
 * @param  {object} data - Данные для шаблона
 * @return {DOMElement}  - Маг
 */
var createMageDOMElement = function (data) {
  var mage = mageItemTemplate.cloneNode(true);
  mage.querySelector('.setup-similar-label').textContent = data.name;
  mage.querySelector('.wizard-coat').style.fill = data.coatColor;
  mage.querySelector('.wizard-eyes').style.fill = data.eyesColor;

  return mage;
};

/**
 * Создает DOM-элементы магов и вставляет в разметку
 * @param  {array} data - Данные для шаблона
 */
var insertDOMElements = function (data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    var mage = createMageDOMElement(data[i]);
    fragment.appendChild(mage);
  }

  mageListElement.appendChild(fragment);
};

var onEscKeydown = function (e) {
  if (e.keyCode === KEY_ESC) {
    closeSetup();
  }
};

var closeSetup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
};

var openSetup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
};


// СОБЫТИЯ
avatarElement.addEventListener('click', openSetup);
avatarImgElement.addEventListener('keydown', function (e) {
  if (e.keyCode === KEY_ENTER) {
    openSetup();
  }
});

setupCrossElement.addEventListener('click', closeSetup);
setupCrossElement.addEventListener('keydown', function (e) {
  if (e.keyCode === KEY_ENTER) {
    closeSetup();
  }
});

setupUserNameElement.addEventListener('keydown', function (e) {
  e.stopPropagation();
});

setupEyesElement.addEventListener('click', function (e) {
  e.target.style.fill = getRandElem(EYES_COLORS);
  setupEyesValElement.value = e.target.style.fill;
});

setupFireBallElement.addEventListener('click', function (e) {
  e.target.style.backgroundColor = getRandElem(FIREBALL_COLORS);
  setupFireBallValElement.value = e.target.style.backgroundColor;
});


// ВЫПОЛНЕНИЕ
document.querySelector('.setup-similar').classList.remove('hidden');
var mages = createMages();
insertDOMElements(mages);

