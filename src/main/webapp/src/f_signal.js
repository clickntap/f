(function () {
  var slots = [];
  window.addEventListener('message', function(event) {
    slots.forEach(function(slot){
      if(event.data.what == slot.what) {
        slot.callback(event.data.data, event);
      }
    });
  }, false);
  f().prototype().emit = function(data) {
    postMessage({what:this.input,data:data}, document.location.href);
    return this;
  };
  f().prototype().slot = function(callback) {
    var otherSlots = [];
    var me = this;
    f(slots).each(function(slot) {
      if(slot.what != me.input) {
        otherSlots.push(slot);
      }
    });
    slots = otherSlots;
    slots.push({what:this.input,callback:callback});
    return this;
  };
  f().prototype().unslot = function() {
    var newSlots = [];
    var what = this.input;
    f(slots).each(function(slot){
      if(what != slot.what) {
        newSlots.push(slot);
      }
    });
    slots = newSlots;
    return this;
  };
  document.addEventListener('keyup', function(event) {
    f('keyup').emit({
      keyCode:event.keyCode,
      key:event.key,
      shiftKey:event.shiftKey,
      altKey:event.altKey,
      composed:event.composed,
      ctrlKey:event.ctrlKey,
      metaKey:event.metaKey,
      repeat:event.repeat,
      which:event.which,
      type:event.type
    });
  });
  document.addEventListener('keydown', function(event) {
    f('keydown').emit({
      keyCode:event.keyCode,
      key:event.key,
      shiftKey:event.shiftKey,
      altKey:event.altKey,
      composed:event.composed,
      ctrlKey:event.ctrlKey,
      metaKey:event.metaKey,
      repeat:event.repeat,
      which:event.which,
      type:event.type
    });
  });
})();