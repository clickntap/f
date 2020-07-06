(function () {
  [#assign html]
  [#include "f_svg.html"]
  [/#assign]
  var templatesvg = f().tc('${html?replace('\n','')?js_string}');
  var svgs = {};
  f().prototype().svg = function (w,h,tx,ty,r,clipRect) {
    var svg = {};
    var path = {};
    svg.clipRect = clipRect;
    svg.w = w;
    svg.h = h;
    svg.r = r;
    svg.tx = tx;
    svg.ty = ty;
    svg.paths = [];
    svg.markers = [];
    svg.settings = {};
    svg.init = function() {
      svg.settings = {};
      path.settings = {};
    };
    svg.set = function(name,value) {
      if(name) {
        path.settings = JSON.parse(JSON.stringify(path.settings));
        if(value) {
          path.settings[name] = value;
        } else {
          delete path.settings[name];
        }
      } else {
        path.settings = {};
      }
      svg.settings = JSON.parse(JSON.stringify(path.settings));
      return svg;
    };
    svg.circle = function(x,y,r) {
      path = {type:'circle',x:x,y:y,r:r,settings:svg.settings};
      return svg.end();
    };
    svg.image = function(x,y,w,h,url) {
      path = {type:'image',x:x,y:y,w:w,h:h,url:url,settings:svg.settings};
      return svg.end();
    };
    svg.ellipse = function(x,y,x1,y1) {
      path = {type:'ellipse',x:x,y:y,x1:x1,y1:y1,settings:svg.settings};
      return svg.end();
    };
    svg.rect = function(x,y,w,h,rx,ry,name,target) {
      path = {target:target,name:name,type:'rect',x:x,y:y,w:w,h:h,rx:rx?rx:0,ry:ry?ry:0,settings:svg.settings};
      return svg.end();
    };
    svg.text = function(x,y,w,h,size,text,textAlign) {
      path = {type:'text',x:x,y:y,w:w,h:h,size:size,text:text,textAlign:textAlign,settings:svg.settings};
      return svg.end();
    };
    svg.shape = function(shape) {
      path = {type:'shape',shape:shape,settings:svg.settings};
      return svg.end();
    };
    svg.move = function(x,y) {
      var point = {type:'M',x:x,y:y}; path.d.push(point); path.type = point.type; return svg;
    };
    svg.marker = function(marker) {
      svg.markers.push(marker);
    };
    svg.line = function(x,y) {
      var point = {type:'L',x:x,y:y}; path.d.push(point); path.type = point.type; return svg;
    };
    svg.arc = function(rx,ry,a,laf,sf,x,y) {
      var point = {type:'A',rx:rx,ry:ry,a:a,laf:laf,sf:sf,x:x,y:y}; path.d.push(point); path.type = point.type; return svg;
    };
    svg.cubic = function(x1,y1,x2,y2,x3,y3) {
      var point = {type:'C',x1:x1,y1:y1,x2:x2,y2:y2,x3:x3,y3:y3}; path.d.push(point); path.type = point.type; return svg;
    };
    svg.quadratic = function(x1,y1,x2,y2) {
      var point = {type:'Q',x1:x1,y1:y1,x2:x2,y2:y2}; path.d.push(point); path.type = point.type; return svg;
    };
    svg.close = function() {
      var point = {type:'Z'}; path.d.push(point);
      return svg.end();
    };
    svg.add = function(x, y, x1, y1) {
      if(path.type == 'C') {
        var point = {type:'S',x:x1,y:y1,x1:x,y1:y}; path.d.push(point);
      }
      if(path.type == 'Q') {
        var point = {type:'T',x:x,y:y}; path.d.push(point);
      }
      if(path.type == 'M' || path.type == 'L') {
        return svg.line(x,y);
      }
      return svg;
    };
    svg.transformStart = function(value) {
      path = {type:'transform-start',value:value}; return svg.end();
    };
    svg.transformEnd = function() {
      path = {type:'transform-end'}; return svg.end();
    };
    svg.maskStart = function(id) {
      path = {special:true,type:'mask-start',id:id,settings:svg.settings}; return svg.end();
    };
    svg.maskEnd = function() {
      path = {special:true,type:'mask-end',settings:svg.settings}; return svg.end();
    };
    svg.clipStart = function(id) {
      path = {special:true,type:'clip-start',id:id,settings:svg.settings}; return svg.end();
    };
    svg.clipEnd = function() {
      path = {special:true,type:'clip-end',settings:svg.settings}; return svg.end();
    };
    svg.groupStart = function() {
      path = {special:true,type:'group-start',settings:svg.settings}; return svg.end();
    };
    svg.groupEnd = function() {
      path = {special:true,type:'group-end',settings:svg.settings}; return svg.end();
    };
    svg.defsStart = function() {
      path = {special:true,type:'defs-start',settings:svg.settings}; return svg.end();
    };
    svg.defsEnd = function() {
      path = {special:true,type:'defs-end',settings:svg.settings}; return svg.end();
    };
    svg.end = function() {
      svg.paths.push(path); path = {d:[],settings:svg.settings}; return svg;
    };
    svg.markerEnd = function(name) {
      path.markerEnd = name;
      return svg;
    };
    svg.markerStart = function(name) {
      path.markerStart = name;
      return svg;
    };
    svg.clear = function() {
      svg.paths = [];
      path = {d:[],settings:svg.settings};
      return svg;
    };
    svg.animate = function(type, duration, repeatCount, from, to) {
      path.animateTransform = {};
      if(type) { path.animateTransform.type = type; } else { path.animateTransform.type = ''; }
      if(duration) { path.animateTransform.dur = duration; }
      if(repeatCount) { path.animateTransform.repeatCount = repeatCount; }
      if(from) { path.animateTransform.from = from; }
      if(to) { path.animateTransform.to = to; }
      return svg;
    };
    svg.render = function () {
      var html = templatesvg(svg);
      var _html = '';
      html.split('\n').forEach(function (line) {
        if (line.trim() != '') {
          _html += line;
        }
      });
      html = _html;
      svg.clear();
      return html;
    };
    return svg.clear();
  };
  f().prototype().renderSvg = function () {
    this.each(function (item) {
      f(item).removeClass('f_svg').addClass('f-svg');
      f().http({
        url: item.getAttribute('data-resource'),
        onsuccess: function (event) {
          var html = event.target.responseText;
          f(item).html(html);
        }
      });
    });
  };
  var svgPlugin = function(resolve, context) {
    var item = f(context.div).find('.f_svg').item;
    if(item) {
      var url = item.getAttribute('data-resource');
      f(item).removeClass('f_svg').addClass('f-svg');
      if(svgs[url]){
        setTimeout(function(){
          var html = svgs[url];
          f(item).html(html);
          f(context.div).uiRender(context.callback);
        },0);
      }else{
        f().http({
          url:url,
          onsuccess:function(event) {
            var html = event.target.responseText;
            svgs[url] = html;
            f(item).html(html);
            renderUi(context);
          }
        });
      }
    } else {
      resolve(context);
    }
  }
  f().uiPlugins().push(svgPlugin);
})();