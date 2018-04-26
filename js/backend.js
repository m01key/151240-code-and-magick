'use strict';

(function () {

  function load(onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data?callback=insertDOMElements';
    var script = document.createElement('script');

    script.addEventListener('load', function () {
      onLoad('Маги загрузились успешно');
    });
    script.addEventListener('error', function () {
      onError('Возникла ошибка при загрузке магов');
    });

    script.src = URL;
    document.body.append(script);
  }

  function save(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();

    xhr.timeout = 5000;

    xhr.addEventListener('load', function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        onLoad('Данные отправлены успешно');
      } else {
        onError('Данные не отправлены, ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Данные не отправлены, обрыв соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Время ожидания отклика от сервера превысило ' + (xhr.timeout / 1000) + ' секунд');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }


  window.backend = {
    load: load,
    save: save
  };

})();

