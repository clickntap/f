(function(){function l(c,h){f().api(function(d){c.http({url:h.url,method:"POST",headers:d,onsuccess:function(d){d=JSON.parse(d.target.responseText);d.errors?(f(d.errors).each(function(a,b){c.find("input").each(function(b,c){b.name==a.name&&(f(b).closest(".f-form-item").find(".f-form-error").html('\x3cspan class\x3d"f-tr"\x3e'+a.error+"\x3c/span\x3e"),f(b).closest(".f-form-item").removeClass("error").addClass("error"))});c.tr()}),f("form-ko").emit({form:h,response:d})):f("form-ok").emit({form:h,response:d})},
  onerror:function(c){f("form-ko").emit({form:h})}})})}function k(c,h,d,k){var a="";h.find(".f-form-input").each(function(b){f(b).hasClass("f-form-input-"+d)&&(a=b.innerText,a.length>k?b.innerText=a="":a=("0000"+a).slice(-k))});return a}var n=f().tc('\x3cform\x3e[%if(data.id){%]\x3cinput type\x3d"hidden" name\x3d"id" value\x3d"[%\x3ddata.id%]"\x3e[%}%][%f(data.elements).each(function(row,i){%]  \x3cdiv class\x3d"f-form-row"\x3e  [%f(row).each(function(item,j){%]    \x3cdiv class\x3d"f-form-col f-form-[%\x3ditem.type%]"\x3e      \x3cdiv class\x3d"f-form-item[%if(item.type \x3d\x3d "password"){%] secure[%}%][%if(item.readonly \x3d\x3d\x3d true){%] readonly[%}%]"\x3e        [% if(item.type !\x3d \'hidden\'){ %]          \x3cdiv class\x3d"f-form-label"\x3e\x3cspan class\x3d"f-tr"\x3e[%\x3d\'label.\'+item.name%]\x3c/span\x3e\x3c/div\x3e          [%if(item.type \x3d\x3d "password"){%]            \x3cdiv class\x3d"f-form-input-mask"\x3e\x3c/div\x3e            \x3cdiv class\x3d"f-form-eye-icon"\x3e\x3c/div\x3e          [%}%]          [%if(item.type \x3d\x3d \'select\'){%]            \x3cdiv class\x3d"f-form-input f-form-input-select"\x3e              \x3cselect onchange\x3d"f(\'form-select\').emit({name:\'[%\x3ditem.name%]\', value:this.value});f(this).closest(\'.f-form-item\').find(\'.f-form-error\').html(\'\');f(this).closest(\'.f-form-item\').removeClass(\'error\').find(\'input\').items[0].value\x3dthis.value;"\x3e                \x3coption disabled selected\x3e-\x3c/option\x3e                [% item.options.forEach(function(option){ %]                \x3coption value\x3d"[%\x3doption.value%]"\x3e[%\x3doption.label%]\x3c/option\x3e                [% }); %]              \x3c/select\x3e              \x3cdiv class\x3d"f-form-input-select-icon"\x3e\x3ci class\x3d"fas fa-caret-down"\x3e\x3c/i\x3e\x3c/div\x3e            \x3c/div\x3e          [%}else if(item.type \x3d\x3d \'search\'){ %]          \x3cdiv class\x3d"f-form-input-wrap"\x3e            \x3cdiv class\x3d"f-form-input f-form-input-search"\x3e\x26nbsp;\x3c/div\x3e\t\t\t\t\t\t\x3cdiv class\x3d"f-form-input-search-icon"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-search"\x3e\x3c/i\x3e\x3c/div\x3e          \x3c/div\x3e          \x3cdiv class\x3d"f-form-box-component f-form-box-search hide"\x3e            \x3cdiv class\x3d"f-form-times"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-times"\x3e\x3c/i\x3e\x3c/div\x3e            \x3cdiv\x3e            \x3cdiv class\x3d"f-form-box-search-content"\x3e            \x3cdiv class\x3d"component-search"\x3e              {"name":"form-[%\x3ditem.name%]"}            \x3c/div\x3e            \x3cdiv class\x3d"component-pagination"\x3e            {              "name":"[%\x3ditem.name%]",              "url":"[%\x3ditem.service%]",              "secure":true,              "fields":[                {"name":"id", "width":"10%","sortable":"string","sort":"asc"},                {"name":"name", "width":"30%","sortable":"string"}              ],              "search":{                "source":"form-[%\x3ditem.name%]",                "name":"text"              },              "limit":25,              "template": "[%\x3ditem.template%]",              "mode":"list",              "switchMode":"no"            }            \x3c/div\x3e            \x3c/div\x3e\t\t\t      \x3c/div\x3e          \x3c/div\x3e\t      \t[%}else if(item.type \x3d\x3d \'radio\'){%]          \x3cdiv class\x3d"f-form-input f-form-input-radio"\x3e\t        \t[% item.options.forEach(function(option){ %]\t\t        \x3clabel\x3e              \x3cinput type\x3d"radio" name\x3d"[%\x3ditem.name%]" value\x3d"[%\x3doption.value%]"/\x3e              \x3cspan\x3e[%\x3doption.label%]\x3c/span\x3e\t\t        \x3c/label\x3e            [% }); %]          \x3c/div\x3e          [%}%]          [%if(item.type \x3d\x3d "date" || item.type \x3d\x3d "datetime" ||  item.type \x3d\x3d "time"){%]            \x3cdiv class\x3d"f-form-input-group f-form-input-group-[%\x3ditem.type%]"\x3e\t\t        \t[%if(item.type \x3d\x3d "date" || item.type \x3d\x3d "datetime"){%]\t\t\t        \x3cdiv class\x3d"f-form-datepicker"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-calendar-alt"\x3e\x3c/i\x3e\x3c/div\x3e              \x3cdiv class\x3d"f-form-input f-form-input-2 f-form-input-day" tip\x3d"tip.input.day" contenteditable\x3d"plaintext-only" spellcheck\x3d"false"\x3e\x3c/div\x3e              \x3cdiv class\x3d"f-form-sep"\x3e/\x3c/div\x3e              \x3cdiv class\x3d"f-form-input f-form-input-2 f-form-input-month" tip\x3d"tip.input.month" contenteditable\x3d"plaintext-only" spellcheck\x3d"false"\x3e\x3c/div\x3e              \x3cdiv class\x3d"f-form-sep"\x3e/\x3c/div\x3e              \x3cdiv class\x3d"f-form-input f-form-input-4 f-form-input-year" tip\x3d"tip.input.year" contenteditable\x3d"plaintext-only" spellcheck\x3d"false"\x3e\x3c/div\x3e              [%}%]              [%if(item.type \x3d\x3d "datetime" || item.type \x3d\x3d "time"){%]              \x3cdiv class\x3d"f-form-sep"\x3e\x3c/div\x3e              \x3cdiv class\x3d"f-form-input f-form-input-2 f-form-input-hour" tip\x3d"tip.input.hour" contenteditable\x3d"plaintext-only" spellcheck\x3d"false"\x3e\x3c/div\x3e              \x3cdiv class\x3d"f-form-sep"\x3e:\x3c/div\x3e              \x3cdiv class\x3d"f-form-input f-form-input-2 f-form-input-minute" tip\x3d"tip.input.minute" contenteditable\x3d"plaintext-only" spellcheck\x3d"false"\x3e\x3c/div\x3e              [%}%]              \x3cdiv class\x3d"f-form-datepicker-clean hide"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-times"\x3e\x3c/i\x3e\x3c/div\x3e            \x3c/div\x3e            \x3cdiv class\x3d"f-form-box-component f-form-box-datepicker hide"\x3e              \x3cdiv class\x3d"f-form-times"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-times"\x3e\x3c/i\x3e\x3c/div\x3e              \x3cdiv\x3e                \x3cdiv class\x3d"f-form-box-datepicker-content"\x3e                \x3cdiv class\x3d"component-datepicker"\x3e                  {"name":"form-[%\x3ditem.name%]"}                \x3c/div\x3e                \x3c/div\x3e              \x3c/div\x3e            \x3c/div\x3e          [%}else if(item.type !\x3d \'select\' \x26\x26 item.type !\x3d \'radio\' \x26\x26 item.type !\x3d \'search\'){%]            \x3cdiv class\x3d"f-form-input" contenteditable\x3d"plaintext-only" spellcheck\x3d"false" name\x3d"[%\x3ditem.name%]" multiline\x3d"[%\x3ditem.multiline%]" type\x3d"[%\x3ditem.type%]"\x3e[%if(item.value){%][%\x3ditem.value%][%}%]\x3c/div\x3e          [%}%]          [%if(item.type \x3d\x3d "date" || item.type \x3d\x3d "datetime" || item.type \x3d\x3d "time"){%]          \x3cdiv class\x3d"f-form-tip"\x3e\x26nbsp;\x3c/div\x3e          \x3cdiv class\x3d"f-form-value"\x3e\x26nbsp;\x3c/div\x3e          [%}%]          \x3cdiv class\x3d"f-form-error"\x3e\x3c/div\x3e          \x3cdiv class\x3d"f-form-field-warning"\x3e\x3c/div\x3e        [% } %]        [% if(item.type \x3d\x3d \'hidden\'){ %]          \x3cdiv class\x3d"f-form-input f-form-input-hidden"\x3e\x3c/div\x3e        [% } %]\t\t    [% if(item.type !\x3d \'radio\'){ %]        \x3cinput type\x3d"hidden" name\x3d"[%\x3ditem.name%]"\x3e        [% } %]      \x3c/div\x3e    \x3c/div\x3e  [%});%]  \x3c/div\x3e[%});%]\x3cdiv class\x3d"f-form-warning"\x3e\x3c/div\x3e\x3c/form\x3e');
  f().prototype().form=function(c){this.html(n({data:c}));var h=this;f("form-submit").unslot();f("form-submit").slot(function(){l(f(h.find("form").items[0]),c)});f(h.input).find(".f-form-eye-icon").on("click",function(a){a=f(a.target).closest(".f-form-item");a.hasClass("show-password")?a.removeClass("show-password"):a.addClass("show-password")});f(".f-form-input-search-clean").each(function(a,b){f(a).on("click",function(b){f(a).closest(".f-form-item").find(".f-form-input-search").html("\x26nbsp;");
        f(a).closest(".f-form-item").find('input[type\x3d"hidden"]').items[0].value="";f(a).addClass("hide");b.stopPropagation()})});f(".f-form-datepicker-clean").each(function(a,b){f(a).on("click",function(b){f(a).closest(".f-form-item").find(".f-form-input").html("");f(a).addClass("hide");b.stopPropagation()})});f(".f-form-times").each(function(a,b){f(a).on("click",function(b){var c=f(a).closest(".f-form-box-component");c.addClass("hide");c.closest(".form-modal").removeClass("form-modal-pagination").removeClass("form-modal-datepicker");
        b.stopPropagation()})});f(".f-form-search").each(function(a,b){f(a).on("click",function(b){var c=f(a).find(".f-form-box-search");if(c.hasClass("hide")){b=!1;try{var e=c.find(".component-search");e.hasClass("f-search")||(e.addClass("f_search"),b=!0)}catch(p){}try{var g=c.find(".component-pagination");g.hasClass("f-pagination")||(g.addClass("f_pagination"),b=!0)}catch(p){}b?c.find(".f-form-box-search-content").ui({onready:function(){c.find(".component-search").removeClass("component-search");c.find(".component-pagination").removeClass("component-pagination");
        c.closest(".form-modal").addClass("form-modal-pagination");c.removeClass("hide");setTimeout(function(){c.closest(".form-panel").item&&(c.closest(".form-panel").item.scrollTop=0)},0)}}):(c.closest(".form-modal").addClass("form-modal-pagination"),c.removeClass("hide"),setTimeout(function(){c.closest(".form-panel").item&&(c.closest(".form-panel").item.scrollTop=0)},0))}})});f(".f-form-datepicker").each(function(a,c){f(a).on("click",function(c){c=f(a).closest(".f-form-item");var b=c.find('[type\x3d"hidden"]').items[0],
        e=c.find(".f-form-box-datepicker");if(e.hasClass("hide")){var g=null;b.value&&(g=Date.parse(b.value));c=!1;try{var d=e.find(".component-datepicker");d.hasClass("f-datepicker")||(d.addClass("f_datepicker"),c=!0)}catch(q){}c?e.find(".f-form-box-datepicker-content").ui({onready:function(){g&&!g.isInvalid()&&f().datepicker({channel:"form-"+b.name,what:"defaultDate",value:g.toISOString()});e.find(".component-datepicker").removeClass("component-datepicker");e.closest(".form-modal").addClass("form-modal-datepicker");
      e.removeClass("hide");setTimeout(function(){e.closest(".form-panel").item&&(e.closest(".form-panel").item.scrollTop=0)},0)}}):(g&&!g.isInvalid()&&f().datepicker({channel:"form-"+b.name,what:"defaultDate",value:g.toISOString()}),e.closest(".form-modal").addClass("form-modal-datepicker"),e.removeClass("hide"),setTimeout(function(){e.closest(".form-panel").item&&(e.closest(".form-panel").item.scrollTop=0)},0))}})});f(".f-form-input").each(function(a,b){b=f(a);b.hasClass("f-form-input-search")||b.hasClass("f-form-input-select")||
      b.hasClass("f-form-input-radio")||(b.closest(".f-form-item").on("click",function(c){f(a).closest(".f-form-item").find(".f-form-input").items[0].focus()}),b.on("click",function(a){a.stopPropagation()}),b.on("focus",function(c){var b=c.target,e=document.createRange();e.selectNodeContents(b);e.collapse(!1);b=window.getSelection();b.removeAllRanges();b.addRange(e);(c=c.target.getAttribute("tip"))&&f(a).closest(".f-form-item").find(".f-form-tip").html(f().tr(c));f(a).closest(".f-form-item").addClass("active").removeClass("error").find(".f-form-error").html("")}),
      b.on("blur",function(c){f(a).closest(".f-form-item").removeClass("active").find(".f-form-tip").html("\x26nbsp;");window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty()}),a.addEventListener("DOMSubtreeModified",function(b){var g=a.innerText.trim();"true"!==a.getAttribute("multiline")&&(a.innerText.match(/\n/)||a.innerText.match(/\r/))&&(a.innerText=g=g.replace(/\r?\n/g,"").trim(),a.blur(),l(f(a).closest("form"),c));"password"==a.getAttribute("type")&&
        g.match(/ /)&&(a.innerText=g=g.replace(/ /g,"").trim(),a.blur());for(var d="",e=0;e<g.length;e++)d+="\x26bull;";f(a.parentElement).find(".f-form-input-mask").html(d);d=f(b.target.parentElement).closest(".f-form-input-group");if(d.items){g=f(b.target.parentElement).closest(".f-form-input-group");b="";e=k(a,g,"year",4);if(""!=e)b+=e,e=k(a,g,"month",2),""!=e?(b+="-"+e,e=k(a,g,"day",2),""!=e&&(b+="-"+e)):k(a,g,"day",2),e=k(a,g,"hour",2),""!=e?(b+=" "+e,g=k(a,g,"minute",2),""!=g&&(b+=":"+g)):k(a,g,"minute  ",
          2);else{b=new Date;e=("0000"+(b.getMonth()+1)).slice(-2);var h=("0000"+b.getDate()).slice(-2);b=b.getFullYear()+"-"+e+"-"+h;e=k(a,g,"hour",2);""!=e&&(b+=" "+e,g=k(a,g,"minute",2),""!=g&&(b+=":"+g))}g=b;b=new Date(Date.parse(g));e=""+b.toLocaleDateString(f("html").items[0].getAttribute("lang"),{weekday:"long",day:"numeric",month:"long",year:"numeric"});d.hasClass("f-form-input-group-datetime")&&(e+=' \x3ci class\x3d"fal fa-clock"\x3e\x3c/i\x3e '+b.toLocaleTimeString(f("html").items[0].getAttribute("lang"),
      {hour12:!1,timeStyle:"short"}));d.hasClass("f-form-input-group-time")&&(e='\x26nbsp; \x3ci class\x3d"fal fa-clock"\x3e\x3c/i\x3e '+b.toLocaleTimeString(f("html").items[0].getAttribute("lang"),{hour12:!1,timeStyle:"short"}));isNaN(b.getTime())?(g="",f(a).closest(".f-form-item").find(".f-form-value").items[0].innerHTML="\x26nbsp;"):f(a).closest(".f-form-item").find(".f-form-value").items[0].innerHTML=e}f(a).closest(".f-form-item").find("input").items[0].value=g}));if(c.values[a.getAttribute("name")])a.innerText=
      c.values[a.getAttribute("name")];else{var d=f(a).closest(".f-form-item").find("input").items[0].name;if(null!=c.values[d]&&"undefined"!=typeof c.values[d]){b=c.values[d];f(a).hasClass("f-form-input-day")&&(a.innerText=(new Date(Date.parse(b))).getDate(),f(a).closest(".f-form-item").find(".f-form-datepicker-clean").removeClass("hide"));f(a).hasClass("f-form-input-month")&&(a.innerText=(new Date(Date.parse(b))).getMonth()+1);f(a).hasClass("f-form-input-year")&&(a.innerText=(new Date(Date.parse(b))).getFullYear());
          f(a).hasClass("f-form-input-hour")&&(a.innerText=("00"+(new Date(Date.parse(b))).getHours()).slice(-2));f(a).hasClass("f-form-input-minute")&&(a.innerText=("00"+(new Date(Date.parse(b))).getMinutes()).slice(-2));f(a).hasClass("f-form-input-hidden")&&(f(a).closest(".f-form-item").find("input").items[0].value=b);f(a).hasClass("f-form-input-select")&&(f(a).find("select").items[0].value=b,f(a).closest(".f-form-item").find("input").items[0].value=b);if(f(a).hasClass("f-form-input-radio"))try{f(a).find('input[type\x3d"radio"][value\x3d"'+
            b+'"]').items[0].checked=!0}catch(e){}f(a).hasClass("f-form-input-search")&&(f(a).closest(".f-form-item").find("input").items[0].value=b,f(a).closest(".f-form-item").find(".f-form-input-search-clean").removeClass("hide"),d=d.replace("Id","Name"),null!=c.values[d]&&"undefined"!=typeof c.values[d]&&(b=c.values[d]),a.innerText=b)}}if(c.values&&c.values.warnings&&c.fieldWarning){var h=f(a).closest(".f-form-item").find("input").items[0];h&&f(c.values.warnings).each(function(b){if(h.name==b.name){b.id=
      c.id;b["class"]=c.values["class"];var e=f(a).closest(".f-form-item").find(".f-form-field-warning"),d="formWarning."+b.name;f().app().set(d,{data:b});e.html('\x3cdiv class\x3d"f_t" data-resource\x3d"'+c.fieldWarning+'" data-target\x3d"'+d+'"\x3e\x3c/div\x3e');f(a).closest(".f-form-item").removeClass("warning").addClass("warning")}})}});if(c.values&&c.values.warnings&&c.formWarning){var d=f(h.input).find(".f-form-warning"),m="formWarning."+f().app().get("form");f().app().set(m,{data:c.values});d.html('\x3cdiv class\x3d"f_t" data-resource\x3d"'+
      c.formWarning+'" data-target\x3d"'+m+'"\x3e\x3c/div\x3e')}};f().uiPlugins().push(function(c,h){var d=f(h.div).find(".f_form").item;d?(f(d).removeClass("f_form").addClass("f-form"),f().http({url:d.getAttribute("data-resource"),onsuccess:function(c){var a=JSON.parse(c.target.responseText);a.url=a.uri;d.getAttribute("data-server")&&(a.url=d.getAttribute("data-server")+a.uri);var b=JSON.parse(JSON.stringify(d.dataset));if(d.getAttribute("data-id")){0<=a.uri.indexOf("/add")?(a.uri=a.uri.replace("/add",
    "/edit"),a.url=a.url.replace("/add","/edit")):(a.uri+="/edit",a.url+="/edit");a.id=d.getAttribute("data-id");var k=a.url.substring(0,a.url.lastIndexOf("/")+1)+d.getAttribute("data-id");f().api(function(c){f().http({url:k,headers:c,onsuccess:function(c){a.values=JSON.parse(c.target.responseText);a.values=Object.assign(b,a.values);f(d).form(a);f(h.div).uiRender(h.callback)}})})}else 0>a.uri.indexOf("/add")&&(a.uri+="/add",a.url+="/add"),a.id=null,a.values=Object.assign(a.values,b),f(d).form(a),f(h.div).uiRender(h.callback)}})):
c(h)})})();