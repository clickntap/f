(function(){var templatesvg=f().tc('\x3csvg viewBox\x3d"0,0,[%\x3dw%],[%\x3dh%]" xmlns\x3d"http://www.w3.org/2000/svg" xmlns:xlink\x3d"http://www.w3.org/1999/xlink"\x3e[%if(r){%]  \x3cg transform\x3d"rotate([%\x3dr%] [%\x3dw/2%] [%\x3dh/2%])"\x3e[%}%][%if(typeof tx !\x3d\x3d \'undefined\' \x26\x26 typeof ty !\x3d\x3d \'undefined\' \x26\x26 (tx !\x3d 0 || ty !\x3d 0)) { %]  \x3cg transform\x3d"translate([%\x3dtx%] [%\x3dty%])"\x3e[%}%][%if(clipRect) { var clipRectUid \x3d Math.random().toString(36).substr(2, 9); %]  \x3cclipPath id\x3d"clip-rect-[%\x3dclipRectUid%]"\x3e    \x3crect x\x3d"[%\x3dclipRect.x%]" y\x3d"[%\x3dclipRect.y%]" width\x3d"[%\x3dclipRect.w%]" height\x3d"[%\x3dclipRect.h%]" /\x3e  \x3c/clipPath\x3e  \x3cg clip-path\x3d"url(#clip-rect-[%\x3dclipRectUid%])"\x3e[%}%][%var svgId \x3d Math.random().toString(36).substr(2, 9);var grouped \x3d false;%][%f(paths).each(function(path, index){  var uid \x3d Math.random().toString(36).substr(2, 9);  %]  [%if(path.type \x3d\x3d \'text\'){%]    \x3cg [%if(path.settings.transform){%] transform\x3d"[%\x3dpath.settings.transform%]"[%}%] fill\x3d"[%\x3dpath.settings.fill%]" [%if(!isNaN(path.size)){%]style\x3d"font-size:[%\x3dpath.size%]px"[%}%]\x3e      [%        var lines \x3d path.text.split(\'\\n\');        var offsetY \x3d (path.h-lines.length*path.size)/2-path.size/8;      %]      [%f(lines).each(function(line, index) {%]        [%if(path.textAlign \x3d\x3d 1){%]          \x3ctext \x3c!--textLength\x3d"[%\x3dpath.w%]" lengthAdjust\x3d"spacingAndGlyphs"--\x3e x\x3d"[%\x3dpath.x%]" y\x3d"[%\x3doffsetY+path.y+path.size*(index+1)%]" style\x3d"text-anchor: start"\x3e[%\x3dline%]\x3c/text\x3e        [%}%]        [%if(path.textAlign \x3d\x3d 2){%]          \x3ctext \x3c!--textLength\x3d"[%\x3dpath.w%]" lengthAdjust\x3d"spacingAndGlyphs"--\x3e x\x3d"[%\x3dpath.x+path.w/2%]" y\x3d"[%\x3doffsetY+path.y+path.size*(index+1)%]" style\x3d"text-anchor: middle"\x3e[%\x3dline%]\x3c/text\x3e        [%}%]        [%if(path.textAlign \x3d\x3d 3){%]          \x3ctext \x3c!--textLength\x3d"[%\x3dpath.w%]" lengthAdjust\x3d"spacingAndGlyphs"--\x3e x\x3d"[%\x3dpath.x+path.w%]" y\x3d"[%\x3doffsetY+path.y+path.size*(index+1)%]" style\x3d"text-anchor: end"\x3e[%\x3dline%]\x3c/text\x3e        [%}%]      [%})%]    \x3c/g\x3e  [%}else if(path.type \x3d\x3d \'transform-start\'){%]    \x3cg transform\x3d"[%\x3dpath.value%]"\x3e    \x3c!-- \x3cg transform\x3d"translate([%\x3d202%] [%\x3d(path.ty)%]) rotate(-90 1050 1485)"\x3e --\x3e  [%}else if(path.type \x3d\x3d \'transform-end\'){%]    \x3c/g\x3e  [%}else if(path.type \x3d\x3d \'image\'){%]    \x3cg [%if(path.settings.transform){%] transform\x3d"[%\x3dpath.settings.transform%]"[%}%]\x3e      \x3cimage xlink:href\x3d"[%\x3dpath.url%]" x\x3d"[%\x3dpath.x%]" y\x3d"[%\x3dpath.y%]" width\x3d"[%\x3dpath.w%]" height\x3d"[%\x3dpath.h%]"\x3e\x3c/image\x3e    \x3c/g\x3e  [%}else if(path.type \x3d\x3d \'shape\'){%]    \x3cg [%if(path.settings.transform){%] transform\x3d"[%\x3dpath.settings.transform%]"[%}%]\x3e      \x3cpath d\x3d"[%\x3dpath.shape%]" fill\x3d"[%\x3dpath.settings.fill%]" fill-opacity\x3d"[%\x3dpath.settings.fillOpacity%]"\x3e\x3c/path\x3e    \x3c/g\x3e  [%}else{%]    [%if(path.special \x3d\x3d\x3d true){%]      [%if(path.type \x3d\x3d \'group-start\'){ grouped \x3d true; %] \x3cg [%}%]      [%if(path.type \x3d\x3d \'group-end\'){ grouped \x3d false; %] \x3c/g [%}%]      [%if(path.type \x3d\x3d \'defs-start\'){ %] \x3cdefs  [%}%]      [%if(path.type \x3d\x3d \'defs-end\'){ %] \x3c/defs [%}%]      [%if(path.type \x3d\x3d \'mask-start\'){ %] \x3cmask id\x3d"[%\x3dpath.id%]_[%\x3dsvgId%]" [%}%]      [%if(path.type \x3d\x3d \'mask-end\'){ %] \x3c/mask [%}%]      [%if(path.type \x3d\x3d \'clip-start\'){ %] \x3cclipPath id\x3d"[%\x3dpath.id%]_[%\x3dsvgId%]" [%}%]      [%if(path.type \x3d\x3d \'clip-end\'){ %] \x3c/clipPath [%}%]    [%}else{%]      [%if(path.type \x3d\x3d \'rect\'){%]        \x3crect x\x3d"[%\x3dpath.x%]" y\x3d"[%\x3dpath.y%]" rx\x3d"[%\x3dpath.rx%]" ry\x3d"[%\x3dpath.ry%]" width\x3d"[%\x3dpath.w%]" height\x3d"[%\x3dpath.h%]"      [%}else if(path.type \x3d\x3d \'circle\'){%]        \x3ccircle cx\x3d"[%\x3dpath.x%]" cy\x3d"[%\x3dpath.y%]" r\x3d"[%\x3dpath.r%]"      [%}else if(path.type \x3d\x3d \'ellipse\'){%]        \x3cellipse cx\x3d"[%\x3dpath.x%]" cy\x3d"[%\x3dpath.y%]" rx\x3d"[%\x3dpath.x1%]" ry\x3d"[%\x3dpath.y1%]"      [%}else{%]        \x3cdefs\x3e        [%f(markers).each(function(marker, index){ %]          \x3cmarker            id\x3d"[%\x3dmarker.name%]_[%\x3duid%]"            [%if(marker.r){%]              refX\x3d"[%\x3dmarker.r%]"              refY\x3d"[%\x3dmarker.r%]"              viewBox\x3d"0 0 [%\x3dmarker.r*2%] [%\x3dmarker.r*2%]"              markerWidth\x3d"[%\x3dmarker.r*2%]"              markerHeight\x3d"[%\x3dmarker.r*2%]"            [%}else{%]              refX\x3d"[%\x3dmarker.w/2%]"              refY\x3d"[%\x3dmarker.h/2%]"              viewBox\x3d"0 0 [%\x3dmarker.w%] [%\x3dmarker.h%]"              markerWidth\x3d"[%\x3dmarker.w%]"              markerHeight\x3d"[%\x3dmarker.h%]"            [%}%]            orient\x3d"auto"\x3e            [%if(marker.r){%]            \x3ccircle cx\x3d"[%\x3dmarker.x%]" cy\x3d"[%\x3dmarker.y%]" r\x3d"[%\x3dmarker.r%]" fill\x3d"[%\x3dpath.settings.stroke%]" [%if(path.settings.strokeOpacity){%] fill-opacity\x3d"[%\x3dpath.settings.strokeOpacity%]"[%}%]\x3e\x3c/circle\x3e            [%}else{%]            \x3cpath d\x3d"[%\x3dmarker.d%]" fill\x3d"[%\x3dpath.settings.stroke%]" [%if(path.settings.strokeOpacity){%] fill-opacity\x3d"[%\x3dpath.settings.strokeOpacity%]"[%}%]\x3e\x3c/path\x3e            [%}%]          \x3c/marker\x3e        [%})%]        \x3c/defs\x3e        \x3cpath d\x3d"[%f(path.d).each(function(point, index){%][%if(index !\x3d 0){%] [%}%][%\x3dpoint.type%][%if(point.type \x3d\x3d "M" || point.type \x3d\x3d "L"){%][%\x3dpoint.x%],[%\x3dpoint.y%][%}%][%if(point.type \x3d\x3d "C"){%][%\x3dpoint.x2%],[%\x3dpoint.y2%],[%\x3dpoint.x3%],[%\x3dpoint.y3%],[%\x3dpoint.x1%],[%\x3dpoint.y1%] [%}%][%if(point.type \x3d\x3d "S"){%][%\x3dpoint.x%],[%\x3dpoint.y%],[%\x3dpoint.x1%],[%\x3dpoint.y1%][%}%][%if(point.type \x3d\x3d "Q"){%][%\x3dpoint.x2%],[%\x3dpoint.y2%] [%\x3dpoint.x1%],[%\x3dpoint.y1%][%}%][%if(point.type \x3d\x3d "T"){%][%\x3dpoint.x%],[%\x3dpoint.y%][%}%][%if(point.type \x3d\x3d "A"){%][%\x3dpoint.rx%],[%\x3dpoint.ry%],[%\x3dpoint.a%],[%\x3dpoint.laf%],[%\x3dpoint.sf%],[%\x3dpoint.x%],[%\x3dpoint.y%][%}%][%});%]"      [%}%]    [%}%]     [%if((grouped \x26\x26 path.special \x3d\x3d\x3d true) || (!grouped \x26\x26 !path.special)){%]      [%if(path.settings.fill){%] fill\x3d"[%\x3dpath.settings.fill%]"[%}%]      [%if(path.settings.stroke){%] stroke\x3d"[%\x3dpath.settings.stroke%]"[%}%]      [%if(path.settings.strokeWidth){%] stroke-width\x3d"[%\x3dpath.settings.strokeWidth%]"[%}%]      [%if(path.settings.strokeOpacity){%] stroke-opacity\x3d"[%\x3dpath.settings.strokeOpacity%]"[%}%]      [%if(path.settings.strokeDashArray){%] stroke-dasharray\x3d"[%\x3dpath.settings.strokeDashArray%]"[%}%]      [%if(path.settings.strokeLinecap){%] stroke-linecap\x3d"[%\x3dpath.settings.strokeLinecap%]"[%}%]      [%if(path.settings.strokeLinejoin){%] stroke-linejoin\x3d"[%\x3dpath.settings.strokeLinejoin%]"[%}%]      [%if(path.settings.fillOpacity){%] fill-opacity\x3d"[%\x3dpath.settings.fillOpacity%]"[%}%]      [%if(path.settings.clip){%] clip-path\x3d"url(#[%\x3dpath.settings.clip%]_[%\x3dsvgId%])"[%}%]      [%if(path.settings.mask){%] mask\x3d"url(#[%\x3dpath.settings.mask%]_[%\x3dsvgId%])"[%}%]      [%if(path.settings.transform){%] transform\x3d"[%\x3dpath.settings.transform%]"[%}%]      [%if(path.settings.opacity){%] opacity\x3d"[%\x3dpath.settings.opacity%]"[%}%]      [%if(path.settings.class){%] class\x3d"[%\x3dpath.settings.class%]"[%}%]      [%if(path.settings.markerStart){%] marker-start\x3d"url(#[%\x3dpath.settings.markerStart%]_[%\x3duid%])"[%}%]      [%if(path.settings.markerEnd){%] marker-end\x3d"url(#[%\x3dpath.settings.markerEnd%]_[%\x3duid%])"[%}%]   [%}%]    [%if(path.special \x3d\x3d\x3d true){%]      \x3e    [%}else{  %]      [%if(path.animateTransform){  %]        \x3e\x3canimatetransform attributeName\x3d"transform" from\x3d"[%\x3dpath.animateTransform.from%]" to\x3d"[%\x3dpath.animateTransform.to%]" attributeType\x3d"XML" type\x3d"[%\x3dpath.animateTransform.type%]" dur\x3d"[%\x3dpath.animateTransform.dur%]" repeatCount\x3d"[%\x3dpath.animateTransform.repeatCount%]"/\x3e        [%if(path.type \x3d\x3d \'rect\'){%]          \x3c/rect\x3e        [%}else if(path.type \x3d\x3d \'circle\'){%]          \x3c/circle\x3e        [%}else if(path.type \x3d\x3d \'ellipse\'){%]          \x3c/ellipse\x3e        [%}else{%]          \x3c/path\x3e        [%}%]      [%}else{%]        /\x3e      [%}%]    [%}%]  [%}%][%});%][%if(clipRect) { %]\x3c/g\x3e[%}%][%if(r){%]\x3c/g\x3e[%}%][%if(typeof tx !\x3d\x3d \'undefined\' \x26\x26 typeof ty !\x3d\x3d \'undefined\' \x26\x26 (tx !\x3d 0 || ty !\x3d 0)) { %]\x3c/g\x3e[%}%]\x3c/svg\x3e');
  var svgs={};f().prototype().svg=function(w,h,tx,ty,r,clipRect){var svg={};var path={};svg.clipRect=clipRect;svg.w=w;svg.h=h;svg.r=r;svg.tx=tx;svg.ty=ty;svg.paths=[];svg.markers=[];svg.settings={};svg.init=function(){svg.settings={};path.settings={}};svg.set=function(name,value){if(name){path.settings=JSON.parse(JSON.stringify(path.settings));if(value)path.settings[name]=value;else delete path.settings[name]}else path.settings={};svg.settings=JSON.parse(JSON.stringify(path.settings));return svg};svg.circle=
    function(x,y,r){path={type:"circle",x:x,y:y,r:r,settings:svg.settings};return svg.end()};svg.image=function(x,y,w,h,url){path={type:"image",x:x,y:y,w:w,h:h,url:url,settings:svg.settings};return svg.end()};svg.ellipse=function(x,y,x1,y1){path={type:"ellipse",x:x,y:y,x1:x1,y1:y1,settings:svg.settings};return svg.end()};svg.rect=function(x,y,w,h,rx,ry,name,target){path={target:target,name:name,type:"rect",x:x,y:y,w:w,h:h,rx:rx?rx:0,ry:ry?ry:0,settings:svg.settings};return svg.end()};svg.text=function(x,
    y,w,h,size,text,textAlign){path={type:"text",x:x,y:y,w:w,h:h,size:size,text:text,textAlign:textAlign,settings:svg.settings};return svg.end()};svg.shape=function(shape){path={type:"shape",shape:shape,settings:svg.settings};return svg.end()};svg.move=function(x,y){var point={type:"M",x:x,y:y};path.d.push(point);path.type=point.type;return svg};svg.marker=function(marker){svg.markers.push(marker)};svg.line=function(x,y){var point={type:"L",x:x,y:y};path.d.push(point);path.type=point.type;return svg};
    svg.arc=function(rx,ry,a,laf,sf,x,y){var point={type:"A",rx:rx,ry:ry,a:a,laf:laf,sf:sf,x:x,y:y};path.d.push(point);path.type=point.type;return svg};svg.cubic=function(x1,y1,x2,y2,x3,y3){var point={type:"C",x1:x1,y1:y1,x2:x2,y2:y2,x3:x3,y3:y3};path.d.push(point);path.type=point.type;return svg};svg.quadratic=function(x1,y1,x2,y2){var point={type:"Q",x1:x1,y1:y1,x2:x2,y2:y2};path.d.push(point);path.type=point.type;return svg};svg.close=function(){var point={type:"Z"};path.d.push(point);return svg.end()};
    svg.add=function(x,y,x1,y1){if(path.type=="C"){var point={type:"S",x:x1,y:y1,x1:x,y1:y};path.d.push(point)}if(path.type=="Q"){var point={type:"T",x:x,y:y};path.d.push(point)}if(path.type=="M"||path.type=="L")return svg.line(x,y);return svg};svg.transformStart=function(value){path={type:"transform-start",value:value};return svg.end()};svg.transformEnd=function(){path={type:"transform-end"};return svg.end()};svg.maskStart=function(id){path={special:true,type:"mask-start",id:id,settings:svg.settings};
      return svg.end()};svg.maskEnd=function(){path={special:true,type:"mask-end",settings:svg.settings};return svg.end()};svg.clipStart=function(id){path={special:true,type:"clip-start",id:id,settings:svg.settings};return svg.end()};svg.clipEnd=function(){path={special:true,type:"clip-end",settings:svg.settings};return svg.end()};svg.groupStart=function(){path={special:true,type:"group-start",settings:svg.settings};return svg.end()};svg.groupEnd=function(){path={special:true,type:"group-end",settings:svg.settings};
    return svg.end()};svg.defsStart=function(){path={special:true,type:"defs-start",settings:svg.settings};return svg.end()};svg.defsEnd=function(){path={special:true,type:"defs-end",settings:svg.settings};return svg.end()};svg.end=function(){svg.paths.push(path);path={d:[],settings:svg.settings};return svg};svg.markerEnd=function(name){path.markerEnd=name;return svg};svg.markerStart=function(name){path.markerStart=name;return svg};svg.clear=function(){svg.paths=[];path={d:[],settings:svg.settings};return svg};
    svg.animate=function(type,duration,repeatCount,from,to){path.animateTransform={};if(type)path.animateTransform.type=type;else path.animateTransform.type="";if(duration)path.animateTransform.dur=duration;if(repeatCount)path.animateTransform.repeatCount=repeatCount;if(from)path.animateTransform.from=from;if(to)path.animateTransform.to=to;return svg};svg.render=function(){var html=templatesvg(svg);var _html="";html.split("\n").forEach(function(line){if(line.trim()!="")_html+=line});html=_html;svg.clear();
      return html};return svg.clear()};f().prototype().renderSvg=function(){this.each(function(item){f(item).removeClass("f_svg").addClass("f-svg");f().http({url:item.getAttribute("data-resource"),onsuccess:function(event){var html=event.target.responseText;f(item).html(html)}})})};var svgPlugin=function(resolve,context){var item=f(context.div).find(".f_svg").item;if(item){var url=item.getAttribute("data-resource");f(item).removeClass("f_svg").addClass("f-svg");if(svgs[url])setTimeout(function(){var html=
svgs[url];f(item).html(html);f(context.div).uiRender(context.callback)},0);else f().http({url:url,onsuccess:function(event){var html=event.target.responseText;svgs[url]=html;f(item).html(html);f(context.div).uiRender(context.callback)}})}else resolve(context)};f().uiPlugins().push(svgPlugin)})();