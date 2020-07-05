(function () {
  f().prototype().addClass = function (className) {
    this.each(function (item) {
      item.offsetHeight;
      item.classList.add(className);
    });
    return this;
  };
  f().prototype().removeClass = function (className) {
    this.each(function (item) {
      item.offsetHeight;
      item.classList.remove(className);
    });
    return this;
  };
  f().prototype().toggleClass = function (className) {
    this.each(function (item) {
      item.offsetHeight;
      item.classList.toggle(className);
    });
    return this;
  };
  f().prototype().hasClass = function (className) {
    return this.item.classList.contains(className);
  };
})();