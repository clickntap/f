(function () {
  var app = {
  };
  var _session = JSON.parse(sessionStorage.getItem('session'));
  if(!_session) {
    _session = {
    };
  }
  var session = _session;
  try {
    session = new Proxy(_session, {
      set: function(target, prop, value) {
        var result = Reflect.set(target, prop, value);
        sessionStorage.setItem('session',JSON.stringify(target));
        return result;
      },
      deleteProperty: function (target, prop) {
        var result = Reflect.deleteProperty(target, prop);
        sessionStorage.setItem('session', JSON.stringify(target));
        return result;
      }
    });
  } catch (err) {
  }
  app.session = session;
  app.set = function(name, value) {
    var path = name.split('.');
    var target = app.session;
    for(var i=0;i<path.length;i++) {
      if(i<path.length-1) {
        var o = target[path[i]];
        if(!o) {
          target = target[path[i]] = {};
        } else {
          target = o;
        }
      } else {
        target = target[path[i]] = value;
      }
    }
    app.session.t = new Date().getTime();
  }
  app.clear = function(name) {
    if(!name) {
      for (a in app.session) {
        delete app.session[a];
      }
    } else {
      app.set(name);
    }
  }
  app.get = function (name, defaultValue) {
    var path = name.split('.');
    var target = app.session;
    var value;
    for(var i=0;i<path.length;i++) {
      if(i<path.length-1) {
        var o = target[path[i]];
        if(!o) {
          target = target[path[i]] = {};
        } else {
          target = o;
        }
      } else {
        value = target[path[i]];
      }
    }
    if(value == undefined) {
      value = defaultValue;
      app.set(name, value);
    }
    return value;
  }
  f().prototype().app = function () {
    return app;
  };
  f().prototype().appSession = function () {
    return JSON.parse(JSON.stringify(app.session));
  };
})();