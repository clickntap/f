(function(){function e(a,c){c="";if("01d"==a||"01n"==a)c+=f().icon("clear-sky");else if("02d"==a||"02n"==a)c+=f().icon("few-clouds");else if("03d"==a||"03n"==a)c+=f().icon("scattered-clouds");else if("04d"==a||"04n"==a)c+=f().icon("broken-clouds");else if("09d"==a||"09n"==a)c+=f().icon("shower-rain");else if("10d"==a||"10n"==a)c+=f().icon("rain");else if("11d"==a||"11n"==a)c+=f().icon("thunderstorm");else if("13d"==a||"13n"==a)c+=f().icon("snow");else if("50d"==a||"50n"==a)c+=f().icon("mist");return c+
    ""}f().prototype().widgetWeather=function(a){var c=f(this.item),k=f("f_weather").db([{name:"location",key:"q"}],function(m){"openweathermap"==a.provider&&k.dbGet("location",a.location.toLowerCase(),function(g){var h=0,b={};g&&(b=JSON.parse(g.data),h=((new Date).getTime()-b.timestamp)/6E4);if(g&&30>h){if(a.showInfo?(h='\x3cdiv class\x3d"weather-icon"\x3e'+e(b.weather[0].icon,a)+"\x3c/div\x3e",h+='\x3cdiv class\x3d"weather-info"\x3e\x3cspan class\x3d"weather-temp"\x3e'+Math.ceil(b.main.temp)+'\x26#176;\x26nbsp;\x26nbsp;\x3c/span\x3e\x3cspan class\x3d"weather-city"\x3e'+
          b.name+"\x3c/span\x3e\x3c/div\x3e",c.html(h)):c.html(e(b.weather[0].icon,a)),"function"==typeof a.onready)a.onready()}else h="https://api.openweathermap.org/data/2.5/weather?q\x3d"+encodeURIComponent(a.location)+"\x26appid\x3d"+encodeURIComponent(a.token)+"\x26mode\x3djson\x26units\x3dmetric\x26lang\x3d"+encodeURIComponent(a.language),f().http({url:h,timeout:500,onsuccess:function(d){b=JSON.parse(d.target.responseText);b.timestamp=(new Date).getTime();k.dbPut("location",{q:a.location.toLowerCase(),
            data:JSON.stringify(b)});a.showInfo?(d='\x3cdiv class\x3d"weather-icon"\x3e'+e(b.weather[0].icon,a)+"\x3c/div\x3e",d+='\x3cdiv class\x3d"weather-info"\x3e\x3cspan class\x3d"weather-temp"\x3e'+Math.ceil(b.main.temp)+'\x26#176;\x26nbsp;\x26nbsp;\x3c/span\x3e\x3cspan class\x3d"weather-city"\x3e'+b.name+"\x3c/span\x3e\x3c/div\x3e",c.html(d)):c.html(e(b.weather[0].icon,a));if("function"==typeof a.onready)a.onready()},onerror:function(d){try{b=JSON.parse(g.data)}catch(l){}if(g&&(a.showInfo?(d='\x3cdiv class\x3d"weather-icon"\x3e'+
            e(b.weather[0].icon,a)+"\x3c/div\x3e",d+='\x3cdiv class\x3d"weather-info"\x3e\x3cspan class\x3d"weather-temp"\x3e'+Math.ceil(b.main.temp)+'\x26#176;\x26nbsp;\x26nbsp;\x3c/span\x3e\x3cspan class\x3d"weather-city"\x3e'+b.name+"\x3c/span\x3e\x3c/div\x3e",c.html(d)):c.html(e(b.weather[0].icon,a)),"function"==typeof a.onready))a.onready()},ontimeout:function(d){try{b=JSON.parse(g.data)}catch(l){}if(g&&(a.showInfo?(d='\x3cdiv class\x3d"weather-icon"\x3e'+e(b.weather[0].icon,a)+"\x3c/div\x3e",d+='\x3cdiv class\x3d"weather-info"\x3e\x3cspan class\x3d"weather-temp"\x3e'+
            Math.ceil(b.main.temp)+'\x26#176;\x26nbsp;\x26nbsp;\x3c/span\x3e\x3cspan class\x3d"weather-city"\x3e'+b.name+"\x3c/span\x3e\x3c/div\x3e",c.html(d)):c.html(e(b.weather[0].icon,a)),"function"==typeof a.onready))a.onready()},onabort:function(d){try{b=JSON.parse(g.data)}catch(l){}if(g&&(a.showInfo?(d='\x3cdiv class\x3d"weather-icon"\x3e'+e(b.weather[0].icon,a)+"\x3c/div\x3e",d+='\x3cdiv class\x3d"weather-info"\x3e\x3cspan class\x3d"weather-temp"\x3e'+Math.ceil(b.main.temp)+'\x26#176;\x26nbsp;\x26nbsp;\x3c/span\x3e\x3cspan class\x3d"weather-city"\x3e'+
b.name+"\x3c/span\x3e\x3c/div\x3e",c.html(d)):c.html(e(b.weather[0].icon,a)),"function"==typeof a.onready))a.onready()}})})});return this};f().uiPlugins().push(function(a,c){var e=f(c.div).find(".f_weather").item;e?(a=JSON.parse(e.innerHTML),e.innerHTML="",a.onready=function(){f(c.div).uiRender(c.callback)},f(e).addClass("f-weather").widgetWeather(a).removeClass("f_weather")):a(c)})})();