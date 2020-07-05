var f = (function () {
  var F = function (input, parent) {
    if (!input) return;
    this.input = input;
    if(typeof input === 'string') {
      try {
        this.items = (parent?parent:document).querySelectorAll(input);
      } catch(err) {
        this.items = [input];
      }
    } else if(Array.isArray(input)) {
      this.items = input;
    } else if(typeof input === 'object') {
      this.items = [input];
    }
    Object.defineProperty(this, 'item', {
      get: function () {
        return this.items[0];
      }
    });
  };
  F.prototype.prototype = function() {
    return F.prototype;
  }
  var _f = function (input, parent) {
    return new F(input, parent);
  };
  return _f;
})();

f().prototype().each = function (callback) {
  if (!callback || typeof callback !== 'function' || !this.items) return;
  for (var i = 0; i < this.items.length; i++) {
    callback(this.items[i], i);
  }
  return this;
};