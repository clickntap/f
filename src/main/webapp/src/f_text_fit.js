(function () {
  console.log('a')
  function textFit() {
    f('.f-text').each(function(container) {
      var text = f(container).find('.f-text-fit').item;
      var fontSize = 100;
      text.style.fontSize = fontSize+'%';
      var textRect = text.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();
      while(textRect.height > containerRect.height) {
        fontSize -= 1;
        text.style.fontSize = fontSize+'%';
        textRect = text.getBoundingClientRect();
        containerRect = container.getBoundingClientRect();
      }
    });
  }
  f(window).on('resize', function(){
    textFit();
  });
  f().uiOnReadyPlugins().push(textFit);
})();