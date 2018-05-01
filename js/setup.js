'use strict';

(function () {

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

  var DEBOUNCE_TIME = 500;

  var mageItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var mageListElement = document.querySelector('.setup-similar-list');
  var setupElement = document.querySelector('.setup');
  var setupFormElement = setupElement.querySelector('.setup-wizard-form');
  var setupCoatElement = setupElement.querySelector('.wizard-coat');
  var setupCoatValElement = setupElement.querySelector('input[name=coat-color]');
  var setupEyesElement = setupElement.querySelector('.wizard-eyes');
  var setupEyesValElement = setupElement.querySelector('input[name=eyes-color]');
  var setupFireBallElement = setupElement.querySelector('.setup-fireball-wrap');
  var setupFireBallValElement = setupElement.querySelector('input[name=fireball-color]');
  var artifactsShopElement = setupElement.querySelector('.setup-artifacts-shop');
  var artifactsBagElement = setupElement.querySelector('.setup-artifacts');
  var artifact;
  var mages;
  var colorCoat;
  var colorEyes;
  var timerId;


  function getRandElem(arr) {
    var randomIndex = Math.random() * arr.length;
    randomIndex = Math.floor(randomIndex);

    return arr[randomIndex];
  }

  function shuffleArray(arr) {
    arr.sort(function () {
      return Math.random() - 0.5;
    });

    return arr;
  }

  function showMessage(message, color) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('error-mesage');
    messageElement.style.backgroundColor = color;
    messageElement.textContent = message;
    document.body.insertAdjacentElement('afterbegin', messageElement);

    setTimeout(function () {
      messageElement.parentElement.removeChild(messageElement);
    }, 3000);
  }

  function createMageDOMElement(data) {
    var mage = mageItemTemplate.cloneNode(true);
    mage.querySelector('.setup-similar-label').textContent = data.name;
    mage.querySelector('.wizard-coat').style.fill = data.colorCoat;
    mage.querySelector('.wizard-eyes').style.fill = data.colorEyes;

    return mage;
  }

  function insertDOMElements(data) {
    if (data) {
      mages = data;
      shuffleArray(mages);
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAGES_AMOUNT; i++) {
      var mage = createMageDOMElement(mages[i]);
      fragment.appendChild(mage);
    }
    mageListElement.innerHTML = '';
    mageListElement.appendChild(fragment);
  }

  function debounce(cb) {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(cb, DEBOUNCE_TIME);
  }

  function renderSimilarMage() {
    mages.forEach(function (elem) {
      elem.rating = 0;
      if (elem.colorCoat === colorCoat) {
        elem.rating += 2;
      }
      if (elem.colorEyes === colorEyes) {
        elem.rating += 1;
      }
    });
    mages.sort(function (a, b) {
      return b.rating - a.rating;
    });

    insertDOMElements();
  }

  function onLoadSuccess(message) {
    showMessage(message, 'green');
  }

  function onLoadError(message) {
    showMessage(message, 'red');
  }

  function onSaveSuccess(message) {
    window.dialog.close();
    showMessage(message, 'green');
  }

  function onSaveError(message) {
    showMessage(message, 'red');
  }

  function onSetupEyesClick() {
    colorEyes = getRandElem(EYES_COLORS);
    setupEyesElement.style.fill = colorEyes;
    setupEyesValElement.value = colorEyes;
    debounce(renderSimilarMage);
  }

  function onSetupFireBallClick() {
    var color = getRandElem(FIREBALL_COLORS);
    setupFireBallElement.style.backgroundColor = color;
    setupFireBallValElement.value = color;
  }

  function onSetupCoatClick() {
    colorCoat = getRandElem(COAT_COLORS);
    setupCoatElement.style.fill = colorCoat;
    setupCoatValElement.value = colorCoat;
    debounce(renderSimilarMage);
  }

  function onSetupFormSubmit(e) {
    e.preventDefault();
    var formData = new FormData(setupFormElement);
    window.backend.save(formData, onSaveSuccess, onSaveError);
  }

  function onArtifactsShopDragstart(e) {
    artifact = e.target.cloneNode();
    artifactsBagElement.style.outline = '2px dashed red';
  }

  function onArtifactsShopDragend() {
    artifactsBagElement.style.outline = '';
  }

  function onArtifactsBagDragstart(e) {
    artifact = e.target;
    artifactsBagElement.style.outline = '2px dashed red';
  }

  function onArtifactsBagDragend() {
    artifactsBagElement.style.outline = '';
  }

  function onArtifactsBagDragenter(e) {
    var target = e.target;
    if (!target.closest('.setup-artifacts-cell').firstChild) {
      target.style.backgroundColor = 'yellow';
    }
  }

  function onArtifactsBagDragleave(e) {
    var target = e.target;
    target.style.backgroundColor = '';
  }

  function onArtifactsBagDragover(e) {
    e.preventDefault();
  }

  function onArtifactsBagDrop(e) {
    e.preventDefault();
    var target = e.target;

    artifactsBagElement.style.outline = '';
    target.style.backgroundColor = '';

    if (!target.closest('.setup-artifacts-cell').firstChild) {
      e.target.appendChild(artifact);
    }
  }


  setupFormElement.addEventListener('submit', onSetupFormSubmit);
  setupEyesElement.addEventListener('click', onSetupEyesClick);
  setupFireBallElement.addEventListener('click', onSetupFireBallClick);
  setupCoatElement.addEventListener('click', onSetupCoatClick);
  artifactsShopElement.addEventListener('dragstart', onArtifactsShopDragstart);
  artifactsShopElement.addEventListener('dragend', onArtifactsShopDragend);
  artifactsBagElement.addEventListener('dragstart', onArtifactsBagDragstart);
  artifactsBagElement.addEventListener('dragend', onArtifactsBagDragend);
  artifactsBagElement.addEventListener('dragenter', onArtifactsBagDragenter);
  artifactsBagElement.addEventListener('dragleave', onArtifactsBagDragleave);
  artifactsBagElement.addEventListener('dragover', onArtifactsBagDragover);
  artifactsBagElement.addEventListener('drop', onArtifactsBagDrop);


  document.querySelector('.setup-similar').classList.remove('hidden');

  window.insertDOMElements = insertDOMElements;

  window.backend.load(onLoadSuccess, onLoadError);

})();

