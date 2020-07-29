(function(){
  var infoX = {};
  function easeOutCubic(t) {
    return 1-Math.pow(1-t,3);
  }
  function scrollXcallback(timestamp) {
    if(infoX.item) {
      if(!infoX.start) {
        infoX.start = timestamp;
      }
      infoX.progress = easeOutCubic((timestamp - infoX.start)/infoX.duration);
      if(infoX.progress >= 1 || infoX.targetX == infoX.value) {
        infoX.item.scrollLeft = infoX.targetX;
        infoX = {};
      } else {
        if(infoX.inc === true) {
          infoX.item.scrollLeft = infoX.value+infoX.progress*(infoX.targetX-infoX.value);
        } else {
          infoX.item.scrollLeft = infoX.value-infoX.progress*(infoX.value-infoX.targetX);
        }
        window.requestAnimationFrame(scrollXcallback);
      }
    }
  }
  f().prototype().scrollX = function (x, duration) {
    {
      infoX = {};
      infoX.targetX = x;
      infoX.duration = duration;
      infoX.item = this.item;
      infoX.value = this.item.scrollLeft;
      if(infoX.targetX > infoX.value) {
        infoX.inc = true;
      } else {
        infoX.inc = false;
      }
      window.requestAnimationFrame(scrollXcallback);
    }
    return this;
  };
  var scrollX = {};
  var plugin = function (resolve, context) {
    f(context.div).find('.f_scrollx').each(function(item){
      item.addEventListener('mousedown', function(event) {
        var scroll = f(event.target).closest('.f-scrollx');
        scrollX = {value:scroll.item.scrollLeft,x0:event.clientX,item:scroll.item,delta:0};
      });
      f(item).removeClass('f_scrollx').addClass('f-scrollx');
    });
    resolve(context);
  };
  f().uiPlugins().push(plugin);
  function initScrollX() {
    f('body').item.addEventListener('mousemove', function(event) {
      if(scrollX.item) {
        scrollX.delta = scrollX.item.scrollLeft-(scrollX.value-(event.clientX-scrollX.x0));
        scrollX.item.scrollLeft = scrollX.value-(event.clientX-scrollX.x0);
        f(scrollX.item).find('*').each(function(item, index) {
          item.style.pointerEvents = 'none';
        });
      }
    });
    f('body').item.addEventListener('mouseup', function(event) {
      if(scrollX.item && Math.abs(scrollX.delta) > 1) {
        f(scrollX.item).scrollX(scrollX.item.scrollLeft-scrollX.delta*32, 1000);
        f(scrollX.item).find('*').each(function(item, index) {
          item.style.pointerEvents = 'all';
        });
      }
      scrollX = {};
    });
  }
  f().uiOnReadyPlugins().push(initScrollX);
})();
