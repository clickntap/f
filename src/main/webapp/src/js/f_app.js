(function(){var b={},g=JSON.parse(sessionStorage.getItem("session"));g||(g={});var l=g;try{l=new Proxy(g,{set:function(c,b,d){b=Reflect.set(c,b,d);sessionStorage.setItem("session",JSON.stringify(c));return b},deleteProperty:function(c,b){b=Reflect.deleteProperty(c,b);sessionStorage.setItem("session",JSON.stringify(c));return b}})}catch(c){}b.session=l;b.set=function(c,g){c=c.split(".");for(var d=b.session,e=0;e<c.length;e++)if(e<c.length-1){var h=d[c[e]];d=h?h:d[c[e]]={}}else d=d[c[e]]=g;b.session.t=
(new Date).getTime()};b.clear=function(c){if(c)b.set(c);else for(a in b.session)delete b.session[a]};b.get=function(c,g){for(var d=c.split("."),e=b.session,h,k=0;k<d.length;k++)if(k<d.length-1){var l=e[d[k]];e=l?l:e[d[k]]={}}else h=e[d[k]];void 0==h&&(h=g,b.set(c,h));return h};f().prototype().app=function(){return b};f().prototype().appSession=function(){return JSON.parse(JSON.stringify(b.session))}})();