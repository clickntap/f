(function () {
  f().prototype().addClass = function (className) {
    this.each(function (item) {
      item.offsetHeight;
      item.classList.add(className);
    });
    return this;
  };
})();
