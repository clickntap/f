(function(){
  function toolbarState(doc) {
    var toolbar = f(doc).closest('.f-editor').find('.f-toolbar');
    var bold = toolbar.find('.bold');
    if(bold.item) { if(document.queryCommandState('bold')) { bold.addClass('on'); } else { bold.removeClass('on'); } }
    var italic = toolbar.find('.italic');
    if(italic.item) { if(document.queryCommandState('italic')) { italic.addClass('on'); } else { italic.removeClass('on'); } }
    var orderedList = toolbar.find('.ordered-list');
    if(orderedList.item) { if(document.queryCommandState('insertOrderedList')) { orderedList.addClass('on'); } else { orderedList.removeClass('on'); } }
    var justifyLeft = toolbar.find('.justify-left');
    if(justifyLeft.item) { if(document.queryCommandState('justifyLeft')) { justifyLeft.addClass('on'); } else { justifyLeft.removeClass('on'); } }
    var justifyCenter = toolbar.find('.justify-center');
    if(justifyCenter.item) { if(document.queryCommandState('justifyCenter')) { justifyCenter.addClass('on'); } else { justifyCenter.removeClass('on'); } }
    var justifyRight = toolbar.find('.justify-right');
    if(justifyRight.item) { if(document.queryCommandState('justifyRight')) { justifyRight.addClass('on'); } else { justifyRight.removeClass('on'); } }
    console.log(doc.innerHTML);
    var parser = new DOMParser();
    console.log(parser.parseFromString(doc.innerHTML, "text/html").body);
  }
  function editorOff(item) {
    f(item).removeClass('on').find('.f-item').removeClass('on');
  }
  var timeout = 0;
  var plugin = function (resolve, context) {
    f(context.div).find('.f_editor').each(function(item){
      var doc = f(item).find('.f-document');
      doc.on('focus', function() {
        clearTimeout(timeout);
        f(item).addClass('on');
      });
      doc.on('blur', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          editorOff(item);
        }, 250);
      });
      doc.item.setAttribute('contenteditable', 'true');
      doc.item.addEventListener('DOMSubtreeModified', function (event) {
        setTimeout(function() {
          toolbarState(doc.item);
        }, 0);
      });
      doc.item.addEventListener('selectstart', function (event) {
        setTimeout(function() {
          toolbarState(doc.item);
        }, 0);
      });
      doc.item.addEventListener('keyup', function (event) {
        setTimeout(function() {
          toolbarState(doc.item);
        }, 0);
      });
      var toolbar = f(item).find('.f-toolbar');
      toolbar.find('.bold').on('click', function() { document.execCommand('bold'); doc.item.focus(); toolbarState(doc.item);});
      toolbar.find('.italic').on('click', function() { document.execCommand('italic'); doc.item.focus(); toolbarState(doc.item);});
      toolbar.find('.ordered-list').on('click', function() { document.execCommand('insertOrderedList'); doc.item.focus(); toolbarState(doc.item);});
      toolbar.find('.justify-left').on('click', function() { document.execCommand('justifyLeft'); doc.item.focus(); toolbarState(doc.item);});
      toolbar.find('.justify-center').on('click', function() { document.execCommand('justifyCenter'); doc.item.focus(); toolbarState(doc.item);});
      toolbar.find('.justify-right').on('click', function() { document.execCommand('justifyRight'); doc.item.focus(); toolbarState(doc.item);});
      f(item).removeClass('f_editor').addClass('f-editor');
    });
    resolve(context);
  };
  f().uiPlugins().push(plugin);
})();