'use strict';

(function () {

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


  var mageItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var mageListElement = document.querySelector('.setup-similar-list');
  var setupElement = document.querySelector('.setup');
  var setupCoatElement = setupElement.querySelector('.wizard-coat');
  var setupCoatValElement = setupElement.querySelector('input[name=coat-color]');
  var setupEyesElement = setupElement.querySelector('.wizard-eyes');
  var setupEyesValElement = setupElement.querySelector('input[name=eyes-color]');
  var setupFireBallElement = setupElement.querySelector('.setup-fireball-wrap');
  var setupFireBallValElement = setupElement.querySelector('input[name=fireball-color]');
  var artifactsShopElement = setupElement.querySelector('.setup-artifacts-shop');
  var artifactsElement = setupElement.querySelector('.setup-artifacts');
  var artifact;


  function getRandElem(arr) {
    var randomIndex = Math.random() * arr.length;
    randomIndex = Math.floor(randomIndex);

    return arr[randomIndex];
  }

  /**
   * Создает магов
   * @return {array} - Массив из MAGES_AMOUNT магов
   */
  function createMages() {
    var mages = [];

    for (var i = 0; i < MAGES_AMOUNT; i++) {
      mages[i] = {
        name: getRandElem(FIRST_NAMES) + ' ' + getRandElem(LAST_NAMES),
        coatColor: getRandElem(COAT_COLORS),
        eyesColor: getRandElem(EYES_COLORS)
      };
    }

    return mages;
  }

  /**
   * Создает DOM-элемент мага
   * @param  {object} data - Данные для шаблона
   * @return {DOMElement}  - Маг
   */
  function createMageDOMElement(data) {
    var mage = mageItemTemplate.cloneNode(true);
    mage.querySelector('.setup-similar-label').textContent = data.name;
    mage.querySelector('.wizard-coat').style.fill = data.coatColor;
    mage.querySelector('.wizard-eyes').style.fill = data.eyesColor;

    return mage;
  }

  /**
   * Создает DOM-элементы магов и вставляет в разметку
   * @param  {array} data - Данные для шаблона
   */
  function insertDOMElements(data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var mage = createMageDOMElement(data[i]);
      fragment.appendChild(mage);
    }

    mageListElement.appendChild(fragment);
  }


  setupEyesElement.addEventListener('click', function () {
    var color = getRandElem(EYES_COLORS);
    setupEyesElement.style.fill = color;
    setupEyesValElement.value = color;
  });

  setupFireBallElement.addEventListener('click', function () {
    var color = getRandElem(FIREBALL_COLORS);
    setupFireBallElement.style.backgroundColor = color;
    setupFireBallValElement.value = color;
  });

  setupCoatElement.addEventListener('click', function () {
    var color = getRandElem(COAT_COLORS);
    setupCoatElement.style.fill = color;
    setupCoatValElement.value = color;
  });

  artifactsShopElement.addEventListener('dragstart', function (e) {
    artifact = e.target.cloneNode();
    artifactsElement.style.outline = '2px dashed red';
  });

  artifactsShopElement.addEventListener('dragend', function () {
    artifactsElement.style.outline = '';
  });

  artifactsElement.addEventListener('dragstart', function (e) {
    artifact = e.target;
    artifactsElement.style.outline = '2px dashed red';
  });

  artifactsElement.addEventListener('dragend', function () {
    artifactsElement.style.outline = '';
  });

  artifactsElement.addEventListener('dragenter', function (e) {
    var target = e.target;

    if (!target.closest('.setup-artifacts-cell').firstChild) {
      target.style.backgroundColor = 'yellow';
    }
  });

  artifactsElement.addEventListener('dragleave', function (e) {
    var target = e.target;

    target.style.backgroundColor = '';
  });

  artifactsElement.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  artifactsElement.addEventListener('drop', function (e) {
    e.preventDefault();
    var target = e.target;

    artifactsElement.style.outline = '';
    target.style.backgroundColor = '';

    if (!target.closest('.setup-artifacts-cell').firstChild) {
      e.target.appendChild(artifact);
    }
  });


  document.querySelector('.setup-similar').classList.remove('hidden');

  var mages = createMages();
  insertDOMElements(mages);

})();

