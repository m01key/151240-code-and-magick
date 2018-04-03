'use strict';

window.renderStatistics = function (ctx, names, times) {

  // константы
  var FONT = 'PT Mono 16px';
  var FONT_HEIGHT = 20;
  var BAR_CHART = 150;
  var BAR_MAX_HEIGHT = BAR_CHART - FONT_HEIGHT;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var BAR_REPEAT = BAR_WIDTH + BAR_GAP;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_PADDING_WIDTH = 55;
  var CLOUD_PADDING_HEIGHT = 30;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_ANGLE = 20;
  var CLOUD_CENTER_X = CLOUD_WIDTH / 2 + CLOUD_X;
  var CLOUD_START_X = CLOUD_X + CLOUD_PADDING_WIDTH;

  // функции
  var getMaxElem = function (arr) {
    var max = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var drawCloud = function(x, y, width, height, angle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width - angle, y);
    ctx.lineTo(x + width, y + angle);
    ctx.lineTo(x + width, y + height - angle);
    ctx.lineTo(x + width - angle, y + height);
    ctx.lineTo(x + angle, y + height);
    ctx.lineTo(x, y + height - angle);
    ctx.lineTo(x, y + angle);
    ctx.lineTo(x + angle, y);
    ctx.closePath();
    ctx.fill();
  };

  var drawText = function(text, x, y, font, hAlign, vAlign, color) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = hAlign;
    ctx.textBaseline = vAlign;
    ctx.fillText(text, x, y);
  };

  var drawBar = function(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  // облако
  drawCloud(CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_ANGLE, 'rgba(0, 0, 0, 0.7)');
  drawCloud(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_ANGLE, '#fff');

  // тайтл
  drawText('Ура вы победили!', CLOUD_CENTER_X, CLOUD_PADDING_HEIGHT, FONT, 'center', 'top', '#000');
  drawText('Список результатов:', CLOUD_CENTER_X, CLOUD_PADDING_HEIGHT + FONT_HEIGHT, FONT, 'center', 'top', '#000');

  // гистограмма
  var maxTime = getMaxElem(times);
  var barColor;

  for (var i = 0; i < names.length; i++) {
    var time = Math.round(times[i]);
    var barHeight = time * BAR_MAX_HEIGHT / maxTime;
    var barMarginTop = BAR_MAX_HEIGHT - barHeight;
    barColor = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, ' + getRandomInt(80, 176) + ')';

    drawBar(CLOUD_START_X + BAR_REPEAT * i, CLOUD_PADDING_HEIGHT + barMarginTop + FONT_HEIGHT * 4, BAR_WIDTH, barHeight, barColor);
    drawText(time, CLOUD_START_X + BAR_WIDTH / 2 + BAR_REPEAT * i, CLOUD_PADDING_HEIGHT + barMarginTop + FONT_HEIGHT * 3 + 10, FONT, 'center', 'alphabetic', '#000');
    drawText(names[i], CLOUD_START_X + BAR_WIDTH / 2 + BAR_REPEAT * i, CLOUD_PADDING_HEIGHT + BAR_MAX_HEIGHT + FONT_HEIGHT * 5, FONT, 'center', 'alphabetic', '#000');
  }

};
