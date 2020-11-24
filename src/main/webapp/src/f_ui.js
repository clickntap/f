(function () {
  var uiPlugins = [];
  var uiOnReadyPlugins = [];
  f().prototype().uiReady = function() {
    for(var i=0;i<uiOnReadyPlugins.length;i++) {
      uiOnReadyPlugins[i]();
    }
  }
  function renderUi(context) {
    var renderDiv = context.div;
    var onready = context.callback;
    var plugin;
    for(var i=0;i<uiPlugins.length;i++) {
      if(i == 0) {
        plugin = new Promise(function(resolve, reject){
          uiPlugins[i](resolve, {div:renderDiv, i:0, callback:onready});
        });
      } else {
        plugin = plugin.then(function(context) {
          return new Promise(function(resolve, reject){
            uiPlugins[++context.i](resolve, context);
          });
        })
      }
    }
    plugin.then(function(context) {
      var ok = true;
      f('[class^="f__"]').each(function(item){
        ok = false;
        item.classList.forEach(function(className){
          if(className.indexOf('f__') == 0) {
            item.classList.remove(className);
            item.classList.add(className.replace('f__','f_'));
          }
        });
      });
      if(ok) {
        onready();
        f().uiReady();
      } else {
        renderUi(context);
      }
    });
  }
  function renderDiv(target, html, options) {
    var renderDiv = document.createElement('div');
    renderDiv.classList.add('f_');
    document.body.appendChild(renderDiv);
    f(renderDiv).html(html);
    renderUi({
      div:renderDiv,
      callback:function() {
        f(target).html('');
        while (renderDiv.childNodes.length > 0) {
          target.appendChild(renderDiv.childNodes[0]);
        }
        try {
          renderDiv.parentElement.removeChild(renderDiv);
        } catch(err) {
        }
        if(options.onready) {
          options.onready();
        }
      }
    });
  }
  f().prototype().uiRender = function (callback) {
    renderUi({div:this.item, callback:callback});
  }
  f().prototype().uiPlugins = function () {
    return uiPlugins;
  }
  f().prototype().uiOnReadyPlugins = function () {
    return uiOnReadyPlugins;
  }
  f().prototype().uiPlugin = function (name, plugin, uiOnReadyPlugin) {
    var uiPlugin = function(resolve, context) {
      var item = f(context.div).find('.f_'+name).item;
      if (item) {
        eval('var json ='+item.innerText);
        json.onready = function() {
          renderUi(context);
        }
        f(item).addClass('f-'+name);
        plugin(item, json);
        f(item).removeClass('f_'+name);
      } else {
        resolve(context);
      }
    };
    uiPlugins.push(uiPlugin);
    if(uiOnReadyPlugin) {
      uiOnReadyPlugins.push(uiOnReadyPlugin);
    }
  }
  f().prototype().ui = function (options) {
    options = options || {};
    if(this.item){
      this.items.forEach(function(item){
        renderDiv(item.parentElement, item.parentElement.innerHTML, options);
      });
    } else if(options.url) {
      var template;
      try {
        template = f().t(options.url);
      } catch(err) {
      }
      if(template){
        var html = template.render(f().appSession());
        renderDiv(f(options.target).item, html, options);
      } else {
        console.log(options.url);
        f().http({
          url:options.url,
          headers:{pragma:'no-cache','Cache-Control':'no-cache'},
          onsuccess:function(event) {
            var html = event.target.responseText;
            html = f(html).t(f().appSession());
            renderDiv(f(options.target).item, html, options);
          }
        });
      }
    } else {
      var target = f(options.target).item;
      var url = target.getAttribute('data-resource');
      if (url) {
        this.ui({
          url: url,
          target:target,
          onready: options.onready?options.onready:function(){}
        });
      }
    }
    return this;
  };
})();
