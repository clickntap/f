(function () {
  var dragInfo = undefined;
  var dragObject = undefined;
  function handleDragStart(event) {
    event.dataTransfer.clearData();
    dragObject = undefined;
    dragInfo = {};
    dragInfo.from = JSON.parse(JSON.stringify(event.currentTarget.dataset))
    dragInfo.type = 'start';
    f('drag-move').emit(dragInfo);
    f(event.currentTarget).addClass('f-drag');
  }
  function handleDragEnd(event) {
    dragInfo.type = 'end';
    f('drag-move').emit(dragInfo);
    dragInfo = undefined;
    var from = f('.f-drag').closest('.f-draggable').item;
    if(dragObject) {
      f('drag').emit({from:JSON.parse(JSON.stringify(from.dataset)),to:JSON.parse(JSON.stringify(dragObject.dataset))})
    } else {
      f('drag').emit({from:JSON.parse(JSON.stringify(from.dataset))})
    }
    f(event.target).removeClass('f-drag');
    f('.f-droparea-after').removeClass('on');
    f('.f-droparea-before').removeClass('on');
    f('.f-drop').removeClass('f-drop');
    event.preventDefault();
  }
  function handleDragEnter(event) {
    handleDragLeave(event);
    var from = f('.f-drag').closest('.f-draggable').item;
    var to = f(event.target).closest('.f-draggable').item;
    if(to.dataset.drop) {
      var toDrops = to.dataset.drop.split(',');
      f(toDrops).each(function(toDrop) {
        if(from.dataset.what == toDrop) {
          if((from.dataset.id != to.dataset.id && from.dataset.what == to.dataset.what) || (from.dataset.what != to.dataset.what)) {
            dragObject = to;
            f(to).addClass('f-drop');
            to.dataset['type'] = 'drop';
          }
        }
      });
    } else {
      if(from.dataset.what == to.dataset.what) {
        if(from.dataset.id != to.dataset.id) {
          dragObject = to;
          var position = from.compareDocumentPosition(to);
          if(position & Node.DOCUMENT_POSITION_PRECEDING) {
            f(to.parentElement).find('.f-droparea-before').addClass('on');
          }
          if(position & Node.DOCUMENT_POSITION_FOLLOWING) {
            f(to.parentElement).find('.f-droparea-after').addClass('on');
          }
        }
        to.dataset['type'] = 'drag';
      }
    }
  }
  function handleDropEnter(event) {
    handleDragLeave(event);
    var from = f('.f-drag').closest('.f-draggable').item;
    var to = f(event.target).closest('.f-droppable').item;
    if(to.dataset.drop) {
      var toDrops = to.dataset.drop.split(',');
      f(toDrops).each(function(toDrop) {
        if(from.dataset.what == toDrop) {
          if((from.dataset.id != to.dataset.id && from.dataset.what == to.dataset.what) || (from.dataset.what != to.dataset.what)) {
            dragObject = to;
            f(to).addClass('f-drop');
            to.dataset['type'] = 'drop';
          }
        }
      });
    }
  }
  function handleDragLeave(event) {
    dragObject = undefined;
    f('.f-droparea-after').removeClass('on');
    f('.f-droparea-before').removeClass('on');
    f('.f-drop').removeClass('f-drop');
  }
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    dragInfo.type = 'start';
    dragInfo.to = JSON.parse(JSON.stringify(event.target.dataset));
    for(var k in event) {
      if(k.endsWith('X') || k.endsWith('Y')) {
        dragInfo[k] = event[k];
      }
    }
    f('drag-move').emit(dragInfo);
  }
  function dragInit() {
    f('.f-draggable').each(function(item) {
      var f_item = f(item);
      if(!f_item.hasClass('f-draggable-ok')) {
        f_item.addClass('f-draggable-ok');
        item.setAttribute('draggable','true');
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragend', handleDragEnd, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
      }
    });
    f('.f-droppable').each(function(item) {
      var f_item = f(item);
      if(!f_item.hasClass('f-droppable-ok')) {
        f_item.addClass('f-droppable-ok');
        item.addEventListener('dragenter', handleDropEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
      }
    });
  }
  f().uiOnReadyPlugins().push(dragInit);
})();
