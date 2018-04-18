'use strict';

var setupElement = document.querySelector('.setup');
var setupUserPicElement = setupElement.querySelector('.setup-user-pic');


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

