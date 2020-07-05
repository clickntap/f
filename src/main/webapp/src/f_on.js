(function () {
  f().prototype().on = function (what, callback, replace) {
    this.each(function (item) {
      var currentOn = item['on'+what];
      item['on'+what] = function(event) {
        if (typeof currentOn === 'function' && !replace) { currentOn(event); }
        callback(event);
      }
    });
    return this;
  };
})();