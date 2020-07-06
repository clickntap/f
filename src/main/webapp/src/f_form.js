(function () {
  [#assign html]
  [#include "f_form.html"]
  [/#assign]
  var templateform = f().tc('${html?replace('\n','')?js_string}');
  function formSubmit(form, data) {
    f().api(function (headers) {
      form.http({
        url: data.url,
        method: 'POST',
        headers: headers,
        onsuccess: function (event) {
          var json = JSON.parse(event.target.responseText);
          if (json.errors) {
            f(json.errors).each(function (error, index) {
              form.find('input').each(function (item, index) {
                if (item.name == error.name) {
                  var e = f(item).closest('.f-form-item').find('.f-form-error');
                  e.html('<span class="f-tr">' + error.error + '</span>');
                  f(item).closest('.f-form-item').removeClass('error').addClass('error');
                }
              });
              form.tr();
            });
            f('form-ko').emit({ form: data, response: json });
          } else {
            f('form-ok').emit({ form: data, response: json });
          }
        },
        onerror: function (event) {
          f('form-ko').emit({ form: data });
        }
      });
    });
  }
  function handleDateValue(item, group, part, len) {
    var value = '';
    group.find('.f-form-input').each(function (groupItem) {
      if (f(groupItem).hasClass('f-form-input-' + part)) {
        value = groupItem.innerText;
        if (value.length > len) {
          groupItem.innerText = value = '';
        } else {
          value = ('0000' + value).slice(-len);
        }
      }
    });
    return value;
  }
  function handleDate(item, group) {
    var dateAsString = '';
    var year = handleDateValue(item, group, 'year', 4);
    if (year != '') {
      dateAsString += year;
      var month = handleDateValue(item, group, 'month', 2);
      if (month != '') {
        dateAsString += '-' + month;
        var day = handleDateValue(item, group, 'day', 2);
        if (day != '') {
          dateAsString += '-' + day;
        }
      } else {
        handleDateValue(item, group, 'day', 2);
      }
      var hour = handleDateValue(item, group, 'hour', 2);
      if (hour != '') {
        dateAsString += ' ' + hour;
        var minute = handleDateValue(item, group, 'minute', 2);
        if (minute != '') {
          dateAsString += ':' + minute;
        }
      } else {
        handleDateValue(item, group, 'minute  ', 2);
      }
    } else {
      // handleDateValue(item, group, 'month', 2);
      // handleDateValue(item, group, 'day', 2);
      // handleDateValue(item, group, 'hour', 2);
      // handleDateValue(item, group, 'minute', 2);
      var today = new Date();
      var mm = ('0000' + (today.getMonth() + 1)).slice(-2);
      var dd = ('0000' + today.getDate()).slice(-2)
      dateAsString = today.getFullYear() + '-' + mm + '-' + dd;
      var hour = handleDateValue(item, group, 'hour', 2);
      if (hour != '') {
        dateAsString += ' ' + hour;
        var minute = handleDateValue(item, group, 'minute', 2);
        if (minute != '') {
          dateAsString += ':' + minute;
        }
      }
    }
    return dateAsString;
  }
  function setEndOfContenteditable(contentEditableElement) {
    var range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  f().prototype().form = function (data) {
    this.html(templateform({ data: data }));
    var me = this;
    f('form-submit').unslot();
    f('form-submit').slot(function () {
      formSubmit(f(me.find('form').items[0]), data);
    });
    f(me.input).find('.f-form-eye-icon').on('click', function (event) {
      var item = f(event.target).closest('.f-form-item');
      if (item.hasClass('show-password'))
      item.removeClass('show-password');
      else
      item.addClass('show-password');
    });
    f('.f-form-input-search-clean').each(function (item, i) {
      f(item).on('click', function (event) {
        f(item).closest('.f-form-item').find('.f-form-input-search').html("&nbsp;");
        f(item).closest('.f-form-item').find('input[type="hidden"]').items[0].value = "";
        f(item).addClass('hide');
        event.stopPropagation();
      });
    });
    f('.f-form-datepicker-clean').each(function (item, i) {
      f(item).on('click', function (event) {
        f(item).closest('.f-form-item').find('.f-form-input').html('');
        f(item).addClass('hide');
        event.stopPropagation();
      });
    });
    f('.f-form-times').each(function (item, i) {
      f(item).on('click', function (event) {
        var box = f(item).closest('.f-form-box-component');
        box.addClass('hide');
        box.closest('.form-modal').removeClass('form-modal-pagination').removeClass('form-modal-datepicker');
        event.stopPropagation();
      });
    });
    f('.f-form-search').each(function (item, i) {
      f(item).on('click', function (event) {
        var box = f(item).find('.f-form-box-search');
        if (box.hasClass('hide')) {
          var ok = false;
          try {
            var search = box.find('.component-search');
            if (!search.hasClass('f-search')) {
              search.addClass('f_search');
              ok = true;
            }
          } catch (e) {
          }
          try {
            var pagination = box.find('.component-pagination');
            if (!pagination.hasClass('f-pagination')) {
              pagination.addClass('f_pagination');
              ok = true;
            }
          } catch (e) {
          }
          if (ok) {
            box.find('.f-form-box-search-content').ui({
              onready: function () {
                box.find('.component-search').removeClass('component-search');
                box.find('.component-pagination').removeClass('component-pagination');
                box.closest('.form-modal').addClass('form-modal-pagination');
                box.removeClass('hide');
                setTimeout(function () {
                  if (box.closest('.form-panel').item) box.closest('.form-panel').item.scrollTop = 0;
                }, 0)
              }
            });
          } else {
            box.closest('.form-modal').addClass('form-modal-pagination');
            box.removeClass('hide');
            setTimeout(function () {
              if (box.closest('.form-panel').item) box.closest('.form-panel').item.scrollTop = 0;
            }, 0)
          }
        }
      });
    });
    f('.f-form-datepicker').each(function (item, i) {
      f(item).on('click', function (event) {
        var formItem = f(item).closest('.f-form-item');
        var input = formItem.find('[type="hidden"]').items[0];
        var box = formItem.find('.f-form-box-datepicker');
        if (box.hasClass('hide')) {
          var defaultDate = null
          if (input.value) {
            defaultDate = Date.parse(input.value);
          }
          var ok = false;
          try {
            var datepicker = box.find('.component-datepicker');
            if (!datepicker.hasClass('f-datepicker')) {
              datepicker.addClass('f_datepicker');
              ok = true;
            }
          } catch (e) {
          }
          if (ok) {
            box.find('.f-form-box-datepicker-content').ui({
              onready: function () {
                if (defaultDate && !defaultDate.isInvalid()) f().datepicker({ channel: 'form-' + input.name, what: 'defaultDate', value: defaultDate.toISOString() });
                box.find('.component-datepicker').removeClass('component-datepicker');
                box.closest('.form-modal').addClass('form-modal-datepicker');
                box.removeClass('hide');
                setTimeout(function () {
                  if (box.closest('.form-panel').item) box.closest('.form-panel').item.scrollTop = 0;
                }, 0)
              }
            });
          } else {
            if (defaultDate && !defaultDate.isInvalid()) f().datepicker({ channel: 'form-' + input.name, what: 'defaultDate', value: defaultDate.toISOString() });
            box.closest('.form-modal').addClass('form-modal-datepicker');
            box.removeClass('hide');
            setTimeout(function () {
              if (box.closest('.form-panel').item) box.closest('.form-panel').item.scrollTop = 0;
            }, 0)
          }
        }
      });
    });
    f('.f-form-input').each(function (item, i) {
      var fItem = f(item);
      if (!fItem.hasClass('f-form-input-search') && !fItem.hasClass('f-form-input-select') && !fItem.hasClass('f-form-input-radio')) {
        fItem.closest('.f-form-item').on('click', function (event) {
          f(item).closest('.f-form-item').find('.f-form-input').items[0].focus();
        });
        fItem.on('click', function (event) {
          event.stopPropagation();
        });
        fItem.on('focus', function (event) {
          setEndOfContenteditable(event.target);
          var tip = event.target.getAttribute('tip');
          if (tip) {
            f(item).closest('.f-form-item').find('.f-form-tip').html(f().tr(tip));
          }
          f(item).closest('.f-form-item').addClass('active').removeClass('error').find('.f-form-error').html('');
        });
        fItem.on('blur', function (event) {
          f(item).closest('.f-form-item').removeClass('active').find('.f-form-tip').html('&nbsp;');
          if (window.getSelection)
          window.getSelection().removeAllRanges();
          else if (document.selection)
          document.selection.empty();
        });
        item.addEventListener('DOMSubtreeModified', function (event) {
          var value = item.innerText.trim();
          if (item.getAttribute('multiline') !== 'true' && (item.innerText.match(/\n/) || item.innerText.match(/\r/))) {
            item.innerText = value = value.replace(/\r?\n/g, '').trim();
            item.blur();
            formSubmit(f(item).closest('form'), data);
          }
          if (item.getAttribute('type') == 'password' && value.match(/ /)) {
            item.innerText = value = value.replace(/ /g, '').trim();
            item.blur();
          }
          var mask = '';
          for (var i = 0; i < value.length; i++) {
            mask += '&bull;';
          }
          f(item.parentElement).find('.f-form-input-mask').html(mask);
          var group = f(event.target.parentElement).closest('.f-form-input-group');
          if (group.items) {
            value = handleDate(item, f(event.target.parentElement).closest('.f-form-input-group'));
            var userEnteredDate = new Date(Date.parse(value));
            var localDateString = '' + userEnteredDate.toLocaleDateString(f('html').items[0].getAttribute('lang'), {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
            if (group.hasClass('f-form-input-group-datetime')) {
              localDateString += ' <i class="fal fa-clock"></i> ' + userEnteredDate.toLocaleTimeString(f('html').items[0].getAttribute('lang'), {
                hour12: false,
                timeStyle: 'short'
              });
            }
            if (group.hasClass('f-form-input-group-time')) {
              localDateString = '&nbsp; <i class="fal fa-clock"></i> ' + userEnteredDate.toLocaleTimeString(f('html').items[0].getAttribute('lang'), {
                hour12: false,
                timeStyle: 'short'
              });
            }
            if (isNaN(userEnteredDate.getTime())) {
              value = '';
              f(item).closest('.f-form-item').find('.f-form-value').items[0].innerHTML = '&nbsp;';
            } else {
              f(item).closest('.f-form-item').find('.f-form-value').items[0].innerHTML = localDateString;
            }
          }
          f(item).closest('.f-form-item').find('input').items[0].value = value;
        });
      }
      if (data.values[item.getAttribute('name')]) {
        item.innerText = data.values[item.getAttribute('name')];
      } else {
        var name = f(item).closest('.f-form-item').find('input').items[0].name;
        if (data.values[name] != null && typeof (data.values[name]) != 'undefined') {
          var value = data.values[name];
          if (f(item).hasClass('f-form-input-day')) {
            item.innerText = new Date(Date.parse(value)).getDate();
            f(item).closest('.f-form-item').find('.f-form-datepicker-clean').removeClass('hide');
          }
          if (f(item).hasClass('f-form-input-month')) {
            item.innerText = new Date(Date.parse(value)).getMonth() + 1;
          }
          if (f(item).hasClass('f-form-input-year')) {
            item.innerText = new Date(Date.parse(value)).getFullYear();
          }
          if (f(item).hasClass('f-form-input-hour')) {
            item.innerText = ('00' + new Date(Date.parse(value)).getHours()).slice(-2);
          }
          if (f(item).hasClass('f-form-input-minute')) {
            item.innerText = ('00' + new Date(Date.parse(value)).getMinutes()).slice(-2);
          }
          if (f(item).hasClass('f-form-input-hidden')) {
            f(item).closest('.f-form-item').find('input').items[0].value = value;
          }
          if (f(item).hasClass('f-form-input-select')) {
            f(item).find('select').items[0].value = value;
            f(item).closest('.f-form-item').find('input').items[0].value = value;
          }
          if (f(item).hasClass('f-form-input-radio')) {
            try {
              f(item).find('input[type="radio"][value="' + value + '"]').items[0].checked = true;
            } catch (e) { }
          }
          if (f(item).hasClass('f-form-input-search')) {
            f(item).closest('.f-form-item').find('input').items[0].value = value;
            f(item).closest('.f-form-item').find('.f-form-input-search-clean').removeClass('hide');
            var checkName = name.replace('Id', 'Name');
            if (data.values[checkName] != null && typeof (data.values[checkName]) != 'undefined') {
              value = data.values[checkName];
            }
            item.innerText = value;
          }
        }
      }
      if (data.values && data.values.warnings && data.fieldWarning) {
        var input = f(item).closest('.f-form-item').find('input').items[0];
        if (input) {
          f(data.values.warnings).each(function (warning) {
            if (input.name == warning.name) {
              warning.id = data.id;
              warning['class'] = data.values['class'];
              var e = f(item).closest('.f-form-item').find('.f-form-field-warning');
              var modelName = 'formWarning.' + warning.name;
              f().app().set(modelName, { data: warning });
              e.html('<div class="f_t" data-resource="' + data.fieldWarning + '" data-target="' + modelName + '"></div>');
              f(item).closest('.f-form-item').removeClass('warning').addClass('warning');
            }
          });
        }
      }
    });
    if (data.values && data.values.warnings && data.formWarning) {
      var e = f(me.input).find('.f-form-warning');
      var modalName = 'formWarning.' + f().app().get('form');
      f().app().set(modalName, { data: data.values });
      e.html('<div class="f_t" data-resource="' + data.formWarning + '" data-target="' + modalName + '"></div>');
    }
  };
  var formPlugin = function (resolve, context) {
    var item = f(context.div).find('.f_form').item;
    if (item) {
      f(item).removeClass('f_form').addClass('f-form');
      f().http({
        url: item.getAttribute('data-resource'),
        headers: {pragma:'no-cache','Cache-Control':'no-cache'},
        onsuccess: function (event) {
          var json = JSON.parse(event.target.responseText);
          json.url = json.uri;
          if (item.getAttribute('data-server')) json.url = item.getAttribute('data-server') + json.uri;
          var dataset = JSON.parse(JSON.stringify(item.dataset));
          if (item.getAttribute('data-id')) {
            if(json.uri.indexOf('/add') >= 0) {
              json.uri = json.uri.replace('/add', '/edit');
              json.url = json.url.replace('/add', '/edit');
            } else {
              json.uri = json.uri + '/edit';
              json.url = json.url + '/edit';
            }
            json.id = item.getAttribute('data-id');
            var editUrl = json.url.substring(0, json.url.lastIndexOf('/') + 1) + item.getAttribute('data-id');
            f().api(function (headers) {
              f().http({
                url: editUrl,
                headers: headers,
                onsuccess: function (event) {
                  json.values = JSON.parse(event.target.responseText);
                  json.values = Object.assign(dataset, json.values);
                  f(item).form(json);
                  f(context.div).uiRender(context.callback);
                }
              })
            });
          } else {
            if(json.uri.indexOf('/add') < 0) {
              json.uri = json.uri + '/add';
              json.url = json.url + '/add';
            }
            json.id = null;
            json.values = Object.assign(json.values, dataset);
            f(item).form(json);
            f(context.div).uiRender(context.callback);
          }
        }
      });
    } else {
      resolve(context);
    }
  };
  f().uiPlugins().push(formPlugin);
})();