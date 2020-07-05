(function () {
  var api = {};
  f().prototype().api = function (input, channel) {
    if(!channel) {
      channel = 'web';
    }
    if(typeof input == 'function') {
      var headers = {};
      if(api.k) {
        var token = {t:new Date().getTime(),token:localStorage.getItem(channel)};
        f(JSON.stringify(token)).apiEncrypt(function(base64) {
          headers.token = localStorage.getItem(channel);
          headers.sign = base64;
          input(headers);
        });
      } else {
        input(headers);
      }
    } else if(input && input.uri && input.uri.indexOf('handshake') > 0) {
      if(input.uri.indexOf('http') != 0) {
        if(input.uri.indexOf('/') != 0) {
          input.uri = '/'+input.uri;
        }
      }
      crypto.subtle.generateKey({name:'ECDH',namedCurve:'P-256'},true,['deriveKey']).then(function(key) {
        crypto.subtle.exportKey('raw',key.publicKey).then(function(bytes) {
          f().http({
            method:'POST',
            url:input.uri,
            onsuccess:function(event) {
              var json = JSON.parse(event.target.responseText);
              localStorage.setItem(input.channel,json.d);
              crypto.subtle.importKey('spki', base64ToArrayBuffer(json.k), {name:'ECDH',namedCurve:'P-256'},true,[]).then(function(publicKey) {
                crypto.subtle.deriveKey({name:'ECDH','public':publicKey},key.privateKey,{name:'AES-CTR',length:256},false,['encrypt','decrypt']).then(function(secretKey) {
                  api.k = secretKey;
                  api.t = json.t;
                  api.u = json.u;
                  input.onsuccess();
                });
              });
            },
            params:{k:arrayBufferToBase64(bytes),t:new Date().getTime(),d:localStorage.getItem(input.channel),c:input.channel}
          });
        });
      });
    } else {
      var json = {authenticated:api.u};
      return json;
    }
    return this;
  };
  f().prototype().decodeBase64 = function () {
    return arrayBufferToString(base64ToArrayBuffer(this.input));
  }
  f().prototype().encodeBase64 = function () {
    return arrayBufferToBase64(stringToArrayBuffer(this.input));
  }
  function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa(binary);
  }
  function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
  function stringToArrayBuffer(str){
    var arr = new Uint8Array(str.length);
    for(var i=str.length; i--; )
    arr[i] = str.charCodeAt(i);
    return arr.buffer;
  }
  function arrayBufferToString(buffer){
    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    return str;
  }
  f().prototype().apiDecrypt = function (callback) {
    crypto.subtle.decrypt(
    {name:'AES-CTR',length:128,counter:new Uint8Array([0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f])},
    api.k,
    base64ToArrayBuffer(this.input)
    ).then(function(bytes) {
      callback(arrayBufferToString(bytes));
    });
    return this;
  };
  f().prototype().apiEncrypt = function (callback) {
    crypto.subtle.encrypt(
    {name:'AES-CTR',length:128,counter:new Uint8Array([0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f])},
    api.k,
    stringToArrayBuffer(this.input)
    ).then(function(bytes) {
      callback(arrayBufferToBase64(bytes));
    });
    return this;
  };
})();