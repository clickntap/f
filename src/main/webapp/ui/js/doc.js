f().t([{"code":'[%\nvar module \x3d f().app().get(\'module\',\'\');\n%]\n[%if(module !\x3d \'\'){%]\n\x3cdiv id\x3d"page"\x3e\n  \x3cdiv id\x3d"module" class\x3d"f_t" data-resource\x3d"ui/doc/[%\x3dmodule%].html"\x3e\x3c/div\x3e\n\x3c/div\x3e\n[%}%]\n\x3cdiv id\x3d"modules"\x3e\n  \x3cdiv class\x3d"module [%if(module \x3d\x3d \'typewriter\'){%]on[%}%]" onclick\x3d"selectModule(\'typewriter\')"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-keyboard"\x3e\x3c/i\x3e\x26nbsp;\x26nbsp;TYPEWRITER\x3c/div\x3e\n  \x3cdiv class\x3d"module [%if(module \x3d\x3d \'chart\'){%]on[%}%]" onclick\x3d"selectModule(\'chart\')"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-chart-line"\x3e\x3c/i\x3e\x26nbsp;\x26nbsp;CHART\x3c/div\x3e\n  \x3cdiv class\x3d"module [%if(module \x3d\x3d \'clock\'){%]on[%}%]" onclick\x3d"selectModule(\'clock\')"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-clock"\x3e\x3c/i\x3e\x26nbsp;\x26nbsp;CLOCK\x3c/div\x3e\n  \x3cdiv class\x3d"module [%if(module \x3d\x3d \'icon\'){%]on[%}%]" onclick\x3d"selectModule(\'icon\')"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-icons"\x3e\x3c/i\x3e\x26nbsp;\x26nbsp;ICON\x3c/div\x3e\n  \x3cdiv class\x3d"module [%if(module \x3d\x3d \'date\'){%]on[%}%]" onclick\x3d"selectModule(\'date\')"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-calendar"\x3e\x3c/i\x3e\x26nbsp;\x26nbsp;DATE\x3c/div\x3e\n  \x3cdiv class\x3d"module [%if(module \x3d\x3d \'videoplayer\'){%]on[%}%]" onclick\x3d"selectModule(\'videoplayer\')"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-video"\x3e\x3c/i\x3e\x26nbsp;\x26nbsp;VIDEO PLAYER\x3c/div\x3e\n  \x3cdiv class\x3d"module [%if(module \x3d\x3d \'form\'){%]on[%}%]" onclick\x3d"selectModule(\'form\')"\x3e\x3ci class\x3d"[%\x3df().fa()%] fa-pen"\x3e\x3c/i\x3e\x26nbsp;\x26nbsp;FORM\x3c/div\x3e\n\x3c/div\x3e\n',
  "url":"ui/doc.html"},{"code":'\x3cdiv class\x3d"f_form" data-resource\x3d"ui/doc/form.json"\x3e\x3c/div\x3e',"url":"ui/doc/form.html"},{"code":'\x3cdiv class\x3d"f_editor" data-type\x3d"html"\x3e\n  \x3cdiv class\x3d"f-toolbar"\x3e\n    \x3cdiv class\x3d"f-item bold"\x3e\x3ci class\x3d"fal fa-bold"\x3e\x3c/i\x3e\x3c/div\x3e\n    \x3cdiv class\x3d"f-item italic"\x3e\x3ci class\x3d"fal fa-italic"\x3e\x3c/i\x3e\x3c/div\x3e\n    \x3cdiv class\x3d"f-item ordered-list"\x3e\x3ci class\x3d"fal fa-list-ol"\x3e\x3c/i\x3e\x3c/div\x3e\n    \x3cdiv class\x3d"f-item justify-left"\x3e\x3ci class\x3d"fal fa-align-left"\x3e\x3c/i\x3e\x3c/div\x3e\n    \x3cdiv class\x3d"f-item justify-center"\x3e\x3ci class\x3d"fal fa-align-center"\x3e\x3c/i\x3e\x3c/div\x3e\n    \x3cdiv class\x3d"f-item justify-right"\x3e\x3ci class\x3d"fal fa-align-right"\x3e\x3c/i\x3e\x3c/div\x3e\n  \x3c/div\x3e\n  \x3cdiv class\x3d"f-document"\x3e\n    CIAO A \x3cb\x3eTUTTI\x3c/b\x3e\n  \x3c/div\x3e\n\x3c/div\x3e',
  "url":"ui/doc/editor-html.html"},{"code":'\x3cdiv class\x3d"visua-search"\x3e\n  \n  \x3cdiv class\x3d"card"\x3e\x3c/div\x3e\n  \x3cdiv class\x3d"card"\x3e\x3c/div\x3e\n  \x3cdiv class\x3d"card"\x3e\x3c/div\x3e\n  \x3cdiv class\x3d"card"\x3e\x3c/div\x3e\n  \n\x3c/div\x3e',"url":"ui/doc/card.html"},{"code":'\x3cdiv class\x3d"f-svg" style\x3d"width:100%;height:256px"\x3e\n[%\x3df().icon(\'cnt\')%]\n\x3c/div\x3e\n\x3cdiv class\x3d"f-svg f-draggable" style\x3d"width:100%;height:256px"\x3e\n[%\x3df().icon(\'clear-sky\')%]\n\x3c/div\x3e\n\x3cdiv class\x3d"f-svg" style\x3d"width:100%;height:256px"\x3e\n[%\x3df().icon(\'scattered-clouds\')%]\n\x3c/div\x3e\n\x3cdiv class\x3d"f-svg" style\x3d"width:100%;height:256px"\x3e\n[%\x3df().icon(\'thunderstorm\')%]\n\x3c/div\x3e\n',
  "url":"ui/doc/icon.html"},{"code":"\n\x3cdiv style\x3d\"width:100%;height:500px\"\x3e\n\x3cdiv class\x3d\"f_chart\"\x3e\n{\n  type:'bar',\n  max:100,\n  yaxis:4,\n  width:700,\n  height:500,\n  values:[10,20,80,40,50,0,90,100],\n  colors:['var(--color-red)','var(--color-blue)'],\n  labels:['Gen 2020','Gen 2020','Gen 2020','Gen 2020','Gen 2020','Gen 2020','Gen 2020','Gen 2020']\n}\n\x3c/div\x3e\n\x3c/div\x3e\n\x3cdiv style\x3d\"width:100%;height:500px\"\x3e\n\x3cdiv class\x3d\"f_chart\"\x3e\n{\n  type:'bezier',\n  max:120,\n  yaxis:10,\n  width:700,\n  height:500,\n  values:[10,20,80,40,50,0,90,100],\n  colors:['var(--color-green)'],\n  labels:['Gen 2020','Gen 2020','Gen 2020','Gen 2020','Gen 2020','Gen 2020','Gen 2020','Gen 2020']\n}\n\x3c/div\x3e\n\n",
"url":"ui/doc/chart.html"},{"code":'\n\x3cdiv class\x3d"f_typewriter"\x3e\n  \x3cdiv\x3eThe best of both worlds (means you can enjoy two different opportunities at the same time)\x3c/div\x3e\n  \x3cdiv\x3eSpeak of the devil (this means that the person you\u2019re just talking about actually appears at that moment)\x3c/div\x3e\n  \x3cdiv\x3eSee eye to eye (this means agreeing with someone)\x3c/div\x3e\n  \x3cdiv\x3eOnce in a blue moon (an event that happens infrequently)\x3c/div\x3e\n  \x3cdiv\x3eWhen pigs fly (something that will never happen)\x3c/div\x3e\n  \x3cdiv\x3eTo cost an arm and a leg (something is very expensive)\x3c/div\x3e\n  \x3cdiv\x3eA piece of cake (something is very easy)\x3c/div\x3e\n  \x3cdiv\x3eLet the cat out of the bag (to accidentally reveal a secret)\x3c/div\x3e\n  \x3cdiv\x3eTo feel under the weather (to not feel well)\x3c/div\x3e\n  \x3cdiv\x3eTo cut corners (to do something badly or cheaply)\x3c/div\x3e\n\x3c/div\x3e\n',
  "url":"ui/doc/typewriter.html"},{"code":"[%\n\nvar d \x3d new Date();\n\n\n\n\n%]\n\n\n\x3cdiv\x3eLa data di oggi usando \x3cb\x3ed\x3c/b\x3e \u00e8: [%\x3dd%]\x3c/div\x3e\n\x3cdiv\x3eLa data di oggi usando \x3cb\x3ed.dateAsParam()\x3c/b\x3e \u00e8: [%\x3dd.dateAsParam()%]\x3c/div\x3e\n\x3cdiv\x3eLa data di oggi usando \x3cb\x3ed.datetimeAsParam()\x3c/b\x3e \u00e8: [%\x3dd.datetimeAsParam()%]\x3c/div\x3e\n\x3cdiv\x3eLa data di oggi usando \x3cb\x3ed.format()\x3c/b\x3e \u00e8: [%\x3dd.format()%]\x3c/div\x3e\n\x3cdiv\x3eLa data di oggi usando \x3cb\x3ed.format({weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'},'en')\x3c/b\x3e \u00e8: [%\x3dd.format({weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'},'en')%]\x3c/div\x3e\n\n\x3cdiv\x3emesi da -5 a +5:\x3c/div\x3e\n\n[%for(var i\x3d-5;i\x3c\x3d5;i++){%]\n[%\n  var d \x3d new Date();\n  d.yesterday().yesterday();\n  d.changeMonth(i)\n%]  \n  \n  \x3cdiv\x3e[%\x3di%] - [%\x3dd.format({month: 'long'},'it')%]\x3c/div\x3e\n[%}%]\n\n\x3cdiv\x3ecalendar data: [%\x3dJSON.stringify(new Date().calendarMonth())%]\x3c/div\x3e\n",
  "url":"ui/doc/date.html"},{"code":'\x3cdiv class\x3d"f_clock" style\x3d"width:100%;height:256px"\x3e\x3c/div\x3e\n',"url":"ui/doc/clock.html"},{"code":'\x3cdiv class\x3d"f_videoplayer"\x3e\n  {\n    "url":"https://player.vimeo.com/external/459682847.hd.mp4?s\x3dc7675fc9703a422e1968485ff77617777ec3727e\x26profile_id\x3d175\x26oauth2_token_id\x3d1260890006",\n    "poster":"https://i.vimeocdn.com/video/960364386_1920x1080.jpg?r\x3dpad",\n    "download":false,\n    "controls":true,\n    "autoplay":false,\n    "pip":false,\n    "muted":false,\n    "ui":"default"\n  }\n\x3c/div\x3e\n\x3cpre id\x3d"videoplayer"\x3e\x3c/pre\x3e\n[%\nf(\'videoplayer\').slot(function(data) {\n  f(\'#videoplayer\').html(JSON.stringify(data,null,2));\n})\n%]',
"url":"ui/doc/videoplayer.html"}]);function selectModule(module){f().app().set("module",module);f().ui({target:"#doc",onready:setupUi})}f(window).on("load",function(){f("body").uiRender(setupUi)});function setupUi(){setupCards()}
function setupCards(){var cardContext=undefined;f("body").interactive({up:function(event,context){f(".card").each(function(item){item.style.marginLeft="auto";item.style.transform="";item.style.opacity=1});cardContext=undefined},move:function(event,context){if(cardContext){var offset=(cardContext.containerRect.width-cardContext.cardRect.width)/2;cardContext.card.style.marginLeft=context.x-cardContext.cardRect.x-cardContext.context.x+offset+"px";var distance=(parseInt(cardContext.card.style.marginLeft)-
offset)/100;cardContext.card.style.transform="rotatez("+distance*10+"deg)";cardContext.card.style.opacity=1-Math.abs(distance/4)}}});f(".card").interactive({down:function(event,context){var card=f(event.target).closest(".card").item;var container=f(event.target).closest(".visua-search").item;cardContext={card:card,context:context,cardRect:card.getBoundingClientRect(),containerRect:container.getBoundingClientRect()}}})};