(function () {
  f().prototype().interactive = function (settings) {
    this.each(function (item) {
      var boundingRect = item.getBoundingClientRect();
      var mouseDown = false;
      function pos(boundingRect, event) {
        var x = event.clientX-boundingRect.x;
        var y = event.clientY-boundingRect.y;
        return {x:x, y:y};
      }
      function down(settings, event) {
        mouseDown = true;
        if(settings.down) {
          var context = pos(boundingRect, event);
          context.down = mouseDown;
          settings.down(event, context);
        }
      }
      function up(settings, event) {
        mouseDown = false;
        if(settings.up) {
          var context = pos(boundingRect, event);
          context.down = mouseDown;
          settings.up(event, context);
        }
      }
      function move(settings, event) {
        if(settings.move) {
          var context = pos(boundingRect, event);
          context.down = mouseDown;
          settings.move(event, context);
        }
      }
      f(item).on('mousedown', function(event) {
        if(event.button === 0) {
          down(settings, event);
        }
      }, true);
      f(item).on('mouseup', function(event) {
        if(event.button === 0) {
          up(settings, event);
        }
      }, true);
      f(item).on('mousemove', function(event) {
        move(settings, event);
      }, true);
      f(item).on('touchstart', function(event) {
        down(settings, event.touches[0]);
      }, true);
      f(item).on('touchend', function(event) {
        up(settings, event);
      }, true);
      f(item).on('touchcancel', function(event) {
        up(settings, event);
      }, true);
      f(item).on('touchmove', function(event) {
        move(settings, event.touches[0]);
      }, true);
    });
    return this;
  };
})();