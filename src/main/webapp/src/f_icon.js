(function () {
  var icons = {};
  var iconsReady = false;
  f().prototype().icon = function (name, code) {
    if(iconsReady === false) {
      iconsReady = true;
      setupIcons(false);
      setupIcons(true);
    }
    if(code) {
      icons[name] = code;
    } else {
      return icons[name];
    }
  };
  function setupIcons(isDark) {
    {
      var svg = f().svg(100,100);
      renderSun(svg, 80, isDark);
      f().icon('clear-sky'+(isDark?'-dark':''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      renderCloud(svg, 100, 0, 0, false, isDark);
      f().icon('few-clouds'+(isDark ? '-dark' : ''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      renderCloud(svg, 100, 0, 0, true, isDark);
      f().icon('scattered-clouds'+(isDark ? '-dark' : ''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      renderCloud(svg, 95, 5, 0, false, isDark, true);
      renderCloud(svg, 95, 0, 5, false, isDark);
      f().icon('broken-clouds' + (isDark ? '-dark' : ''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      renderCloud(svg, 100, 0, -10, false, isDark);
      for (var i=0; i<4; i++) {
        renderDrop(svg, 15, 20 + i * 15, 74, isDark);
      }
      f().icon('shower-rain' + (isDark ? '-dark' : ''), svg.render());
    }
    {
      var svg = f().svg(100,100);
      renderCloud(svg, 100, 0, -10, true, isDark);
      for (var i=1; i<3; i++) {
        renderDrop(svg, 15, 20 + i * 15, 74, isDark);
      }
      svg.set();
      f().icon('rain' + (isDark ? '-dark' : ''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      renderCloud(svg, 100, 0, -10, false, isDark);
      for (var i=0.5; i<3.5; i+=2) {
        renderDrop(svg, 15, 20 + i * 15, 74, isDark);
      }
      renderBolt(svg, 40, 30, 59, isDark);
      f().icon('thunderstorm' + (isDark ? '-dark' : ''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      renderCloud(svg, 100, 0, -10, false, isDark);
      renderMist(svg, 30, 35, 66.75, isDark);
      f().icon('mist' + (isDark ? '-dark' : ''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      renderSnow(svg, 80, 10, 10, isDark);
      f().icon('snow' + (isDark ? '-dark' : ''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      svg.set('class','f-logo');
      svg.set('fill','none');
      svg.set('stroke', f().color('gray0', isDark));
      svg.set('strokeWidth','1');
      svg.set('class', 'f-cnt');
      svg.groupStart();
      svg.rect(42,12,16,16);
      svg.circle(50,40,8);
      svg.rect(42,52,16,16);
      svg.circle(50,80,8);
      svg.groupEnd();
      svg.set('strokeWidth','0.5');
      svg.groupStart();
      svg.set();
      svg.move(42,12).line(58,28).end();
      svg.move(58,12).line(42,28).end();
      svg.move(50,12).line(50,28).end();
      svg.move(42,20).line(58,20).end();
      svg.circle(50,40,3);
      svg.move(42+16/3,52).line(42+16/3,68).end();
      svg.move(42+16*2/3,52).line(42+16*2/3,68).end();
      svg.move(42,52+16/3).line(58,52+16/3).end();
      svg.move(42,52+16*2/3).line(58,52+16*2/3).end();
      for(var i=0;i<5;i++) {
        svg.set('transform','rotate('+(i*72)+' 50 80)');
        svg.groupStart();
        svg.move(50,80).line(50,72).end();
        svg.groupEnd();
      }
      svg.groupEnd();
      f().icon('cnt' + (isDark ? '-dark' : ''),svg.render());
    }
    {
      var svg = f().svg(100,100);
      svg.defsStart();
      svg.maskStart('mask1');
      svg.set();
      svg.set('fill', 'white');
      svg.rect(0, 0, 100, 100);
      svg.set('fill', 'none');
      svg.set('stroke', 'black');
      svg.set('strokeWidth', '15');
      svg.move(20, 95).cubic(80, 5, 65, 65, 35, 35).end();
      svg.maskEnd();
      svg.clipStart('mask2');
      svg.set();
      svg.set('fill', 'black');
      svg.rect(0, 45, 100, 10);
      svg.clipEnd();
      svg.maskStart('mask3');
      svg.set();
      svg.set('fill', 'black');
      svg.rect(0, 0, 100, 100);
      svg.set('fill', 'white');
      svg.circle(50, 50, 37.5);
      svg.maskEnd();
      svg.maskStart('mask4');
      svg.set();
      svg.set('fill', 'black');
      svg.rect(0, 0, 100, 100);
      svg.set('fill', 'white');
      svg.circle(50, 50, 47.5);
      svg.maskEnd();
      svg.defsEnd();
      svg.set();
      svg.set('fill', 'none');
      svg.set('class', 'f-logo');
      svg.set('stroke', f().color('gray0', isDark));
      svg.set('strokeOpacity',0.5);
      svg.set('strokeWidth', 10);
      svg.set('mask', 'mask3');
      svg.groupStart();
      for (var i = -5; i < 10; i++) {
        var x = i * 10;
        svg.move(x, 95).cubic(x + 60, 5, x + 45, 65, x + 15, 35).end();
      }
      svg.groupEnd();
      svg.set();
      svg.set('class','f-logo');
      svg.set('stroke',f().color('gray0', isDark));
      svg.set('fill','none');
      svg.set('mask','mask4');
      svg.set('strokeLinecap','square');
      svg.set('strokeWidth',10);
      svg.move(20,95).cubic(80,5,65,65,35,35).end();
      svg.set('clip','mask2');
      svg.set('strokeWidth',10);
      svg.move(25,95).cubic(85,5,70,65,40,35).end();
      svg.set();
      svg.set('fill','none');
      svg.set('strokeWidth',5);
      svg.set('class','f-logo');
      svg.set('stroke', f().color('gray0', isDark));
      svg.set('mask','mask1');
      svg.circle(50,50,45);
      f().icon('f' + (isDark ? '-dark' : ''),svg.render());
    }
  };
  function renderDrop(svg, size, x, y, isDark) {
    var percentage = size/100;
    svg.set('class','f-drop');
    svg.set('transform', 'translate('+x+' '+y+')');
    svg.set('strokeWidth', '0');
    svg.set('fill', f().color('teal', isDark));
    svg.move(20 * percentage, 60 * percentage);
    svg.quadratic(50 * percentage, 10 * percentage, 20 * percentage, 40 * percentage);
    svg.quadratic(80 * percentage, 60 * percentage, 80 * percentage, 40 * percentage);
    svg.move(80 * percentage, 60 * percentage).cubic(20 * percentage, 60 * percentage, 80 * percentage, 100 * percentage, 20 * percentage, 100 * percentage);
    svg.close();
    svg.set('transform', '');
  }
  function renderCloud(svg, size, x, y, sun, isDark, isDouble) {
    var percentage = size/100;
    svg.set('transform', 'translate('+x+' '+y+')');
    svg.set('strokeWidth', '0');
    var offset = -2.5*percentage;
    if(sun === true) {
      svg.set('class','f-sun');
      svg.set('fill', f().color('yellow', isDark));
      svg.circle(22.5*percentage, 47.5*percentage, 15*percentage);
    }
    if (isDouble === true) {
      svg.set('class','f-cloud');
      svg.set('fill', f().color('gray1', isDark));
      svg.set('class', 'f-cloud-1');
    } else {
      svg.set('fill', f().color('gray0', isDark));
      svg.set('class', 'f-cloud');
    }
    svg.groupStart();
    svg.set();
    svg.circle(25*percentage+offset,62.5*percentage,15*percentage);
    svg.circle(50*percentage+offset,47.5*percentage,25*percentage);
    svg.circle(75*percentage+offset,57.5*percentage,20*percentage);
    svg.rect(25*percentage+offset,60*percentage,50*percentage,17.5*percentage);
    svg.groupEnd();
  }
  function renderSun(svg, size, x ,y, isDark) {
    var percentage = size/100;
    svg.set('class','f-sun');
    svg.set('strokeLinecap','round');
    svg.set('strokeWidth', '0');
    svg.set('fill', f().color('red', isDark));
    svg.rect(50, 50, 10, 10);
    svg.set('fill', f().color('yellow', isDark));
    svg.circle(62.5*percentage, 62.5*percentage, 20*percentage);
    if (size >= 80) {
      svg.set('stroke', f().color('yellow', isDark));
      svg.set('strokeWidth', 7*percentage);
      for (var i=0; i<8; i++) {
        svg.set('transform', 'rotate('+(i*45)+' '+(62.5*percentage)+' '+(62.5*percentage)+')');
        svg.move(62.5*percentage,22.5*percentage).line(62.5*percentage,30*percentage).end();
      };
    }
  }
  function renderSnow(svg, size, x, y, isDark) {
    var percentage = size/100;
    svg.set('class','f-snow');
    svg.set('strokeLinecap','round');
    svg.set('stroke', f().color('gray0', isDark));
    svg.set('strokeWidth', 7*percentage);
    svg.set('transform');
    for (var i=0; i<3; i++){
      svg.set('transform', 'rotate(' + (i * 60) + ' ' + (62.5 * percentage) + ' ' + (62.5 * percentage) + ')')
      svg.move(62.5 * percentage, 22.5 * percentage).line(62.5 * percentage, 102.5 * percentage).end();
    };
    for (var r = 0; r < 7; r++){
      svg.set('transform', 'rotate(' + (r * 60) + ' ' + (62.5 * percentage) + ' ' + (62.5 * percentage) + ')');
      svg.move(62.5*percentage,42.5*percentage).line(50*percentage,30*percentage).end();
      svg.move(62.5*percentage,42.5*percentage).line(75*percentage,30*percentage).end();
    };
  }
  function renderBolt(svg, size, x, y, isDark){
    var percentage = size/100;
    svg.set('class','f-bolt');
    svg.clipStart('clip');
    svg.rect(0*percentage,0*percentage,100,50*percentage);
    svg.clipEnd();
    svg.set('transform', 'translate('+x+' '+y+')');
    svg.set('strokeWidth', '0');
    svg.set('fill', f().color('yellow', isDark));
    svg.set('clip', 'clip');
    svg.move(40*percentage,10*percentage).line(60*percentage,10*percentage).line(35*percentage,70*percentage).close();
    svg.set('clip');
    svg.move(45*percentage,30*percentage).line(65*percentage,30*percentage).line(40*percentage,90*percentage).close();
  }
  function renderStar(svg, size, x, y, isDark) {
    var percentage = size/100;
    svg.set('class','cloud');
    svg.set('strokeWidth', '0');
    svg.set('fill', f().color('gray1', isDark));
    svg.move(50,10).line(60,40).line(90,50).line(60,60).line(50,90).line(40,60).line(10,50).line(40,40).close();
  }
  function renderMist(svg, size, x, y, isDark) {
    var percentage = size/100;
    svg.set('class','f-mist');
    svg.set('strokeLinecap','round');
    svg.set('transform', 'translate('+x+' '+y+')');
    svg.set('stroke', f().color('gray1', isDark));
    svg.set('strokeWidth', 7*percentage);
    for (var i=0; i<3; i++){
      svg.move(10*percentage,36.5*percentage+i*14.5*percentage).line(90*percentage,36.5*percentage+i*14.5*percentage).end();
    };
  }
})();