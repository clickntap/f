(function () {
  [#assign html]
  [#include "f_datepicker.html"]
  [/#assign]
  var templatedatepicker = f().tc('${html?replace('\n','')?js_string}');
  function datepickerRender(container, json, callback) {
    f().app().set('datepicker.' + json.name, json);
    f(container).html(templatedatepicker({ data: json }));
    if (typeof (callback) == 'function') callback(container);
  }
  f().prototype().datepicker = function (container, json) {
    json = json || {};
    if (container.constructor === ({}).constructor) {
      var command = container;
      var sender = this;
      f('.f-datepicker .' + command.channel).each(function (item) {
        var datepicker = f().app().get('datepicker.' + command.channel);
        var me = item;
        if (command.what == 'prev') {
          var viewDate = new Date(datepicker.viewDate);
          datepicker.viewDate = viewDate.prevMonth().toISOString();
        }
        if (command.what == 'next') {
          var viewDate = new Date(datepicker.viewDate);
          datepicker.viewDate = viewDate.nextMonth().toISOString();
        }
        if (command.what == 'today') {
          datepicker.viewDate = new Date().toISOString();
        }
        if (command.what == 'defaultDate') {
          datepicker.defaultDate = command.value;
          datepicker.viewDate = command.value;
        }
        if (command.what == 'viewDate') {
          datepicker.viewDate = command.value;
        }
        if (command.what == 'select') {
          datepicker.defaultDate = command.value;
          datepicker.viewDate = command.value;
          try {
            var target = sender.input.target;
            var formItem = f(item).closest('.f-form-item');
            if (formItem.items.length != 0) {
              var date = new Date(command.value);
              date.setHours(12);
              date.setMinutes(0);
              date.setSeconds(0);
              formItem.find('.f-form-input-day').html(date.getDate());
              formItem.find('.f-form-input-month').html(date.getMonth() + 1);
              formItem.find('.f-form-input-year').html(date.getFullYear());
              formItem.find('.f-form-input-hour').html(date.getHours());
              formItem.find('.f-form-input-minute').html(date.getMinutes());
              formItem.find('.f-form-datepicker-clean').removeClass('hide');
              f(item).closest('.f-form-box-datepicker').addClass('hide');
              f(item).closest('.form-modal').removeClass('form-modal-datepicker');
              sender.input.stopImmediatePropagation();
            }
          } catch (e) {
          }
          f('datepicker').emit(command);
        }
        datepickerRender(item.parentElement, datepicker);
      });
    } else {
      if (!json.viewDate) {
        json.viewDate = new Date().toISOString();
      }
      if (json.defaultDate) {
        json.viewDate = json.defaultDate;
      }
      datepickerRender(container, json, json.onready);
    }
    return this;
  };
  var datepickerPlugin = function (resolve, context) {
    var item = f(context.div).find('.f_datepicker').item;
    if (item) {
      var json = JSON.parse(item.innerText);
      json.onready = function () {
        f(context.div).uiRender(context.callback);
      }
      f(item).addClass('f-datepicker').datepicker(item, json).removeClass('f_datepicker');
    } else {
      resolve(context);
    }
  };
  f().uiPlugins().push(datepickerPlugin);
})();