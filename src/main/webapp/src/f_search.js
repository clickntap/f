(function () {
  [#assign html]
  [#include "f_search.html"]
  [/#assign]
  var templatesearch = f().tc('${html?replace('\n','')?js_string}');
  var searchTimeout = 0;
  function emitSearch(name, event) {
    var pagination = f().app().get('pagination', {});
    for(var key in pagination) {
      if(pagination[key].search) {
        var search = pagination[key].search;
        if(search.source == name) {
          f().pagination({channel:key,what:'update'});
        }
      }
    }
    f('search').emit({name:name,value:f().app().get('search.'+name)});
  }
  f().prototype().search = function (data) {
    this.html(templatesearch(data));
    var item = this.items[0];
    var me = this;
    var input = me.find('.input').items[0];
    me.find('.clear').addClass('off').on('click', function() {
      input.innerText = '';
    });
    f(item).on('click',function() {
      input.focus();
    });
    input.innerText = f().app().get('search.'+data.name, '');
    new MutationObserver(function(event) {
      var value = input.innerText.trim();
      if(input.innerText.match(/\n/) || input.innerText.match(/\r/)) {
        input.blur();
      }
      if(value == '') {
        me.find('.clear').addClass('off');
      } else {
        me.find('.clear').removeClass('off');
      }
      f().app().set('search.'+data.name, value);
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function() {
        emitSearch(data.name, event);
      }, ((input.innerText == '') ? 0 : 500));
    }).observe(input, {childList: true, subtree: true, characterData:true, attributes:true});
    if(input.innerText == '') {
      me.find('.clear').addClass('off');
    } else {
      me.find('.clear').removeClass('off');
    }
    data.onready();
    return this;
  };
  var searchPlugin = function(resolve, context) {
    var item = f(context.div).find('.f_search').item;
    if(item) {
      var json = JSON.parse(item.innerText);
      json.onready = function() {
        f(context.div).uiRender(context.callback);
      }
      f(item).addClass('f-search').search(json).removeClass('f_search');
    } else {
      resolve(context);
    }
  };
  f().uiPlugins().push(searchPlugin);
})();