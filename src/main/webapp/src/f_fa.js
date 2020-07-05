(function () {
  var faBase = 'fal';
  f().prototype().fa = function (base) {
    if(!base) {
      return faBase;
    }
    faBase = base;
    return this;
  };
})();