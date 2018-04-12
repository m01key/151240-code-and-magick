'use strict';

document.querySelector('.setup-similar').classList.remove('hidden');

var mageList = document.querySelector('.setup-similar-list');
var mageItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

  mageList.appendChild(fragment);
};


var mages = createMages();
insertDOMElements(mages);


var setup = document.querySelector('.setup');
var avatar = document.querySelector('.setup-open');
var avatarImg = avatar.querySelector('.setup-open-icon');
var setupCross = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupEyesVal = setup.querySelector('input[name=eyes-color]');
var setupFireBall = setup.querySelector('.setup-fireball-wrap');
var setupFireBallVal = setup.querySelector('input[name=fireball-color]');

var onEscKeydown = function (e) {
  if (e.keyCode === KEY_ESC) {
    closeSetup();
  }
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
};

var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
};

avatar.addEventListener('click', openSetup);
avatarImg.addEventListener('keydown', function (e) {
  if (e.keyCode === KEY_ENTER) {
    openSetup();
  }
});

setupCross.addEventListener('click', closeSetup);
setupCross.addEventListener('keydown', function (e) {
  if (e.keyCode === KEY_ENTER) {
    closeSetup();
  }
});

setupUserName.addEventListener('keydown', function (e) {
  e.stopPropagation();
});

setupEyes.addEventListener('click', function (e) {
  e.target.style.fill = getRandElem(EYES_COLORS);
  setupEyesVal.value = e.target.style.fill;
});

setupFireBall.addEventListener('click', function (e) {
  e.target.style.backgroundColor = getRandElem(FIREBALL_COLORS);
  setupFireBallVal.value = e.target.style.backgroundColor;
});


