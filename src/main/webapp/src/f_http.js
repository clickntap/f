(function () {
  var httpOnTimeout = 0;
  f().prototype().http = function (input) {
    if (!input.method) {
      input.method = 'GET';
    }
    var params = [];
    var r20 = /%20/g;
    function addParam(key, value) {
      value = typeof (value) === 'function' ? value() : (value == null ? "" : value);
      params[params.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }
    function httpEnd() {
      httpRequest.onloadend = function () { };
      httpRequest.onerror = function () { };
      httpRequest.ontimeout = function () { };
      httpRequest.onprogress = function () { };
      httpRequest.onabort = function () { };
      httpOnTimeout = setTimeout(function () {
        f('http-off').emit({ url: input.url });
      }, 500);
    }
    function httpSetHeaders() {
      httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      if (input.headers instanceof Object) {
        f(Object.keys(input.headers)).each(function (key) {
          httpRequest.setRequestHeader(key, input.headers[key]);
        });
      }
    }
    var httpRequest = new XMLHttpRequest();
    httpRequest.onloadend = function (event) {
      httpEnd();
      if (event.target.status == 200) {
        try { input.onsuccess(event); }
        catch (err) { console.log(err, event); }
      } else {
        try { input.onerror(event); }
        catch (err) { console.log(err, event); }
      }
    }
    httpRequest.onerror = function (event) {
      httpEnd();
      try { input.onerror(event); }
      catch (err) { console.log(err, event); }
    }
    httpRequest.ontimeout = function (event) {
      httpEnd();
      try { input.ontimeout(event); }
      catch (err) { console.log(err, event); }
    }
    httpRequest.onabort = function (event) {
      httpEnd();
      try { input.onabort(event); }
      catch (err) { console.log(err, event); }
    }
    httpRequest.onprogress = function (event) {
      try { input.onprogress(event); }
      catch (err) { }
    }
    clearTimeout(httpOnTimeout);
    f('http-on').emit({ url: input.url });
    if (this.input instanceof Element && this.input.tagName.toLowerCase() == 'form') {
      var elements = this.input.elements;
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (!element.disabled) {
          if (element.type == 'radio' || element.type == 'checkbox') {
            if (element.checked) {
              addParam(element.name, element.value);
            }
          } else {
            addParam(element.name, element.value);
          }
        }
      }
      if (input.params instanceof Object) {
        f(Object.keys(input.params)).each(function (key) {
          addParam(key, input.params[key]);
        });
      }
      var url;
      try {
        url = new URL(input.url);
      } catch (err) {
        if (input.url.indexOf('http') > 0) {
          url = new URL(input.url);
        } else {
          var pathname = document.location.pathname;
          pathname = pathname.substring(0, pathname.indexOf('/web.app'));
          if (pathname.charAt(0) == '/') pathname = pathname.substring(1);
          if(pathname != '') {
            pathname += '/';
          }
          url = new URL(document.location.protocol + '//' + document.location.host + '/' + pathname + input.url);
          //console.log(url);
        }
      }
      httpRequest.open(input.method, url);
      httpSetHeaders();
      httpRequest.timeout = input.timeout ? input.timeout : 0;
      httpRequest.send(params.join("&").replace(r20, "+"));
    } else if (this.input instanceof Object) {
      var url;
      try {
        url = new URL(input.url);
      } catch (err) {
        if (input.url.indexOf('http') > 0) {
          url = new URL(input.url);
        } else {
          var pathname = document.location.pathname;
          pathname = pathname.substring(0, pathname.indexOf('/web.app'));
          if (pathname.charAt(0) == '/') pathname = pathname.substring(1);
          if(pathname != '') {
            pathname += '/';
          }
          url = new URL(document.location.protocol + '//' + document.location.host + '/' + pathname + input.url);
        }
      }
      if (input.params instanceof Object) {
        f(Object.keys(input.params)).each(function (key) {
          url.searchParams.set(key, input.params[key]);
        });
      }
      httpRequest.open(input.method, url);
      httpSetHeaders();
      httpRequest.timeout = input.timeout ? input.timeout : 0;
      httpRequest.send(JSON.stringify(this.input));
    } else {
      if (input.method.toLowerCase() == 'get') {
        var url;
        try {
          url = new URL(input.url);
        } catch (err) {
          if (input.url.indexOf('http') > 0) {
            url = new URL(input.url);
          } else {
            var baseURL = document.location.protocol + '//' + document.location.host;
            url = new URL(baseURL + '/' + input.url);
          }
        }
        if (input.params instanceof Object) {
          f(Object.keys(input.params)).each(function (key) {
            url.searchParams.set(key, input.params[key]);
          });
        }
        httpRequest.open(input.method, url);
        httpSetHeaders();
        httpRequest.timeout = input.timeout ? input.timeout : 0;
        httpRequest.send();
      }
      if (input.method.toLowerCase() == 'post') {
        if (Array.isArray(input.params)) {
          f(input.params).each(function (item) {
            addParam(item.name, item.value);
          });
        } else {
          if (input.params instanceof Object) {
            f(Object.keys(input.params)).each(function (key) {
              addParam(key, input.params[key]);
            });
          }
        }
        httpRequest.open(input.method, input.url);
        httpSetHeaders();
        httpRequest.timeout = input.timeout ? input.timeout : 0;
        httpRequest.send(params.join("&").replace(r20, "+"));
      }
    }
    return this;
  };
  function ascii7(text) {
    var ascii7text = '';
    for (var i = 0; i < text.length; i++) {
      var charCode = text.codePointAt(i);
      if (charCode < 127) {
        ascii7text += String.fromCodePoint(charCode);
      } else {
        var c = String.fromCodePoint(charCode);
        i += (c.length - 1);
        ascii7text += ('&#' + charCode + ';');
      }
    }
    return ascii7text;
  }
})();