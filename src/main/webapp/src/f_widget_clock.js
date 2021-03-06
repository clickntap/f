(function () {
  function renderClock(settings) {
    var d = new Date();
    var svg = f().svg(100, 100);
    svg.set('class','f-widget-clock');
    svg.set('stroke', f().color('gray0'));
    svg.set('strokeLinecap',settings.cap?settings.cap:'butt');
    svg.set('strokeLinejoin','miter');
    for(var i=0;i<60;i+=5) {
      svg.set('transform','rotate('+(i*6)+' 50 50)');
      svg.set('strokeWidth', 0.75);
      svg.move(50,10).line(50,15).end();
    }
    for(var i=0;i<60;i++) {
      svg.set('transform','rotate('+(i*6)+' 50 50)');
      svg.set('strokeWidth', 0.25);
      svg.move(50,10).line(50,12.5).end();
    }
    var start = (d.getHours()+d.getMinutes()/60+d.getSeconds()/3600)*360/12;
    if(settings.animated != "no") {
      svg.animate('rotate', '43200s', 'indefinite', start+' 50 50', (start+360)+' 50 50');
    }
    svg.set('class','f-hours');
    svg.set('stroke', f().color('gray1'));
    svg.set('fill', f().color('gray1'));
    svg.set('strokeWidth', 4);
    svg.set('transform','rotate('+start+' 50 50)');
    svg.move(50,50).line(50,30).end();
    var start = (d.getMinutes()+d.getSeconds()/60)*360/60;
    if(settings.animated != "no") {
      svg.animate('rotate', '3600s', 'indefinite', start+' 50 50', (start+360)+' 50 50');
    }
    svg.set('class','f-minutes');
    svg.set('stroke', f().color('gray2'));
    svg.set('fill', f().color('gray2'));
    svg.set('strokeWidth', 2);
    svg.set('transform','rotate('+start+' 50 50)');
    svg.move(50,50).line(50,20).end();
    svg.circle(50,50,3);
    if(settings.showSeconds != "no") {
      var start = (d.getSeconds()+d.getMilliseconds()/1000)*360/60;
      if(settings.animated != "no") {
        svg.animate('rotate', '60s', 'indefinite', start+' 50 50', (start+360)+' 50 50');
      }
      svg.set('class','f-seconds');
      svg.set('stroke', f().color('gray3'));
      svg.set('fill', f().color('gray3'));
      svg.set('strokeWidth', 1);
      svg.set('transform','rotate('+start+' 50 50)');
      svg.move(50,50).line(50,10).end();
      svg.animate();
      svg.set('class', 'f-seconds');
      svg.circle(50,50,1.5);
    }
    return svg.render();
  }
  f().prototype().widgetClock = function(settings) {
    var me = f(this.item);
    me.html(renderClock(settings));
    return this;
  };
  var clockPlugin = function (resolve, context) {
    var item = f(context.div).find('.f_clock').item;
    if (item) {
      f(item).widgetClock(JSON.parse(JSON.stringify(item.dataset))).removeClass('f_clock').addClass('f-clock');
    }
    resolve(context);
  };
  f().uiPlugins().push(clockPlugin);
})();