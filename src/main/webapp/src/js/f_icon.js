(function(){function h(c){var a=f().svg(100,100),b=a;b.set("class","f-sun");b.set("strokeLinecap","round");b.set("strokeWidth","0");b.set("fill",f().color("red",void 0));b.rect(50,50,10,10);b.set("fill",f().color("yellow",void 0));b.circle(50,50,16);b.set("stroke",f().color("yellow",void 0));b.set("strokeWidth",7*.8);for(var d=0;8>d;d++)b.set("transform","rotate("+45*d+" 50 50)"),b.move(50,18).line(50,24).end();f().icon("clear-sky"+(c?"-dark":""),a.render());a=f().svg(100,100);e(a,100,0,0,!1,c);f().icon("few-clouds"+
    (c?"-dark":""),a.render());a=f().svg(100,100);e(a,100,0,0,!0,c);f().icon("scattered-clouds"+(c?"-dark":""),a.render());a=f().svg(100,100);e(a,95,5,0,!1,c,!0);e(a,95,0,5,!1,c);f().icon("broken-clouds"+(c?"-dark":""),a.render());a=f().svg(100,100);e(a,100,0,-10,!1,c);for(b=0;4>b;b++)g(a,15,20+15*b,74,c);f().icon("shower-rain"+(c?"-dark":""),a.render());a=f().svg(100,100);e(a,100,0,-10,!0,c);for(b=1;3>b;b++)g(a,15,20+15*b,74,c);a.set();f().icon("rain"+(c?"-dark":""),a.render());a=f().svg(100,100);e(a,
    100,0,-10,!1,c);for(b=.5;3.5>b;b+=2)g(a,15,20+15*b,74,c);b=a;b.set("class","f-bolt");b.clipStart("clip");b.rect(0,0,100,20);b.clipEnd();b.set("transform","translate(30 59)");b.set("strokeWidth","0");b.set("fill",f().color("yellow",c));b.set("clip","clip");b.move(16,4).line(24,4).line(14,28).close();b.set("clip");b.move(18,12).line(26,12).line(16,36).close();f().icon("thunderstorm"+(c?"-dark":""),a.render());a=f().svg(100,100);e(a,100,0,-10,!1,c);b=a;b.set("class","f-mist");b.set("strokeLinecap","round");
    b.set("transform","translate(35 66.75)");b.set("stroke",f().color("gray1",c));b.set("strokeWidth",2.1);for(d=0;3>d;d++)b.move(3,10.95+4.35*d).line(27,10.95+4.35*d).end();f().icon("mist"+(c?"-dark":""),a.render());b=a=f().svg(100,100);b.set("class","f-snow");b.set("strokeLinecap","round");b.set("stroke",f().color("gray0",c));b.set("strokeWidth",7*.8);b.set("transform");for(d=0;3>d;d++)b.set("transform","rotate("+60*d+" 50 50)"),b.move(50,18).line(50,82).end();for(d=0;7>d;d++)b.set("transform","rotate("+
    60*d+" 50 50)"),b.move(50,34).line(40,24).end(),b.move(50,34).line(60,24).end();f().icon("snow"+(c?"-dark":""),a.render());a=f().svg(100,100);a.set("class","f-logo");a.set("fill","none");a.set("stroke",f().color("gray0",c));a.set("strokeWidth","1");a.set("class","f-cnt");a.groupStart();a.rect(42,12,16,16);a.circle(50,40,8);a.rect(42,52,16,16);a.circle(50,80,8);a.groupEnd();a.set("strokeWidth","0.5");a.groupStart();a.set();a.move(42,12).line(58,28).end();a.move(58,12).line(42,28).end();a.move(50,12).line(50,
    28).end();a.move(42,20).line(58,20).end();a.circle(50,40,3);a.move(42+16/3,52).line(42+16/3,68).end();a.move(42+32/3,52).line(42+32/3,68).end();a.move(42,52+16/3).line(58,52+16/3).end();a.move(42,52+32/3).line(58,52+32/3).end();for(b=0;5>b;b++)a.set("transform","rotate("+72*b+" 50 80)"),a.groupStart(),a.move(50,80).line(50,72).end(),a.groupEnd();a.groupEnd();f().icon("cnt"+(c?"-dark":""),a.render());a=f().svg(100,100);a.defsStart();a.maskStart("mask1");a.set();a.set("fill","white");a.rect(0,0,100,
    100);a.set("fill","none");a.set("stroke","black");a.set("strokeWidth","15");a.move(20,95).cubic(80,5,65,65,35,35).end();a.maskEnd();a.clipStart("mask2");a.set();a.set("fill","black");a.rect(0,45,100,10);a.clipEnd();a.maskStart("mask3");a.set();a.set("fill","black");a.rect(0,0,100,100);a.set("fill","white");a.circle(50,50,37.5);a.maskEnd();a.maskStart("mask4");a.set();a.set("fill","black");a.rect(0,0,100,100);a.set("fill","white");a.circle(50,50,47.5);a.maskEnd();a.defsEnd();a.set();a.set("fill","none");
    a.set("class","f-logo");a.set("stroke",f().color("gray0",c));a.set("strokeOpacity",.5);a.set("strokeWidth",10);a.set("mask","mask3");a.groupStart();for(b=-5;10>b;b++)d=10*b,a.move(d,95).cubic(d+60,5,d+45,65,d+15,35).end();a.groupEnd();a.set();a.set("class","f-logo");a.set("stroke",f().color("gray0",c));a.set("fill","none");a.set("mask","mask4");a.set("strokeLinecap","square");a.set("strokeWidth",10);a.move(20,95).cubic(80,5,65,65,35,35).end();a.set("clip","mask2");a.set("strokeWidth",10);a.move(25,
  95).cubic(85,5,70,65,40,35).end();a.set();a.set("fill","none");a.set("strokeWidth",5);a.set("class","f-logo");a.set("stroke",f().color("gray0",c));a.set("mask","mask1");a.circle(50,50,45);f().icon("f"+(c?"-dark":""),a.render())}function g(c,a,b,d,e){a/=100;c.set("class","f-drop");c.set("transform","translate("+b+" "+d+")");c.set("strokeWidth","0");c.set("fill",f().color("teal",e));c.move(20*a,60*a);c.quadratic(50*a,10*a,20*a,40*a);c.quadratic(80*a,60*a,80*a,40*a);c.move(80*a,60*a).cubic(20*a,60*a,
  80*a,100*a,20*a,100*a);c.close();c.set("transform","")}function e(c,a,b,d,e,g,h){a/=100;c.set("transform","translate("+b+" "+d+")");c.set("strokeWidth","0");b=-2.5*a;!0===e&&(c.set("class","f-sun"),c.set("fill",f().color("yellow",g)),c.circle(22.5*a,47.5*a,15*a));!0===h?(c.set("class","f-cloud"),c.set("fill",f().color("gray1",g)),c.set("class","f-cloud-1")):(c.set("fill",f().color("gray0",g)),c.set("class","f-cloud"));c.groupStart();c.set();c.circle(25*a+b,62.5*a,15*a);c.circle(50*a+b,47.5*a,25*a);
c.circle(75*a+b,57.5*a,20*a);c.rect(25*a+b,60*a,50*a,17.5*a);c.groupEnd()}var k={},l=!1;f().prototype().icon=function(c,a){!1===l&&(l=!0,h(!1),h(!0));if(a)k[c]=a;else return k[c]}})();