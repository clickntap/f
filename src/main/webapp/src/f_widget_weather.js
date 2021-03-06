(function () {
  function renderWeatherIcon(icon, settings) {
    var html = '';
    if(icon == '01d' || icon == '01n') {
      html += f().icon('clear-sky');
    } else if(icon == '02d' || icon == '02n') {
      html += f().icon('few-clouds');
    } else if(icon == '03d' || icon == '03n') {
      html += f().icon('scattered-clouds');
    } else if(icon == '04d' || icon == '04n') {
      html += f().icon('broken-clouds');
    } else if(icon == '09d' || icon == '09n') {
      html += f().icon('shower-rain');
    } else if(icon == '10d' || icon == '10n') {
      html += f().icon('rain');
    } else if(icon == '11d' || icon == '11n') {
      html += f().icon('thunderstorm');
    } else if(icon == '13d' || icon == '13n') {
      html += f().icon('snow');
    } else if(icon == '50d' || icon == '50n') {
      html += f().icon('mist');
    }
    html += '';
    return html;
  }
  f().prototype().widgetWeather = function(settings) {
    var me = f(this.item);
    var db = f('f_weather').db([{name:'location',key:'q'}], function(event) {
      if(settings.provider == 'openweathermap') {
        db.dbGet('location',settings.location.toLowerCase(),function(result) {
          var minutes = 0;
          var json = {};
          if(result) {
            json = JSON.parse(result.data);
            minutes = (new Date().getTime()-json.timestamp)/60000;
          }
          if(result && minutes < 30) {
            if(settings.showInfo){
              var html = '<div class="weather-icon">'+renderWeatherIcon(json.weather[0].icon, settings)+'</div>';
              html += '<div class="weather-info"><span class="weather-temp">'+Math.ceil(json.main.temp)+'&#176;&nbsp;&nbsp;</span><span class="weather-city">'+json.name+'</span></div>';
              me.html(html);
            }else{
              me.html(renderWeatherIcon(json.weather[0].icon, settings));
            }
            if(typeof(settings.onready) == 'function') settings.onready();
          } else {
            var url = 'https://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(settings.location)+'&appid='+encodeURIComponent(settings.token)+'&mode=json&units=metric&lang='+encodeURIComponent(settings.language)+'';
            f().http({
              url:url,
              timeout: 500,
              onsuccess:function(event){
                json = JSON.parse(event.target.responseText);
                json.timestamp = new Date().getTime();
                db.dbPut('location', {q:settings.location.toLowerCase(),data:JSON.stringify(json)});
                if(settings.showInfo){
                  var html = '<div class="weather-icon">'+renderWeatherIcon(json.weather[0].icon, settings)+'</div>';
                  html += '<div class="weather-info"><span class="weather-temp">'+Math.ceil(json.main.temp)+'&#176;&nbsp;&nbsp;</span><span class="weather-city">'+json.name+'</span></div>';
                  me.html(html);
                }else{
                  me.html(renderWeatherIcon(json.weather[0].icon, settings));
                }
                if(typeof(settings.onready) == 'function') settings.onready();
              },
              onerror:function(event){
                try{
                  json = JSON.parse(result.data);
                }catch(e){}
                if(result) {
                  if(settings.showInfo){
                    var html = '<div class="weather-icon">'+renderWeatherIcon(json.weather[0].icon, settings)+'</div>';
                    html += '<div class="weather-info"><span class="weather-temp">'+Math.ceil(json.main.temp)+'&#176;&nbsp;&nbsp;</span><span class="weather-city">'+json.name+'</span></div>';
                    me.html(html);
                  }else{
                    me.html(renderWeatherIcon(json.weather[0].icon, settings));
                  }
                  if(typeof(settings.onready) == 'function') settings.onready();
                }
              },
              ontimeout:function(event) {
                try{
                  json = JSON.parse(result.data);
                }catch(e){}
                if(result) {
                  if(settings.showInfo){
                    var html = '<div class="weather-icon">'+renderWeatherIcon(json.weather[0].icon, settings)+'</div>';
                    html += '<div class="weather-info"><span class="weather-temp">'+Math.ceil(json.main.temp)+'&#176;&nbsp;&nbsp;</span><span class="weather-city">'+json.name+'</span></div>';
                    me.html(html);
                  }else{
                    me.html(renderWeatherIcon(json.weather[0].icon, settings));
                  }
                  if(typeof(settings.onready) == 'function') settings.onready();
                }
              },
              onabort:function(event) {
                try{
                  json = JSON.parse(result.data);
                }catch(e){}
                if(result) {
                  if(settings.showInfo){
                    var html = '<div class="weather-icon">'+renderWeatherIcon(json.weather[0].icon, settings)+'</div>';
                    html += '<div class="weather-info"><span class="weather-temp">'+Math.ceil(json.main.temp)+'&#176;&nbsp;&nbsp;</span><span class="weather-city">'+json.name+'</span></div>';
                    me.html(html);
                  }else{
                    me.html(renderWeatherIcon(json.weather[0].icon, settings));
                  }
                  if(typeof(settings.onready) == 'function') settings.onready();
                }
              }
            });
          }
        });
      }
    });
    return this;
  };
  var weatherPlugin = function (resolve, context) {
    var item = f(context.div).find('.f_weather').item;
    if (item) {
      var json = JSON.parse(item.innerHTML);
      item.innerHTML = '';
      json.onready = function() {
        f(context.div).uiRender(context.callback);
      }
      f(item).addClass('f-weather').widgetWeather(json).removeClass('f_weather');
    }else{
      resolve(context);
    }
  };
  f().uiPlugins().push(weatherPlugin);
})();