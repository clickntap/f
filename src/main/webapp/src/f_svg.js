(function () {
  [#assign html]
  <svg viewBox="0,0,[%=w%],[%=h%]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  [%if(r){%]
    <g transform="rotate([%=r%] [%=w/2%] [%=h/2%])">
  [%}%]
  [%if(typeof tx !== 'undefined' && typeof ty !== 'undefined' && (tx != 0 || ty != 0)) { %]
    <g transform="translate([%=tx%] [%=ty%])">
  [%}%]
  [%if(clipRect) { var clipRectUid = Math.random().toString(36).substr(2, 9); %]
    <clipPath id="clip-rect-[%=clipRectUid%]">
    <rect x="[%=clipRect.x%]" y="[%=clipRect.y%]" width="[%=clipRect.w%]" height="[%=clipRect.h%]" />
    </clipPath>
    <g clip-path="url(#clip-rect-[%=clipRectUid%])">
  [%}%]
  [%
  var svgId = Math.random().toString(36).substr(2, 9);
  var grouped = false;
  %]
  [%f(paths).each(function(path, index){
    var uid = Math.random().toString(36).substr(2, 9);
    %]
    [%if(path.type == 'text'){%]
      <g [%if(path.settings.transform){%]class="[%=path.settings.class%]"[%}%] [%if(path.settings.transform){%] transform="[%=path.settings.transform%]"[%}%] fill="[%=path.settings.fill%]" [%if(!isNaN(path.size)){%]style="font-size:[%=path.size%]px"[%}%]>
      [%
      var lines = path.text.split('\n');
      var offsetY = (path.h-lines.length*path.size)/2-path.size/8;
      %]
      [%f(lines).each(function(line, index) {%]
        [%if(path.textAlign == 1){%]
          <text <!--textLength="[%=path.w%]" lengthAdjust="spacingAndGlyphs"--> x="[%=path.x%]" y="[%=offsetY+path.y+path.size*(index+1)%]" style="text-anchor: start">[%=line%]</text>
        [%}%]
        [%if(path.textAlign == 2){%]
          <text <!--textLength="[%=path.w%]" lengthAdjust="spacingAndGlyphs"--> x="[%=path.x+path.w/2%]" y="[%=offsetY+path.y+path.size*(index+1)%]" style="text-anchor: middle">[%=line%]</text>
        [%}%]
        [%if(path.textAlign == 3){%]
          <text <!--textLength="[%=path.w%]" lengthAdjust="spacingAndGlyphs"--> x="[%=path.x+path.w%]" y="[%=offsetY+path.y+path.size*(index+1)%]" style="text-anchor: end">[%=line%]</text>
        [%}%]
      [%})%]
      </g>
    [%}else if(path.type == 'transform-start'){%]
      <g transform="[%=path.value%]">
      <!-- <g transform="translate([%=202%] [%=(path.ty)%]) rotate(-90 1050 1485)"> -->
    [%}else if(path.type == 'transform-end'){%]
      </g>
    [%}else if(path.type == 'image'){%]
      <g [%if(path.settings.transform){%] transform="[%=path.settings.transform%]"[%}%]>
      <image xlink:href="[%=path.url%]" x="[%=path.x%]" y="[%=path.y%]" width="[%=path.w%]" height="[%=path.h%]" [%if(path.settings.mask){%] mask="url(#[%=path.settings.mask%]_[%=svgId%])"[%}%]></image>
      </g>
    [%}else if(path.type == 'shape'){%]
      <g [%if(path.settings.transform){%] transform="[%=path.settings.transform%]"[%}%]>
      <path d="[%=path.shape%]" fill="[%=path.settings.fill%]" fill-opacity="[%=path.settings.fillOpacity%]" stroke="[%=path.settings.stroke%]" stroke-opacity="[%=path.settings.strokeOpacity%]"></path>
      </g>
    [%}else{%]
      [%if(path.special === true){%]
        [%if(path.type == 'group-start'){ grouped = true; %] <g [%}%]
        [%if(path.type == 'group-end'){ grouped = false; %] </g [%}%]
        [%if(path.type == 'defs-start'){ %] <defs  [%}%]
        [%if(path.type == 'defs-end'){ %] </defs [%}%]
        [%if(path.type == 'mask-start'){ %] <mask id="[%=path.id%]_[%=svgId%]" [%}%]
        [%if(path.type == 'mask-end'){ %] </mask [%}%]
        [%if(path.type == 'clip-start'){ %] <clipPath id="[%=path.id%]_[%=svgId%]" [%}%]
        [%if(path.type == 'clip-end'){ %] </clipPath [%}%]
      [%}else{%]
        [%if(path.type == 'rect'){%]
          <rect x="[%=path.x%]" y="[%=path.y%]" rx="[%=path.rx%]" ry="[%=path.ry%]" width="[%=path.w%]" height="[%=path.h%]"
        [%}else if(path.type == 'circle'){%]
          <circle cx="[%=path.x%]" cy="[%=path.y%]" r="[%=path.r%]"
        [%}else if(path.type == 'ellipse'){%]
          <ellipse cx="[%=path.x%]" cy="[%=path.y%]" rx="[%=path.x1%]" ry="[%=path.y1%]"
        [%}else{%]
          <defs>
          [%f(markers).each(function(marker, index){ %]
            <marker
            id="[%=marker.name%]_[%=uid%]"
            [%if(marker.r){%]
              refX="[%=marker.r%]"
              refY="[%=marker.r%]"
              viewBox="0 0 [%=marker.r*2%] [%=marker.r*2%]"
              markerWidth="[%=marker.r*2%]"
              markerHeight="[%=marker.r*2%]"
            [%}else{%]
              refX="[%=marker.w/2%]"
              refY="[%=marker.h/2%]"
              viewBox="0 0 [%=marker.w%] [%=marker.h%]"
              markerWidth="[%=marker.w%]"
              markerHeight="[%=marker.h%]"
            [%}%]
            orient="auto">
            [%if(marker.r){%]
              <circle cx="[%=marker.x%]" cy="[%=marker.y%]" r="[%=marker.r%]" fill="[%=path.settings.stroke%]" [%if(path.settings.strokeOpacity){%] fill-opacity="[%=path.settings.strokeOpacity%]"[%}%]></circle>
            [%}else{%]
              <path d="[%=marker.d%]" fill="[%=path.settings.stroke%]" [%if(path.settings.strokeOpacity){%] fill-opacity="[%=path.settings.strokeOpacity%]"[%}%]></path>
            [%}%]
            </marker>
          [%})%]
          </defs>
          <path d="[%f(path.d).each(function(point, index){%][%if(index != 0){%] [%}%][%=point.type%][%if(point.type == "M" || point.type == "L"){%][%=point.x%],[%=point.y%][%}%][%if(point.type == "C"){%][%=point.x2%],[%=point.y2%],[%=point.x3%],[%=point.y3%],[%=point.x1%],[%=point.y1%] [%}%][%if(point.type == "S"){%][%=point.x%],[%=point.y%],[%=point.x1%],[%=point.y1%][%}%][%if(point.type == "Q"){%][%=point.x2%],[%=point.y2%] [%=point.x1%],[%=point.y1%][%}%][%if(point.type == "T"){%][%=point.x%],[%=point.y%][%}%][%if(point.type == "A"){%][%=point.rx%],[%=point.ry%],[%=point.a%],[%=point.laf%],[%=point.sf%],[%=point.x%],[%=point.y%][%}%][%});%]"
        [%}%]
      [%}%]
      [%if((grouped && path.special === true) || (!grouped && !path.special)){%]
        [%if(path.settings.fill){%] fill="[%=path.settings.fill%]"[%}%]
        [%if(path.settings.stroke){%] stroke="[%=path.settings.stroke%]"[%}%]
        [%if(path.settings.strokeWidth){%] stroke-width="[%=path.settings.strokeWidth%]"[%}%]
        [%if(path.settings.strokeOpacity){%] stroke-opacity="[%=path.settings.strokeOpacity%]"[%}%]
        [%if(path.settings.strokeDashArray){%] stroke-dasharray="[%=path.settings.strokeDashArray%]"[%}%]
        [%if(path.settings.strokeLinecap){%] stroke-linecap="[%=path.settings.strokeLinecap%]"[%}%]
        [%if(path.settings.strokeLinejoin){%] stroke-linejoin="[%=path.settings.strokeLinejoin%]"[%}%]
        [%if(path.settings.fillOpacity){%] fill-opacity="[%=path.settings.fillOpacity%]"[%}%]
        [%if(path.settings.clip){%] clip-path="url(#[%=path.settings.clip%]_[%=svgId%])"[%}%]
        [%if(path.settings.mask){%] mask="url(#[%=path.settings.mask%]_[%=svgId%])"[%}%]
        [%if(path.settings.transform){%] transform="[%=path.settings.transform%]"[%}%]
        [%if(path.settings.opacity){%] opacity="[%=path.settings.opacity%]"[%}%]
        [%if(path.settings.class){%] class="[%=path.settings.class%]"[%}%]
        [%if(path.settings.markerStart){%] marker-start="url(#[%=path.settings.markerStart%]_[%=uid%])"[%}%]
        [%if(path.settings.markerEnd){%] marker-end="url(#[%=path.settings.markerEnd%]_[%=uid%])"[%}%]
      [%}%]
      [%if(path.special === true){%]
        >
      [%}else{  %]
        [%if(path.animateTransform){  %]
          ><animatetransform attributeName="transform" from="[%=path.animateTransform.from%]" to="[%=path.animateTransform.to%]" attributeType="XML" type="[%=path.animateTransform.type%]" dur="[%=path.animateTransform.dur%]" repeatCount="[%=path.animateTransform.repeatCount%]"/>
          [%if(path.type == 'rect'){%]
            </rect>
          [%}else if(path.type == 'circle'){%]
            </circle>
          [%}else if(path.type == 'ellipse'){%]
            </ellipse>
          [%}else{%]
            </path>
          [%}%]
        [%}else{%]
          />
        [%}%]
      [%}%]
    [%}%]
  [%});%]
  [%if(clipRect) { %]</g>[%}%]
  [%if(r){%]</g>[%}%]
  [%if(typeof tx !== 'undefined' && typeof ty !== 'undefined' && (tx != 0 || ty != 0)) { %]</g>[%}%]
  </svg>
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
        headers:{pragma:'no-cache','Cache-Control':'no-cache'},
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
          headers:{pragma:'no-cache','Cache-Control':'no-cache'},
          onsuccess:function(event) {
            var html = event.target.responseText;
            svgs[url] = html;
            f(item).html(html);
            f(context.div).uiRender(context.callback);
          }
        });
      }
    } else {
      resolve(context);
    }
  }
  f().uiPlugins().push(svgPlugin);
})();
