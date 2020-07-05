(function () {
  var socket = 0;
  var socketTimeout = 0;
  function openSocket(conf) {
    socket = new WebSocket(conf.url);
    if(conf.open) {
      f(socket).on('open', conf.open);
    }
    if(conf.message) {
      f(socket).on('message', conf.message);
    }
    if(conf.close) {
      f(socket).on('close', conf.close);
      return;
    }
    if(conf.error) {
      f(socket).on('error', conf.error);
      return;
    }
    f(socket).on('error', function(event) {
      clearTimeout(socketTimeout);
      socketTimeout = setTimeout(function() {
        openSocket(conf);
      },1000)
    });
    f(socket).on('close', function(event) {
      clearTimeout(socketTimeout);
      socketTimeout = setTimeout(function() {
        openSocket(conf);
      },1000)
    });
  }
  f().prototype().socket = function (conf) {
    openSocket(conf);
    return this;
  };
})();