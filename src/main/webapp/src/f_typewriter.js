(function(){
  var timeout = 0;
  f('typewriter').slot(function(data) {
    if(data.what == 'run') {
      f('.f-typewriter').each(function(item) {
        var texts = JSON.parse(item.dataset.texts);
        var i = parseInt(item.dataset.i);
        var t = parseFloat(item.dataset.t)+0.05;
        item.dataset.t = t;
        if(texts[i]) {
          var currentText = item.innerHTML;
          var text = texts[i];
          var x = parseInt(item.dataset.x)+parseInt(item.dataset.d);
          item.dataset.x = x;
          if(x > text.length+26) {
            if(parseInt(item.dataset.d) == 1) {
              item.dataset.d = -1;
            }
          }
          if(x <= -6) {
            if(parseInt(item.dataset.d) == -1) {
              item.dataset.i = (i+1)%texts.length;
              item.dataset.x = -6;
              item.dataset.d = 1;
            }
          }
          if(t > 0.5) {
            f(item).html(''+text.substring(0,x)+'<span class="f-typewriter-cursor off">|</span>');
          } else {
            f(item).html(''+text.substring(0,x)+'<span class="f-typewriter-cursor">|</span>');
          }
          if(t > 1) {
            item.dataset.t = 0;
          }
        }
      });
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        f('typewriter').emit({what:'run'});
      }, 50);
    }
  });
  var plugin = function (resolve, context) {
    f(context.div).find('.f_typewriter').each(function(item){
      var texts = [];
      f(item).find('div').each(function(div) {
        texts.push(div.innerText);
      });
      item.dataset.texts = JSON.stringify(texts);
      item.dataset.i = 0;
      item.dataset.d = 1;
      item.dataset.x = -3;
      item.dataset.t = 0;
      f(item).html('&nbsp;')
      f(item).removeClass('f_typewriter').addClass('f-typewriter');
    });
    f('typewriter').emit({what:'run'});
    resolve(context);
  };
  f().uiPlugins().push(plugin);
})();