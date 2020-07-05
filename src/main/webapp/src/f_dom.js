(function () {
  f().prototype().each = function (callback) {
    if (!callback || typeof callback !== 'function' || !this.items) return;
    for (var i = 0; i < this.items.length; i++) {
      callback(this.items[i], i);
    }
    return this;
  };
  f().prototype().closest = function (selector) {
    return f(this.item.closest(selector));
  };
  f().prototype().find = function(selector) {
    return f(selector, this.items[0]);
  };
  f().prototype().html = function (html) {
    var result = this;
    this.each(function (item) {
      if(html === undefined) {
        result = item.innerHTML;
      } else {
        item.innerHTML = html
      }
    });
    return result;
  };
  f().prototype().text = function (html) {
    var result = this;
    this.each(function (item) {
      if(html === undefined) {
        result = item.innerText;
      } else {
        item.innerText = html
      }
    });
    return result;
  };
  f().prototype().id = function () {
    return 'id_'+Math.random().toString(36).substr(2, 9);
  };
})();