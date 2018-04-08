'use strict';

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var mageList = document.querySelector('.setup-similar-list');
var mageItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var firstName = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var lastName = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandElem = function (arr) {
  var randomIndex = Math.random() * arr.length;
  randomIndex = Math.floor(randomIndex);

  return arr[randomIndex];
};

/**
 * Создает мага
 * @param  {array} arrName     - Имена
 * @param  {array} arrLastName - Фамилии
 * @param  {array} arrCoat     - Пальто
 * @param  {array} arrEyes     - Глаза
 * @param  {number} amount     - Количество магов
 * @return {array}             - Массив из магов
 */
var createMages = function (arrName, arrLastName, arrCoat, arrEyes, amount) {
  var mages = [];

  for (var i = 0; i < amount; i++) {
    mages[i] = {
      name: getRandElem(arrName) + ' ' + getRandElem(arrLastName),
      coatColor: getRandElem(arrCoat),
      eyesColor: getRandElem(arrEyes)
    };
  }

  return mages;
};

/**
 * Создает DOM-элемент мага
 * @param  {object} data         - Данные для шаблона
 * @param  {DOMElement} template - Шаблон
 * @return {DOMElement}          - Маг
 */
var createMageDOMElement = function (data, template) {
  var mage = template.cloneNode(true);
  mage.querySelector('.setup-similar-label').textContent = data.name;
  mage.querySelector('.wizard-coat').style.fill = data.coatColor;
  mage.querySelector('.wizard-eyes').style.fill = data.eyesColor;

  return mage;
};

/**
 * Создает DOM-элементы магов и вставляет в разметку
 * @param  {array} data          - Данные для шаблона
 * @param  {DOMElement} template - Шаблон
 * @param  {DOMElement} where    - Место вставки
 */
var insertDOMElements = function (data, template, where) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    var mage = createMageDOMElement(data[i], template);
    fragment.appendChild(mage);
  }

  where.appendChild(fragment);
};


var mages = createMages(firstName, lastName, coatColor, eyesColor, 4);
insertDOMElements(mages, mageItemTemplate, mageList);

