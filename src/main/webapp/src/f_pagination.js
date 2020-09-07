(function () {
  [#assign html]
  [#include "f_pagination.html"]
  [/#assign]
  var templatepagination = f().tc('${html?replace('\n','')?js_string}');
  function paginationRender(container, json, callback) {
    var sortName = f().app().get('pagination.'+json.name+'.sort') || '';
    var params = {from:f().app().get('pagination.'+json.name+'.from', 0),limit:json.limit};
    if(sortName) params.sort = sortName;
    var searchText = '';
    if(json.search) {
      searchText = f().app().get('search.'+json.search.source, '');
      params[json.search.name] = searchText;
    }
    if(json.params) {
      for(key in json.params) {
        params[key] = json.params[key];
      }
    }
    if(json.secure) {
      f().api(function(headers){
        f().http({
          url:json.url,
          headers:headers,
          params:params,
          onsuccess:function(event) {
            var data = JSON.parse(event.target.responseText);
            f().app().set('pagination.'+json.name+'.conf', json);
            f().app().set('pagination.'+json.name+'.data', data);
            if(!data.limit) {
              data.limit = Number.MAX_SAFE_INTEGER;
            }
            if(!data.from) {
              data.from = 0;
            }
            json.n = (data.from / data.limit) + 1;
            if (data.count / data.limit == Math.floor(data.count / data.limit)) {
              json.size = Math.floor(data.count / data.limit);
            } else {
              json.size = Math.floor(data.count / data.limit) + 1;
            }
            data.conf = json;
            f(container).html(templatepagination(data));
            f(container).item.setAttribute('name', json.name);
            f('pagination-changed').emit({name:json.name});
            if (typeof (callback) == 'function') {
              callback(container);
            }
          }
        })
      });
    }
  }
  f().prototype().pagination = function (container, json) {
    if (container.constructor === ({}).constructor) {
      var command = container;
      var sender = this;
      f('.f-pagination .'+command.channel).each(function(item){
        var pagination = f().app().get("pagination."+command.channel);
        var me = item;
        if(command.what == 'sort') {
          var sort = 'asc';
          if(f(sender.input.target).closest('th').hasClass('sort-up')) {
            sort = 'desc';
          }
          pagination.sort = command.name+'|'+sort;
          pagination.from = 0;
        }
        if(isNaN(pagination.from)) {
          pagination.from = 0;
        }
        if(command.what == 'page-first') {
          pagination.from = 0;
        }
        if(command.what == 'update') {
          pagination.from = 0;
        }
        if(command.what == 'page-prev') {
          pagination.from = pagination.from-pagination.data.limit;
        }
        if(command.what == 'page-next') {
          pagination.from = pagination.from+pagination.data.limit;
        }
        if(command.what == 'page-last') {
          pagination.from = pagination.data.limit*(Math.floor(pagination.data.count/pagination.data.limit));
        }
        if(command.what == 'page') {
          pagination.from = pagination.data.limit*(command.value-1);
        }
        if(command.what == 'mode') {
          pagination.mode = command.value;
        }
        if (command.what == 'select') {
          try {
            var target = sender.input.target;
            var formItem = f(item).closest('.f-form-item');
            if (formItem.items.length != 0) {
              if (command.value) {
                formItem.find('.f-form-input-search').html(command.value);
              } else {
                if (!target.onclick) {
                  target = f(target).closest('a').items[0];
                }
                formItem.find('.f-form-input-search').html(target.innerText.trim());
              }
              formItem.find('input[type="hidden"]').items[0].value = command.id;
              formItem.find('.f-form-input-search-clean').removeClass('hide');
              f(item).closest('.f-form-box-search').addClass('hide');
              f(item).closest('.form-modal').removeClass('form-modal-pagination');
              sender.input.stopImmediatePropagation();
            }
          } catch (e) {
          }
          f('pagination').emit(command);
        } else {
          paginationRender(item.parentElement, pagination.conf, function (container) {
            f('.f-pagination').tr();
            f(container).find('.f_svg').renderSvg();
          });
        }
      });
    } else {
      var sort = '';
      try {
        json.grid = f().tc(f(container).find('script[name=template-grid]').html());
      } catch (err) {
      }
      f(json.fields).each(function(field) {
        try {
          field.template = f().tc(f(container).find('script[name='+field.name+']').html());
        } catch(err) {
        }
        json.mode = f().app().get('pagination.'+json.name+'.mode', json.mode);
        json.switchMode = f().app().get('pagination.'+json.name+'.switchMode', (json.switchMode ? json.switchMode : 'yes'));
        if(field.sort) {
          json.sort = f().app().get('pagination.'+json.name+'.sort', field.name+'|'+field.sort);
        }
        json.search = f().app().get('pagination.'+json.name+'.search', json.search);
      });
      if (json.template) {
        f().http({
          url: json.template,
          onsuccess: function (event) {
            var text = event.target.responseText;
            try {
              json.template = f().tc(text);
            } catch (e) {
            }
            paginationRender(container, json, json.onready);
          }
        })
      } else {
        paginationRender(container, json, json.onready);
      }
    }
    return this;
  };
  var paginationPlugin = function(resolve, context) {
    var item = f(context.div).find('.f_pagination').item;
    if (item) {
      var json = JSON.parse(item.innerText);
      json.onready = function() {
        f(context.div).uiRender(context.callback);
      }
      f(item).addClass('f-pagination').pagination(item, json).removeClass('f_pagination');
    } else {
      resolve(context);
    }
  };
  f().uiPlugins().push(paginationPlugin);
})();