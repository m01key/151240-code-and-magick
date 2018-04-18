'use strict';

var setupElement = document.querySelector('.setup');
var setupUserPicElement = setupElement.querySelector('.setup-user-pic');
var artifactsShopElement = setupElement.querySelector('.setup-artifacts-shop');
var artifactsElement = setupElement.querySelector('.setup-artifacts');
var artifact;


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

artifactsShopElement.addEventListener('dragstart', function (e) {
  artifact = e.target.cloneNode();
});

artifactsElement.addEventListener('dragstart', function (e) {
  artifact = e.target;
});

artifactsElement.addEventListener('dragenter', function (e) {
  var target = e.target;

  if (!target.closest('.setup-artifacts-cell').firstChild) {
    artifactsElement.style.outline = '2px dashed red';
    target.style.backgroundColor = 'yellow';
  }
});

artifactsElement.addEventListener('dragleave', function (e) {
  var target = e.target;

  artifactsElement.style.outline = '';
  target.style.backgroundColor = '';
});

artifactsElement.addEventListener('dragover', function (e) {
  e.preventDefault();
});

artifactsElement.addEventListener('drop', function (e) {
  var target = e.target;

  artifactsElement.style.outline = '';
  target.style.backgroundColor = '';

  if (!target.closest('.setup-artifacts-cell').firstChild) {
    e.target.appendChild(artifact);
  }
});

