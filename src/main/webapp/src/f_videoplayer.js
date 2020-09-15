(function(){
  [#assign html]
  <video playsinline [%if(model.poster){%]poster="[%=poster%]"[%}%] [%if(model.muted === true){%]muted[%}%] [%if(model.controls === true){%]controls[%}%] [%if(model.download === false){%]oncontextmenu="return false" controlsList="nodownload"[%}%]>
  <source src="[%=url%]" type="video/mp4">
  </video>
  [/#assign]
  var templatevideoplayer = f().tc('${html?replace('\n','')?js_string}');
  function onPause(event) {
    var video = event.target;
    if(video.stat !== undefined && video.stat.t0 !== undefined && video.stat.t1 !== undefined) {
      video.json.stats.push(video.stat);
    }
    var items = [];
    var item = {};
    video.json.userDuration = 0;
    for(var i=0;i<=video.json.duration+1;i++) {
      var viewed = false;
      f(video.json.stats).each(function(stat){
        if(i>=stat.t0 && i<=stat.t1) {
          viewed = true;
        }
      });
      if(viewed) {
        if(item.t0 === undefined) {
          item.t0 = i;
        } else {
          item.t1 = i;
        }
      } else {
        if(item.t0 !== undefined && item.t1 !== undefined) {
          video.json.userDuration += (item.t1-item.t0);
          items.push(item);
          item = {};
        }
      }
    }
    video.json.percentage = ((video.json.userDuration/video.json.duration)*100).toFixed(2);
    delete video.json.userDuration;
    video.json.stats = items;
    f('videoplayer').emit({what:'pause',data:video.json});
    video.stat = undefined;
  }
  var plugin = function (resolve, context) {
    f(context.div).find('.f_videoplayer').each(function(item) {
      var json = JSON.parse(item.innerText);
      json.stats = [];
      var video = f(item).html(templatevideoplayer(json)).find('video').item;
      video.json = json;
      video.stat = undefined;
      video.addEventListener("seeked", function(event) {
        var t = event.target.currentTime;
        video.json.time = Math.floor(event.target.currentTime);
        if(video.stat !== undefined && video.stat.t0 !== undefined && (video.stat.t1 === undefined || (Math.abs(video.stat.t1-t) < 2))) {
          video.stat.t1 = Math.floor(event.target.currentTime);
        }
        f('videoplayer').emit({what:'seek',data:video.json});
      }, true);
      video.addEventListener("timeupdate", function(event) {
        var t = event.target.currentTime;
        video.json.time = Math.floor(event.target.currentTime);
        if(video.stat !== undefined && video.stat.t0 !== undefined && (video.stat.t1 === undefined || (Math.abs(video.stat.t1-t) < 2))) {
          video.stat.t1 = Math.floor(event.target.currentTime);
        }
        f('videoplayer').emit({what:'time',data:video.json});
      }, true);
      video.addEventListener("durationchange", function(event) {
        json.duration = Math.floor(event.target.duration);
        if(json.autoplay === true) {
          video.play();
        }
        f('videoplayer').emit({what:'duration',data:video.json});
      }, true);
      video.addEventListener("play", function(event) {
        video.stat = {t0:Math.floor(event.target.currentTime)};
      }, true);
      video.addEventListener("pause", onPause, true);
      video.addEventListener("ended", onPause, true);
      f(item).removeClass('f_videoplayer').addClass('f-videoplayer');
    });
    resolve(context);
  };
  f().uiPlugins().push(plugin);
})();