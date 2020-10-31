(function () {
  var noParseDelimiters = ['~{~','~}~'];
  var libTemplates = {};
  function tc(src, options) {
    if(!options) {
      options = {delimiters:['[%','%]'],comments:true};
    }
    if(options.comments === true) {
      var _scripts = {};
      var _src = '';
      src.split('\n').forEach(function(line) {
        if(line.trim().indexOf('//') != 0) {
          _src += line+'\n';
        }
      });
      src = _src;
      var x1;
      while((x1 = src.indexOf('/*')) >= 0) {
        var x2 = src.indexOf('*/', x1);
        src = src.substring(0,x1)+src.substring(x2+2);
      }
      while((x1 = src.indexOf('<!--')) >= 0) {
        var x2 = src.indexOf('-->', x1);
        src = src.substring(0,x1)+src.substring(x2+3);
      }
    }
    var scriptIndex = 0;
    x1 = 0;
    while((x1 = src.indexOf('<script name=', x1)) >= 0) {
      x1 = src.indexOf('>',x1)+1;
      var x2 = src.indexOf('</script>', x1);
      var script = src.substring(x1,x2);
      script = script.split(options.delimiters[0]).join(noParseDelimiters[0]);
      script = script.split(options.delimiters[1]).join(noParseDelimiters[1]);
      src = src.substring(0,x1)+script+src.substring(x2);
    }
    var t = '';
    t += '(function(model){if(model)for(var key in model) eval("var "+key+"=model."+key);';
      t += 'var _="";';
      var x1;
      while((x1 = src.indexOf(options.delimiters[0])) >= 0) {
        var x2 = src.indexOf(options.delimiters[1], x1);
        var html = JSON.stringify(src.substring(0,x1));
        if(html != '""') {
          t +='_+='+html+';';
        }
        html = src.substring(x1+2,x2);
        if(html.charAt(0) == '=') {
          html = html.substring(1);
          t += '_+= '+html+';';
        } else {
          if(html != '') {
            t += html+';';
          }
        }
        src = src.substring(x2+2);
      }
      t +='_+='+JSON.stringify(src)+';';
    t += 'return _;});\n';
    try {
      t = t.split(noParseDelimiters[0]).join(options.delimiters[0]);
      t = t.split(noParseDelimiters[1]).join(options.delimiters[1]);
    } catch(err) {
    }
    return eval(t);
  }
  f().prototype().tc = tc;
  f().prototype().t = function (data, options) {
    if(Array.isArray(data)) {
      f(data).each(function(template) {
        libTemplates[template.url] = f(template.code).t();
      });
      return;
    }
    if(libTemplates[data]) {
      return libTemplates[data];
    }
    if(data) {
      return (tc(this.input, options))(data);
    } else {
      return {render:(tc(this.input, options))};
    }
  };
  function renderTemplate(item,url,target,context) {
    if(libTemplates[url]) {
      setTimeout(function() {
        var template = libTemplates[url];
        var data = f().appSession();
        if (target) data = f().app().get(target);
        var html = template.render(data);
        f(item).html(html);
        if(context) f(context.div).uiRender(context.callback);
      }, 0);
    } else {
      f().http({
        url:url,
        headers:{pragma:'no-cache','Cache-Control':'no-cache'},
        onsuccess:function(event) {
          var template = event.target.responseText;
          libTemplates[url] = f(template).t();
          var data = f().appSession();
          if (target) data = f().app().get(target);
          var html = libTemplates[url].render(data);
          f(item).html(html);
          f(context.div).uiRender(context.callback);
        }
      });
    }
  }
  function tService(service, signedHeaders, url, model, target, item, context) {
    signedHeaders['pragma'] = 'no-cache';
    signedHeaders['Cache-Control'] = 'no-cache';
    f().http({
      url:service,
      headers:signedHeaders,
      onsuccess:function(event) {
        var json = JSON.parse(event.target.responseText);
        f().app().set(model, json);
        renderTemplate(item,url,target,context);
      }
    });
  }
  var tPlugin = function(resolve, context) {
    var item = f(context.div).find('.f_t').item;
    if (item) {
      f(item).removeClass('f_t').addClass('f-t');
      var url = item.getAttribute('data-resource');
      var service = item.getAttribute('data-service');
      var secure = item.getAttribute('data-secure');
      var model = item.getAttribute('data-model');
      var target = item.getAttribute('data-target');
      if(service){
        if (secure == 'true') {
          f().api(function(apiHeaders){
            tService(service, apiHeaders, url, model, target, item, context);
          }, item.getAttribute('data-channel'));
        }else{
          tService(service, {}, url, model, target, item, context);
        }
      } else {
        renderTemplate(item,url,target,context);
      }
    } else {
      resolve(context);
    }
  };
  f().uiPlugins().push(tPlugin);
})();