(function () {
  [#assign html]
  <form>
  [%if(data.id){%]
    <input type="hidden" name="id" value="[%=data.id%]">
  [%}%]
  [%f(data.elements).each(function(row,i){%]
    <div class="f-form-row">
    [%f(row).each(function(item,j){%]
      <div class="f-form-col f-form-[%=item.type%]">
      <div class="f-form-item[%if(item.type == "password"){%] secure[%}%][%if(item.readonly === true){%] readonly[%}%]">
      [% if(item.type != 'hidden'){ %]
        <div class="f-form-label"><span class="f-tr">[%='label.'+item.name%]</span></div>
        [%if(item.type == "password"){%]
          <div class="f-form-input-mask"></div>
          <div class="f-form-eye-icon"></div>
        [%}%]
        [%if(item.type == 'select'){%]
          <div class="f-form-input f-form-input-select">
          <select onchange="f('form-select').emit({name:'[%=item.name%]', value:this.value});f(this).closest('.f-form-item').find('.f-form-error').html('');f(this).closest('.f-form-item').removeClass('error').find('input').items[0].value=this.value;">
          <option disabled selected>-</option>
          [% item.options.forEach(function(option){ %]
            <option value="[%=option.value%]">[%=option.label%]</option>
          [% }); %]
          </select>
          <div class="f-form-input-select-icon"><i class="fas fa-caret-down"></i></div>
          </div>
        [%}else if(item.type == 'search'){ %]
          <div class="f-form-input-wrap">
          <div class="f-form-input f-form-input-search">&nbsp;</div>
          <div class="f-form-input-search-icon"><i class="[%=f().fa()%] fa-search"></i></div>
          </div>
          <div class="f-form-box-component f-form-box-search hide">
          <div class="f-form-times"><i class="[%=f().fa()%] fa-times"></i></div>
          <div>
          <div class="f-form-box-search-content">
          <div class="component-search">
          {"name":"form-[%=item.name%]"}
          </div>
          <div class="component-pagination">
          {
            "name":"[%=item.name%]",
            "url":"[%=item.service%]",
            "secure":true,
            "fields":[
            {"name":"id", "width":"10%","sortable":"string","sort":"asc"},
            {"name":"name", "width":"30%","sortable":"string"}
            ],
            "search":{
              "source":"form-[%=item.name%]",
              "name":"text"
            },
            "limit":25,
            "template": "[%=item.template%]",
            "mode":"list",
            "switchMode":"no"
          }
          </div>
          </div>
          </div>
          </div>
        [%}else if(item.type == 'radio'){%]
          <div class="f-form-input f-form-input-radio">
          [% item.options.forEach(function(option){ %]
            <label>
            <input type="radio" name="[%=item.name%]" value="[%=option.value%]"/>
            <span>[%=option.label%]</span>
            </label>
          [% }); %]
          </div>
        [%}%]
        [%if(item.type == "date" || item.type == "datetime" ||  item.type == "time"){%]
          <div class="f-form-input-group f-form-input-group-[%=item.type%]">
          [%if(item.type == "date" || item.type == "datetime"){%]
            <div class="f-form-datepicker"><i class="[%=f().fa()%] fa-calendar-alt"></i></div>
            <div class="f-form-input f-form-input-2 f-form-input-day" tip="tip.input.day" contenteditable="plaintext-only" spellcheck="false"></div>
            <div class="f-form-sep">/</div>
            <div class="f-form-input f-form-input-2 f-form-input-month" tip="tip.input.month" contenteditable="plaintext-only" spellcheck="false"></div>
            <div class="f-form-sep">/</div>
            <div class="f-form-input f-form-input-4 f-form-input-year" tip="tip.input.year" contenteditable="plaintext-only" spellcheck="false"></div>
          [%}%]
          [%if(item.type == "datetime" || item.type == "time"){%]
            <div class="f-form-sep"></div>
            <div class="f-form-input f-form-input-2 f-form-input-hour" tip="tip.input.hour" contenteditable="plaintext-only" spellcheck="false"></div>
            <div class="f-form-sep">:</div>
            <div class="f-form-input f-form-input-2 f-form-input-minute" tip="tip.input.minute" contenteditable="plaintext-only" spellcheck="false"></div>
          [%}%]
          <div class="f-form-datepicker-clean hide"><i class="[%=f().fa()%] fa-times"></i></div>
          </div>
          <div class="f-form-box-component f-form-box-datepicker hide">
          <div class="f-form-times"><i class="[%=f().fa()%] fa-times"></i></div>
          <div>
          <div class="f-form-box-datepicker-content">
          <div class="component-datepicker">
          {"name":"form-[%=item.name%]"}
          </div>
          </div>
          </div>
          </div>
        [%}else if(item.type != 'select' && item.type != 'radio' && item.type != 'search'){%]
          <div class="f-form-input" contenteditable="plaintext-only" spellcheck="false" name="[%=item.name%]" multiline="[%=item.multiline%]" type="[%=item.type%]">[%if(item.value){%][%=item.value%][%}%]</div>
        [%}%]
        [%if(item.type == "date" || item.type == "datetime" || item.type == "time"){%]
          <div class="f-form-tip">&nbsp;</div>
          <div class="f-form-value">&nbsp;</div>
        [%}%]
        <div class="f-form-error"></div>
        <div class="f-form-field-warning"></div>
      [% } %]
      [% if(item.type == 'hidden'){ %]
        <div class="f-form-input f-form-input-hidden"></div>
      [% } %]
      [% if(item.type != 'radio'){ %]
        <input type="hidden" name="[%=item.name%]">
      [% } %]
      </div>
      </div>
    [%});%]
    </div>
  [%});%]
  <div class="f-form-warning"></div>
  </form>
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
  function ascii7(text) {
    return ascii(text, 127);
  }
  function ascii8(text) {
    return ascii(text, 255);
  }
  function ascii7i(text) {
    var asciitext = '';
    var x0 = 0,x1 = 0,x2 = 0;
    while((x1 = text.indexOf('&#',x1)) >= 0) {
      asciitext += text.substring(x0,x1);
      x1 += 2;
      x2 = x1;
      x0 = x2;
      x2 = text.indexOf(';',x2);
      try {
        asciitext += String.fromCodePoint(parseInt(text.substring(x1,x2)));
        x0 = x2+1;
      } catch(err) {
      }
    }
    asciitext += text.substring(x0);
    return asciitext;
  }
  function ascii(text,limit) {
    var asciitext = '';
    for (var i = 0; i < text.length; i++) {
      var charCode = text.codePointAt(i);
      if(charCode <= limit) {
        asciitext += String.fromCodePoint(charCode);
      } else {
        var char = String.fromCodePoint(charCode);
        i += (char.length-1);
        asciitext += ('&#'+charCode+';');
      }
    }
    return asciitext;
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
        var observer = new MutationObserver(function(mutations) {
          observer.disconnect();
          var value = ascii7(item.innerText.trim());
          var currentValue = value;
          value = value.replaceAll('&#778;','&#730;');
          if(currentValue != value) {
            item.innerHTML = value;
          }
          value = ascii8(ascii7i(item.innerText));
          observer.observe(item, {childList: true, subtree: true, characterData:true, attributes:true});
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
          var group = f(item.parentElement).closest('.f-form-input-group');
          if (group.items) {
            value = handleDate(item, f(item.parentElement).closest('.f-form-input-group'));
            var userEnteredDate = new Date(Date.parse(value));
            var localDateString = '' + userEnteredDate.toLocaleDateString(f('html').item.getAttribute('lang'), {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
            if (group.hasClass('f-form-input-group-datetime')) {
              localDateString += ' <i class="fal fa-clock"></i> ' + userEnteredDate.toLocaleTimeString(f('html').item.getAttribute('lang'), {
                hour12: false,
                timeStyle: 'short'
              });
            }
            if (group.hasClass('f-form-input-group-time')) {
              localDateString = '&nbsp; <i class="fal fa-clock"></i> ' + userEnteredDate.toLocaleTimeString(f('html').item.getAttribute('lang'), {
                hour12: false,
                timeStyle: 'short'
              });
            }
            if (isNaN(userEnteredDate.getTime())) {
              value = '';
              f(item).closest('.f-form-item').find('.f-form-value').item.innerHTML = '&nbsp;';
            } else {
              f(item).closest('.f-form-item').find('.f-form-value').item.innerHTML = localDateString;
            }
          }
          var input = f(item).closest('.f-form-item').find('input').item;
          input.value = value;
          f('form-change').emit({ form: data });
        });
        observer.observe(item, {childList: true, subtree: true, characterData:true, attributes:true});
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
        //headers: {pragma:'no-cache','Cache-Control':'no-cache'},
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
            if(json.uri && json.uri.indexOf('/add') < 0) {
              json.uri = json.uri + '/add';
              json.url = json.url + '/add';
            }
            json.id = null;
            json.values = Object.assign(json.values, dataset);
            f(item).form(json);
            f(context.div).uiRender(context.callback);
          }
        },
        onerror:function() {
          f(context.div).uiRender(context.callback);
        }
      });
    } else {
      resolve(context);
    }
  };
  f().uiPlugins().push(formPlugin);
})();
