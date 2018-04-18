'use strict';

var KEY_ENTER = 13;
var KEY_ESC = 27;

var setupElement = document.querySelector('.setup');
var setupUserPicElement = setupElement.querySelector('.setup-user-pic');
var avatarElement = document.querySelector('.setup-open');
var avatarImgElement = avatarElement.querySelector('.setup-open-icon');
var setupCrossElement = setupElement.querySelector('.setup-close');
var setupUserNameElement = setupElement.querySelector('.setup-user-name');


function openSetup() {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
}

function closeSetup() {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
  setupElement.style.left = '';
  setupElement.style.top = '';
}

function onEscKeydown(e) {
  if (e.keyCode === KEY_ESC) {
    closeSetup();
  }
}


setupUserPicElement.addEventListener('mousedown', function (e) {
  e.preventDefault();

  var coordsStart = {
    left: e.clientX,
    top: e.clientY
  };

  function onMouseMove(evt) {
    var left = setupElement.offsetLeft;
    var top = setupElement.offsetTop;

    var coordsEnd = {
      left: evt.clientX,
      top: evt.clientY
    };

    var shift = {
      left: coordsEnd.left - coordsStart.left,
      top: coordsEnd.top - coordsStart.top
    };

    setupElement.style.left = left + shift.left + 'px';
    setupElement.style.top = top + shift.top + 'px';

    coordsStart = {
      left: coordsEnd.left,
      top: coordsEnd.top
    };
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousemove', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

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


