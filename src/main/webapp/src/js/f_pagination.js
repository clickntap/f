(function(){function k(c,a,e){var d=f().app().get("pagination."+a.name+".sort")||"",b={from:f().app().get("pagination."+a.name+".from",0),limit:a.limit};d&&(b.sort=d);d="";a.search&&(d=f().app().get("search."+a.search.source,""),b[a.search.name]=d);if(a.params)for(key in a.params)b[key]=a.params[key];a.secure&&f().api(function(d){f().http({url:a.url,headers:d,params:b,onsuccess:function(b){b=JSON.parse(b.target.responseText);f().app().set("pagination."+a.name+".conf",a);f().app().set("pagination."+
  a.name+".data",b);b.limit||(b.limit=Number.MAX_SAFE_INTEGER);b.from||(b.from=0);a.n=b.from/b.limit+1;a.size=b.count/b.limit==Math.floor(b.count/b.limit)?Math.floor(b.count/b.limit):Math.floor(b.count/b.limit)+1;b.conf=a;f(c).html(l(b));f(c).item.setAttribute("name",a.name);f("pagination-changed").emit({name:a.name});"function"==typeof e&&e(c)}})})}var l=f().tc('[% var pagination \x3d f().app().get(\'pagination.\'+conf.name) %]\x3cdiv class\x3d"toolbar"\x3e\x3cdiv class\x3d"toolbar-mode"\x3e[%if(pagination.switchMode \x3d\x3d \'yes\'){%]  [%if(pagination.mode \x3d\x3d \'list\'){%]    \x3cdiv onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'mode\',value:\'grid\'})"\x3e\x3cdiv\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-table"\x3e\x3c/i\x3e\x3c/div\x3e\x3c/div\x3e  [%}else{%]    \x3cdiv onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'mode\',value:\'list\'})"\x3e\x3cdiv\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-grip-horizontal"\x3e\x3c/i\x3e\x3c/div\x3e\x3c/div\x3e  [%}%][%}%]\x3c/div\x3e\x3cdiv class\x3d"toolbar-navigator"\x3e[%if(conf.size \x3e 1){%]  [%if(conf.n \x3e 2){%]    \x3cdiv onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'page-first\'})"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chevron-double-left"\x3e\x3c/i\x3e\x3c/div\x3e  [%}else{%]    \x3cdiv class\x3d"off"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chevron-double-left"\x3e\x3c/i\x3e\x3c/div\x3e  [%}%]  [%if(conf.n \x3e 1){%]    \x3cdiv onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'page-prev\'})"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chevron-left"\x3e\x3c/i\x3e\x3c/div\x3e  [%}else{%]    \x3cdiv class\x3d"off"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chevron-left"\x3e\x3c/i\x3e\x3c/div\x3e  [%}%]  [%for(var i\x3d-2;i\x3cconf.size+2;i++){ if(Math.abs(i-conf.n+1) \x3c 3){ %]      [%if(i \x3e\x3d 0 \x26\x26 i\x3cconf.size){%]        \x3cdiv class\x3d"btn-page [%if(i+1 \x3d\x3d conf.n){%]active[%}%]" onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'page\',value:[%\x3d(i+1)%]})"\x3e\x3cdiv\x3e[%\x3d(i+1)%]\x3c/div\x3e\x3c/div\x3e      [%}else{%]        \x3cdiv class\x3d"btn-page off"\x3e\x3c/div\x3e      [%}%]  [%}}%]  [%if(conf.size - conf.n \x3e 0){ %]    \x3cdiv onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'page-next\'})"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chevron-right"\x3e\x3c/i\x3e\x3c/div\x3e  [%}else{ Math.ceil(count/limit)%]    \x3cdiv class\x3d"off"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chevron-right"\x3e\x3c/i\x3e\x3c/div\x3e  [%}%]  [%if(conf.size - conf.n \x3e 1){ %]    \x3cdiv onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'page-last\'})"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chevron-double-right"\x3e\x3c/i\x3e\x3c/div\x3e  [%}else{ Math.ceil(count/limit)%]    \x3cdiv class\x3d"off"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chevron-double-right"\x3e\x3c/i\x3e\x3c/div\x3e  [%}%][%}%]\x3c/div\x3e\x3cdiv class\x3d"toolbar-info"\x3e\x3cspan class\x3d"f-tr"\x3e[%if(conf.size \x3e 1){%]label.page\x3c/span\x3e\x26nbsp;\x3cb\x3e[%\x3dconf.n%]\x3c/b\x3e/\x3cb\x3e[%\x3dconf.size%]\x3c/b\x3e,\x26nbsp;\x3cb\x3e[%\x3dfrom%]\x3c/b\x3e-[%}%]\x3cb\x3e[%\x3dfrom+Math.min(limit,size)%]\x3c/b\x3e\x26nbsp;\x3cspan class\x3d"f-tr"\x3elabel.of\x3c/span\x3e\x26nbsp;\x3cb\x3e[%\x3dcount%]\x3c/b\x3e\x26nbsp;\x26nbsp;\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"[%\x3dconf.name%] view-[%\x3dpagination.mode%]"\x3e[%if(conf.template){%]  [%    var html;    try {      html \x3d conf.template({data:{items:items, conf:conf}});    } catch(err) {      html \x3d err;    }  %]  [%\x3d html %][%}else if(pagination.mode \x3d\x3d \'list\') {%]  \x3ctable\x3e  [%  var sortableCount \x3d 0;  f(conf.fields).each(function(field) {    if(field.sortable){      sortableCount++;    }  });  %]  [%f(conf.fields).each(function(field) {%]    [%    var sort \x3d \'\';    var sortClass \x3d \'\';    if(field.sortable) {      if(pagination.sort.indexOf(field.name) \x3d\x3d 0){        if(pagination.sort.indexOf(\'asc\') \x3e 0){          sort \x3d \'-up\';          sortClass \x3d \'sort-up\';        }else{          sort \x3d \'-down\';          sortClass \x3d \'sort-down\';        }      }else{      }    }    %]    [%if(field.sortable || pagination.mode \x3d\x3d \'list\'){%]      \x3cth style\x3d"width:[%\x3dfield.width%]" class\x3d"[%\x3dsortClass%]" [%if(field.sortable){%]onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'sort\',name:\'[%\x3dfield.name%]\'})"[%}%]\x3e      \x3cspan class\x3d"f-tr" code\x3d"label.[%\x3dfield.name%]"\x3e[%\x3dfield.name%]\x3c/span\x3e      [%if(field.sortable){%]        \x3ci class\x3d"[%\x3df().fa()%] fa-sort[%\x3dsort%]"\x3e\x3c/i\x3e      [%}%]      \x3c/th\x3e    [%}%]  [%});%]  [%f(items).each(function(item) {    var me \x3d item;    %]    \x3ctr onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'select\',id:\'[%\x3ditem.id%]\'})"\x3e    [%f(conf.fields).each(function(field) {%]      [%if(field.template){        var html;        try {          html \x3d field.template({data:item});        } catch(err) {          html \x3d err;        }        %]        \x3ctd style\x3d"width:[%\x3dfield.width%]"\x3e\x3cdiv class\x3d"[%\x3dconf.name%]-[%\x3dfield.name%]"\x3e[%\x3dhtml%]\x3c/div\x3e\x3c/td\x3e      [%}else{%]        \x3ctd style\x3d"width:[%\x3dfield.width%]"\x3e\x3cdiv class\x3d"[%\x3dconf.name%]-[%\x3dfield.name%]"\x3e[%\x3ditem[field.name]%]\x3c/div\x3e\x3c/td\x3e      [%}%]    [%});%]    \x3c/tr\x3e  [%});%]  \x3c/table\x3e[%}else{%]  \x3cdiv class\x3d"grid [%if(conf.width \x3d\x3d\x3d \'2x\'){%]grid-2x[%}%]"\x3e  [%f(items).each(function(item) {    var html;    try {      html \x3d conf.grid({data:item});    } catch(err) {      html \x3d err;    }    %]    \x3cdiv class\x3d"grid-item" data-id\x3d"[%\x3ditem.id%]" onclick\x3d"f(event).pagination({channel:\'[%\x3dconf.name%]\',what:\'select\',id:\'[%\x3ditem.id%]\'})"\x3e      \x3cdiv class\x3d"grid-item-content"\x3e[%\x3dhtml%]\x3c/div\x3e    \x3c/div\x3e  [%});%]  \x3c/div\x3e[%}%]\x3c/div\x3e');
  f().prototype().pagination=function(c,a){if(c.constructor==={}.constructor){var e=this;f(".f-pagination ."+c.channel).each(function(a){var b=f().app().get("pagination."+c.channel);if("sort"==c.what){var d="asc";f(e.input.target).closest("th").hasClass("sort-up")&&(d="desc");b.sort=c.name+"|"+d;b.from=0}isNaN(b.from)&&(b.from=0);"page-first"==c.what&&(b.from=0);"update"==c.what&&(b.from=0);"page-prev"==c.what&&(b.from-=b.data.limit);"page-next"==c.what&&(b.from+=b.data.limit);"page-last"==c.what&&
        (b.from=b.data.limit*Math.floor(b.data.count/b.data.limit));"page"==c.what&&(b.from=b.data.limit*(c.value-1));"mode"==c.what&&(b.mode=c.value);if("select"==c.what){try{var h=e.input.target,g=f(a).closest(".f-form-item");0!=g.items.length&&(c.value?g.find(".f-form-input-search").html(c.value):(h.onclick||(h=f(h).closest("a").items[0]),g.find(".f-form-input-search").html(h.innerText.trim())),g.find('input[type\x3d"hidden"]').items[0].value=c.id,g.find(".f-form-input-search-clean").removeClass("hide"),
        f(a).closest(".f-form-box-search").addClass("hide"),f(a).closest(".form-modal").removeClass("form-modal-pagination"),e.input.stopImmediatePropagation())}catch(m){}f("pagination").emit(c)}else k(a.parentElement,b.conf,function(a){f(".f-pagination").tr();f(a).find(".f_svg").renderSvg()})})}else{try{a.grid=tc(f(c).find("script[name\x3dtemplate-grid]").html())}catch(d){}f(a.fields).each(function(d){try{d.template=tc(f(c).find("script[name\x3d"+d.name+"]").html())}catch(b){}a.mode=f().app().get("pagination."+
    a.name+".mode",a.mode);a.switchMode=f().app().get("pagination."+a.name+".switchMode",a.switchMode?a.switchMode:"yes");d.sort&&(a.sort=f().app().get("pagination."+a.name+".sort",d.name+"|"+d.sort));a.search=f().app().get("pagination."+a.name+".search",a.search)});a.template?f().http({url:a.template,onsuccess:function(d){d=d.target.responseText;try{a.template=tc(d)}catch(b){}k(c,a,a.onready)}}):k(c,a,a.onready)}return this};f().uiPlugins().push(function(c,a){var e=f(a.div).find(".f_pagination").item;
e?(c=JSON.parse(e.innerText),c.onready=function(){f(a.div).uiRender(a.callback)},f(e).addClass("f-pagination").pagination(e,c).removeClass("f_pagination")):c(a)})})();