(function () {
  var _serverURL;
  f().prototype().serverURL = function (serverURL) {
    if(!serverURL) {
      if(_serverURL) {
        return _serverURL;
      } else {
        if(document.location) {
          var url = document.location.protocol+'//'+document.location.hostname;
          if(document.location.port && document.location.port != '') {
            url += ':';
            url += document.location.port;
          }
          url += '/';
          _serverURL = serverURL;
        }
        return url;
      }
    } else {
      _serverURL = serverURL;
    }
  }
  String.prototype.equals = function(compare){
    try{
      return this.toString() === compare.toString();
    }catch(e){
      return false;
    }
  }
  String.prototype.equalsIgnoreCase = function(compare){
    try{
      return this.toLowerCase().equals(compare.toLowerCase());
    }catch(e){
      return false;
    }
  }
  String.prototype.contains = function(compare){
    try{
      return this.indexOf(compare) != -1;
    }catch(e){
      return false;
    }
  }
  String.prototype.containsIgnoreCase = function(compare){
    try{
      return this.toLowerCase().contains(compare.toLowerCase());
    }catch(e){
      return false;
    }
  }
  String.prototype.startsWith = function(compare){
    try{
      var start = this.indexOf(compare);
      var end = start+compare.length;
      var stringFound = this.substring(start, end);
      var firstCharacters = this.substring(0, end);
      return stringFound.equals(firstCharacters);
    }catch(e){
      return false;
    }
  }
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  Date.parse = function (date) {
    try {
      if (typeof (date) == 'string') {
        var o = date.split(/[^0-9]/);
        var year = o[0];
        var month = o.length > 1 ? o[1] - 1 : 0;
        var day = o.length > 2 ? o[2]: 0;
        var hour = o.length > 3 ? o[3] : 0;
        var minute = o.length > 4 ? o[4] : 0;
        var second = o.length > 5 ? o[5] : 0;
        return new Date(year, month, day, hour, minute, second);
      } else {
        return new Date(date);
      }
    } catch (e) {
      return new Date();
    }
  };
  Date.prototype.isInvalid = function () {
    if (isNaN(this.getTime())) return true
    return false;
  };
  Date.prototype.getTimestamp = function(){
    return this.getTime()/1000;
  }
  Date.prototype.getISOTimestamp = function(){
    return Date.parse(this.toISOString()).getTime()/1000;
  }
  Date.prototype.add = function (what, time) {
    var minute = 60000;
    if (what == 'minutes') {
      this.setTime(this.getTime() + (time * minute));
    } else if (what == 'hours') {
      this.setTime(this.getTime() + (time * (60 * minute)));
    } else if (what == 'days') {
      this.setTime(this.getTime() + (time * (24 * (60 * minute))));
    }
    return this;
  };
  Date.prototype.clone = function () {
    return new Date(this);
  };
  Date.prototype.yesterday = function () {
    this.getDate(this.getDate() - 1);
    return this;
  };
  Date.prototype.tomorrow = function () {
    this.getDate(this.getDate() + 1);
    return this;
  };
  Date.prototype.prevYear = function () {
    var currentYear = this.getFullYear();
    while(currentYear == this.getFullYear()) {
      this.setFullYear(this.getFullYear() - 1);
    }
    return this;
  };
  Date.prototype.nextYear = function () {
    var currentYear = this.getFullYear();
    while(currentYear == this.getFullYear()) {
      this.setFullYear(this.getFullYear() + 1);
    }
    return this;
  };
  Date.prototype.prevMonth = function () {
    var currentMonth = this.getMonth();
    while(currentMonth == this.getMonth()) {
      this.setMonth(this.getMonth() - 1);
    }
    return this;
  };
  Date.prototype.nextMonth = function () {
    var currentMonth = this.getMonth();
    while(currentMonth == this.getMonth()) {
      this.setMonth(this.getMonth() + 1);
    }
    return this;
  };
  Date.prototype.prevWeek = function () {
    this.setDate(this.getDate() - 7)
    return this;
  };
  Date.prototype.nextWeek = function () {
    this.setDate(this.getDate() + 7)
    return this;
  };
  Date.prototype.dayStart = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    return this;
  };
  Date.prototype.dayEnd = function () {
    this.setHours(23);
    this.setMinutes(59);
    this.setSeconds(59);
    return this;
  };
  Date.prototype.monthStart = function () {
    this.setDate(1);
    this.dayStart();
    return this;
  };
  Date.prototype.monthEnd = function () {
    this.setDate(this.getMaxDayOfMonth());
    this.dayEnd();
    return this;
  };
  Date.prototype.getMaxDayOfMonth = function () {
    var date = new Date(this.getFullYear(), this.getMonth(), 1);
    var dayOfMonth = 0;
    while (date.getMonth() == this.getMonth()) {
      dayOfMonth++;
      date.tomorrow();
    };
    return dayOfMonth;
  };
  Date.prototype.getStartOfWeek = function () {
    while (this.getDay() != 1) {
      this.setDate(this.getDate() - 1);
    }
    return this;
  };
  Date.prototype.getWeeksInMonth = function () {
    return Math.ceil(this.getMaxDayOfMonth() / 7);
  };
  Date.prototype.getWeeksInYear = function () {
    var date = new Date(this.getFullYear(), 0, 1);
    var dayOfYear = 0;
    while (date.getFullYear() == this.getFullYear()) {
      dayOfYear += date.getMaxDayOfMonth();
      date.nextMonth();
    };
    return Math.round(dayOfYear / 7);
  };
  Date.prototype.getMonthMonday = function () {
    this.setDate(1);
    this.getStartOfWeek();
    return this;
  };
  Date.prototype.format = function (options, language) {
    if (options) {
      language = language || 'en';
      return this.toLocaleDateString(language, options);
    } else {
      var month = ('000' + (this.getMonth() + 1)).slice(-2);
      var date = ('000' + this.getDate()).slice(-2);
      var hour = ('000' + this.getHours()).slice(-2);
      var minute = ('000' + this.getMinutes()).slice(-2);
      var second = ('000' + this.getSeconds()).slice(-2);
      return this.getFullYear() + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    }
  };
  Date.prototype.datetimeAsParam = function () {
    return this.format();
  };
  Date.prototype.dateAsParam = function () {
    var month = ('000' + (this.getMonth() + 1)).slice(-2);
    var date = ('000' + this.getDate()).slice(-2);
    return this.getFullYear() + '-' + month + '-' + date;
  };
  Date.prototype.datetimeAsParam = function () {
    var month = ('000' + (this.getMonth() + 1)).slice(-2);
    var date = ('000' + this.getDate()).slice(-2);
    var hour = ('000' + this.getHours()).slice(-2);
    var minute = ('000' + this.getMinutes()).slice(-2);
    return this.getFullYear() + '-' + month + '-' + date+' '+hour+':'+minute;
  };
  Date.prototype.time = function (options, language) {
    options = options || {};
    language = language || 'en';
    return this.toLocaleTimeString(language, options);
  };
  String.prototype.normalize = function () {
    var string = this;
    var newString = '';
    for (var i = 0; i < string.length; i++) {
      var character = string.charAt(i);
      if (isNaN(character) && character == character.toUpperCase()) {
        newString += '-' + character.toLowerCase();
      } else {
        newString += character;
      }
    }
    return newString;
  };
  String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
  };
  JSON.parse = function (jsonAsString) {
    eval('var json = '+jsonAsString);
    return json;
  }
  function stageReady() {
    f('.f-overlay').each(function(overlay) {
      if(overlay.dataset.background) {
        overlay.style.backgroundImage = 'url('+overlay.dataset.background+')';
      }
    });
  }
  function stageResize() {
    f('.f-a4h').each(function (item, index) {
      var rect = item.parentElement.getBoundingClientRect();
      item.style.height = Math.round(rect.width*2100/2970)+'px';
    });
    f('.f-a4v').each(function (item, index) {
      var rect = item.parentElement.getBoundingClientRect();
      item.style.height = Math.round(rect.width*2970/2100)+'px';
    });
    f('.f-16_9').each(function (item, index) {
      var rect = item.parentElement.getBoundingClientRect();
      item.style.height = Math.round(rect.width*9/16)+'px';
    });
    f('.f-square').each(function (item, index) {
      var rect = item.parentElement.getBoundingClientRect();
      item.style.height = Math.round(rect.width)+'px';
    });
    f('.f-stage').each(function (item, index) {
      var rect = item.parentElement.getBoundingClientRect();
      var stagew = parseInt(item.getAttribute('data-width'));
      var stageh = parseInt(item.getAttribute('data-height'));
      var parentw = rect.width;
      var parenth = rect.height;
      var scale = parentw/stagew;
      if(parentw/parenth > stagew/stageh) {
        scale = parenth/stageh;
      }
      item.style.position = 'absolute';
      item.style.top = '50%';
      item.style.left = '50%';
      item.style.width = stagew+'px';
      item.style.height = stageh+'px';
      item.style.transform = 'translate(-50%,-50%) scale('+scale+','+scale+')';
      item.setAttribute('scale',scale);
    });
  }
  f(window).on('resize', function(){
    stageResize();
  });
  f().uiOnReadyPlugins().push(stageResize);
  f().uiOnReadyPlugins().push(stageReady);
})();