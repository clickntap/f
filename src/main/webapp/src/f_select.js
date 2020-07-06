(function () {
  [#assign html]
  [#include "f_select.html"]
  [/#assign]
  var templateselect = f().tc('${html?replace('\n','')?js_string}');
  function updateSelectors(name, value) {
    f().app().set('select.'+name,value);
  }
  function renderSelect(item, json) {
    try {
      var value = f().app().get('select.'+json.name);
      if(json.selected === undefined && value) {
        json.selected = value;
      }
    } catch(err) {
    }
    var span = f(item).find('.f-select-choose').find('span').item;
    span.innerHTML = '';
    if(json.selected) {
      for(var i=0; i<json.items.length; i++){
        var option = json.items[i];
        if(option.value == json.selected) {
          span.innerHTML = option.label;
          updateSelectors(json.name, option.value);
        }
      }
    }
    if(span.innerHTML == '' && json.items.length != 0) {
      var option = json.items[0];
      json.selected = option.value;
      span.innerHTML = option.label;
      updateSelectors(json.name, option.value);
    }
    if(span.innerHTML == '') {
      var text = f().tr('choose.'+json.name);
      span.innerHTML = (text === undefined)?'choose.'+json.name:text;
    }
  }
  f().prototype().select = function (json) {
    this.each(function(item){
      f(item).html(templateselect(json));
      var width = 0;
      f(item).find('.f-select-label').each(function(item) {
        var rect = item.getBoundingClientRect();
        if(rect.width > width) {
          width = Math.ceil(rect.width);
        }
      });
      item.style.width = width+'px';
      f(item).on('click',function(event) {
        var me = f(event.target).closest('.f-select').item;
        var options = f(me).find('.f-select-option');
        options.each(function(option,index){
          var rect = option.getBoundingClientRect();
          if(event.clientY > rect.top && event.clientY < rect.top+rect.height) {
            json.selected = json.items[index].value;
            renderSelect(item, json);
            f('select').emit({name:json.name,value:json.items[index].value,info:json.info});
          }
        });
        f('.f-select').each(function(item) {
          if(item != me) {
            f(item).removeClass('f-on');
          } else {
            f(item).toggleClass('f-on');
          }
        });
        var height = options.item.getBoundingClientRect().height;
        if(f(item).hasClass('f-on')) {
          f(item).find('.f-select-panel').item.style.height = (height*json.items.length)+'px';
        } else {
          f(item).find('.f-select-panel').item.style.height = 0+'px';
        }
        event.stopPropagation();
      });
      renderSelect(item, json);
    });
    return this;
  };
  var selectPlugin = function(resolve, context) {
    var item = f(context.div).find('.f_select').item;
    if(item) {
      f(item).removeClass('f_select').addClass('f-select');
      f(item).select(JSON.parse(item.innerHTML));
      f(context.div).uiRender(context.callback);
    } else {
      resolve(context);
    }
  }
  f().uiPlugins().push(selectPlugin);
})();