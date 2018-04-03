'use strict';

window.renderStatistics = function (ctx, names, times) {

  // константы
  var FONT_HEIGHT = 20;
  var BAR_CHART = 150;
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = BAR_CHART - FONT_HEIGHT;
  var BAR_GAP = 50;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_PADDING_WIDTH = 55;
  var CLOUD_PADDING_HEIGHT = 30;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_ANGLE = 20;

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

  // белая плашка с тайтлом
  ctx.save();
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(CLOUD_X, CLOUD_Y);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH - CLOUD_ANGLE, CLOUD_Y);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH, CLOUD_Y + CLOUD_ANGLE);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH, CLOUD_Y + CLOUD_HEIGHT - CLOUD_ANGLE);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH - CLOUD_ANGLE, CLOUD_Y + CLOUD_HEIGHT);
  ctx.lineTo(CLOUD_X + CLOUD_ANGLE, CLOUD_Y + CLOUD_HEIGHT);
  ctx.lineTo(CLOUD_X, CLOUD_Y + CLOUD_HEIGHT - CLOUD_ANGLE);
  ctx.lineTo(CLOUD_X, CLOUD_Y + CLOUD_ANGLE);
  ctx.lineTo(CLOUD_X + CLOUD_ANGLE, CLOUD_Y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.font = 'PT Mono 16px';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('Ура вы победили!', CLOUD_WIDTH / 2 + CLOUD_X, CLOUD_PADDING_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_WIDTH / 2 + CLOUD_X, CLOUD_PADDING_HEIGHT + FONT_HEIGHT);

  // гистограмма
  ctx.textBaseline = 'alphabetic';
  var maxTime = getMaxElem(times);

  for (var i = 0; i < names.length; i++) {

    var time = Math.round(times[i]);
    var barHeight = time * BAR_MAX_HEIGHT / maxTime;
    var barMarginTop = BAR_MAX_HEIGHT - barHeight;

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, ' + getRandomInt(80, 176) + ')';
    }

    ctx.fillRect(CLOUD_X + CLOUD_PADDING_WIDTH + (BAR_WIDTH + BAR_GAP) * i, CLOUD_PADDING_HEIGHT + barMarginTop + FONT_HEIGHT * 4, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(time, CLOUD_X + CLOUD_PADDING_WIDTH + BAR_WIDTH / 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_PADDING_HEIGHT + FONT_HEIGHT * 3 + 10);
    ctx.fillText(names[i], CLOUD_X + CLOUD_PADDING_WIDTH + BAR_WIDTH / 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_PADDING_HEIGHT + BAR_MAX_HEIGHT + FONT_HEIGHT * 5);

  }

};
