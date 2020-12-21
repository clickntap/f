(function(){
  function editorUpdate(doc) {
    var item = f(doc).closest('.f-editor').item;
    var observer = item.observer;
    observer.disconnect();
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
    var parser = new DOMParser();
    var body = parser.parseFromString(doc.innerHTML, "text/html").body;
    var html = cleanHTML(body);
    if(needsCleanHTML(body) === true) {
      doc.innerHTML = html;
    }
    observer.observe(item, {childList: true, subtree: true, characterData:true, attributes:true});
  }
  var htmlTags = ['div','b','font','br','ul','ol','li','i'];
  var htmlCssNames = ['color','text-align'];
  function needsCleanHTML(element) {
    var needsClean = false;
    try {
      var cssTexts = element.style.cssText.split(';');
      f(cssTexts).each(function(cssText) {
        if(cssText.trim() != '') {
          var cssName = cssText.split(':')[0].trim().toLowerCase();
          if(cssName != 'color' && cssName != 'text-align') {
            needsClean = true;
          }
        }
      });
    } catch(err) {
    }
    if(needsClean === true) {
      return needsClean;
    }
    element.childNodes.forEach(function(child){
      if(needsClean === false) {
        var tagFound = false;
        f(htmlTags).each(function(htmlTag){
          if(htmlTag == child.nodeName.toLowerCase()) {
            tagFound = true;
          }
          if('#text' == child.nodeName.toLowerCase()) {
            tagFound = true;
          }
        });
        if(tagFound === false) {
          needsClean = true;
        } else {
          needsClean = needsCleanHTML(child);
        }
      }
    });
    return needsClean;
  }
  function cleanHTML(element, level) {
    if(!level) {
      level = 0;
    }
    var html = '';
    element.childNodes.forEach(function(child){
      var tagFound = false;
      var tag = '';
      f(htmlTags).each(function(htmlTag){
        if(htmlTag == child.nodeName.toLowerCase()) {
          tagFound = true;
          var style = '';
          if(child.style && child.style.color && child.style.color != '') {
            style += 'color:'+child.style.color+';';
          }
          if(child.style.textAlign) {
            style += 'text-align:'+child.style.textAlign+';';
          }
          if(child.getAttribute('color')) {
            style += 'color:'+child.getAttribute('color')+';';
          }
          if(style == '') {
            tag += '<'+htmlTag+'>';
          } else {
            tag += '<'+htmlTag+' style="'+style+'">';
          }
        }
      });
      if('#text' == child.nodeName.toLowerCase()) {
        tagFound = true;
        var text = child.nodeValue.trim();
        tag += text;
      }
      tag += cleanHTML(child,level+1);
      f(htmlTags).each(function(htmlTag){
        if(htmlTag == child.nodeName.toLowerCase()) {
          if(htmlTag != 'br' && htmlTag != 'li') {
            tag += '</'+htmlTag+'>';
          }
        }
      });
      html += tag;
    });
    return html;
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
      item.addEventListener('selectstart', function (event) {
        setTimeout(function() {
          var editor = f(event.target.parentNode).closest('.f-editor').item;
          editorUpdate(doc.item);
        },0);
      });
      item.addEventListener('paste', function (event) {
        setTimeout(function() {
          var editor = f(item).closest('.f-editor').item;
          editorUpdate(doc.item);
        },0);
      });
      var observer = new MutationObserver(function(mutations) {
        try {
          var editor = f(mutations[0].target.parentNode).closest('.f-editor').item;
          editorUpdate(doc.item);
        } catch(err) {
        }
      });
      item.observer = observer;
      observer.observe(item, {childList: true, subtree: true, characterData:true, attributes:true});
      doc.item.setAttribute('contenteditable', 'true');
      var toolbar = f(item).find('.f-toolbar');
      toolbar.find('.bold').on('click', function() { document.execCommand('bold'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.italic').on('click', function() { document.execCommand('italic'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.ordered-list').on('click', function() { document.execCommand('insertOrderedList'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.justify-left').on('click', function() { document.execCommand('justifyLeft'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.justify-center').on('click', function() { document.execCommand('justifyCenter'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.justify-right').on('click', function() { document.execCommand('justifyRight'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.clear').on('click', function() { document.execCommand('removeFormat'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.red').on('click', function() { document.execCommand('foreColor',false,'#aa0000'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.green').on('click', function() { document.execCommand('foreColor',false,'#00aa00'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.blue').on('click', function() { document.execCommand('foreColor',false,'#0000aa'); doc.item.focus(); editorUpdate(doc.item);});
      toolbar.find('.yellow').on('click', function() { document.execCommand('foreColor',false,'#aaaa00'); doc.item.focus(); editorUpdate(doc.item);});
      f(item).removeClass('f_editor').addClass('f-editor');
      setTimeout(function() {
        editorUpdate(doc.item);
        doc.item.focus();
      },0);
    });
    resolve(context);
  };
  f().prototype().cleanHTML = cleanHTML;
  f().prototype().needsCleanHTML = needsCleanHTML;
  f().uiPlugins().push(plugin);
})();
