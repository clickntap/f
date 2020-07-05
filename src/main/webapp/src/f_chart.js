(function () {
  var smoothing = 0.15;
  function line(pointA, pointB) {
    var lengthX = pointB[0] - pointA[0]
    var lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
  }
  function controlPoint(current, previous, next, reverse) {
    var p = previous || current;
    var n = next || current;
    var o = line(p, n);
    var angle = o.angle + (reverse ? Math.PI : 0);
    var length = o.length * smoothing;
    var x = current[0] + Math.cos(angle) * length;
    var y = current[1] + Math.sin(angle) * length;
    return [x, y];
  }
  function bezierCommand(point, i, a) {
    var cps = controlPoint(a[i - 1], a[i - 2], point)
    var cpe = controlPoint(point, a[i - 1], a[i + 1], true)
    return 'C '+cps[0]+','+cps[1]+' '+cpe[0]+','+cpe[1]+' '+point[0]+','+point[1];
  }
  function svgPath(points) {
    return points.reduce(function(acc, point, i, a){
      return i == 1? 'M '+point[0]+','+point[1] : acc + bezierCommand(point, i, a);
    });
  }
  f().prototype().chart = function (options) {
    var chart = {};
    chart.options = options;
    chart.render = function () {
      return renderChart(chart.options);
    }
    return chart;
  };
  function renderValues(json, values, colors) {
    if(!values) {
      return '';
    }
    var labelSizeX = json.labelSizeX;
    var labelSizeY = json.labelSizeY;
    var size = json.size;
    var prevX;
    var prevY;
    var svg = '<g clip-path="url(#clip-path-'+json.id+')">';
    var points = [];
    var fontSize = Math.min(Math.max(9,size/2), 15);
    f(values).each(function (value, index) {
      var x = (json.width*labelSizeX+index*size);
      if(json.type == 'bar') {
        x = (json.width*labelSizeX+index*size+size/2);
      }
      var y = json.height*(1-labelSizeY);
      var hmax = json.height*(1-labelSizeY*2);
      y = hmax-(value/json.max)*hmax+json.height*labelSizeY;
      if(json.type == 'bezier') {
        if(index == 0) {
          points.push([x,y]);
        }
        points.push([x,y]);
      }
      x = x.toFixed(2);
      y = y.toFixed(2);
      if(json.type == 'line' || json.type == 'bezier') {
        if(json.type == 'line') {
          if(index > 0) {
            svg += '<path stroke-linecap="round" stroke-width="'+Math.min(4,size/4)+'" stroke-opacity="0.75" stroke="'+colors[index%colors.length]+'" fill="none" d="M'+prevX+','+prevY+'L'+x+','+y+'"/>';
          }
        }
        svg += '<circle fill="'+colors[index%colors.length]+'" cx="'+x+'" cy="'+y+'" r="'+Math.min(3,size/6)+'"/>';
      }
      if(json.type == 'bar') {
        svg += '<path stroke-width="'+size*0.8+'" stroke-opacity="0.75" stroke="'+colors[index%colors.length]+'" d="M'+x+','+y+'L'+x+','+(json.height*(1-labelSizeY))+'"/>';
      }
      prevX = x;
      prevY = y;
    });
    if(json.type == 'bezier') {
      svg += '<path stroke-width="'+Math.min(4,size/4)+'" stroke-opacity="0.75" stroke="'+colors[0]+'" fill="none" d="'+svgPath(points)+'"/>';
    }
    svg += '</g>';
    return svg;
  }
  function renderChart(json) {
    if(!json.width) {
      return '';
    }
    var chartLabelsColor = 'var(--color-gray1)';
    var chartAxisColor = 'var(--color-gray1)';
    var chartGridColor = 'var(--color-gray4)';
    if(!json.chartLabelsColor) {
      json.chartLabelsColor = chartLabelsColor;
    }
    if(!json.chartAxisColor) {
      json.chartAxisColor = chartAxisColor;
    }
    if(!json.chartGridColor) {
      json.chartGridColor = chartGridColor;
    }
    if(!json.isPercentage) {
      json.isPercentage = false;
    }
    var id = Math.random().toString(36).substr(2, 9);
    var svg = '';
    var labelSizeX = 0.15;
    var labelSizeY = 0.15;
    if(!json.labels) {
      labelSizeX = 3/json.width;
      labelSizeY = 3/json.height;
    } else {
      labelSizeX = Math.min(0.15,96/json.width);
      labelSizeY = Math.min(0.15,96/json.height);
    }
    var size = (json.width*(1-labelSizeX*2))/(json.values.length-1);
    if(json.type == 'bar') {
      size = (json.width*(1-labelSizeX*2))/(json.values.length);
    }
    json.labelSizeX = labelSizeX;
    json.labelSizeY = labelSizeY;
    json.size = size;
    json.id = id;
    json.x0 = Math.round(json.width*labelSizeX);
    json.y0 = Math.round(json.height*labelSizeY);
    json.x1 = Math.round(json.width*(1-labelSizeX));
    json.y1 = Math.round(json.height*(1-labelSizeY));
    svg += '<div style="position:relative;width:100%;height:'+json.height+'px;">';
    for(var i=0;i<json.yaxis;i++) {
      var x0 = json.x0;
      var y0 = json.y0-6+(json.height*(1-labelSizeY*2)*i/json.yaxis);
      if(json.labels) {
        svg += '<div class="chart-labels" style="width:'+json.x0+'px;text-align:right;position:absolute;font-size:12px;line-height:12px;left:0px;top:'+(y0)+'px;color:'+json.chartLabelsColor+'">'+Math.round(json.max*(1-i/json.yaxis))+(json.isPercentage?' %':'')+'&nbsp;&nbsp;</div>';
      }
    }
    f(json.labels).each(function (value, index) {
      var fontSize = Math.min(Math.max(9,size/2), 15);
      var x = (json.width*labelSizeX+index*size)-fontSize/2+2;
      if(json.type == 'bar') {
        x = (json.width*labelSizeX+index*size+size/2)-fontSize/2+2;
      }
      if(window.navigator) {
        svg += '<div class="chart-labels" style="writing-mode:tb-rl;width:'+fontSize+'px;height:'+(json.y0)+'px;position:absolute;font-size:'+fontSize+'px;line-height:'+fontSize+'px;left:'+x+'px;top:'+(json.height*(1-labelSizeY))+'px;color:'+json.chartLabelsColor+'">&nbsp;&nbsp;'+value+'</div>';
      } else {
        svg += '<table style="position:absolute;left:'+x+'px;top:'+(json.height*(1-labelSizeY))+'px;"><tr><td class="chart-labels" style="writing-mode:tb-rl;width:'+fontSize+'px;height:'+(json.y0*2)+'px;font-size:'+fontSize+'px;line-height:'+fontSize+'px;color:'+json.chartLabelsColor+'">&nbsp;&nbsp;'+value+'</td></tr></table>';
      }
    });
    svg += '<svg viewBox="0,0,'+json.width+','+json.height+'" width="'+json.width+'" height="'+json.height+'">';
    for(var i=0;i<json.yaxis;i++) {
      var x0 = json.x0;
      var y0 = Math.round(json.height*labelSizeY+(json.height*(1-labelSizeY*2)*i/json.yaxis));
      var x1 = json.x1;
      var y1 = y0;
      svg += '<path class="chart-grid" fill="none" stroke="'+json.chartGridColor+'" stroke-width="1" d="M'+x0+','+y0+'L'+x1+','+y1+'"/>';
    }
    if(json.type == 'line' || json.type == 'bezier') {
      svg += '<path class="chart-axis" fill="none" stroke-width="3" stroke-linecap="round" stroke="'+json.chartAxisColor+'" d="M'+json.x0+','+json.y0+'L'+json.x0+','+json.y1+'L'+json.x1+','+json.y1+'"/>';
    }
    svg += renderValues(json, json.values, json.colors);
    svg += renderValues(json, json.values1, json.colors1);
    svg += renderValues(json, json.values2, json.colors2);
    svg += renderValues(json, json.values3, json.colors3);
    if(json.type == 'bar') {
      svg += '<path class="chart-axis" fill="none" stroke-width="3" stroke-linecap="round" stroke="'+json.chartAxisColor+'" d="M'+json.x0+','+json.y0+'L'+json.x0+','+json.y1+'L'+json.x1+','+json.y1+'"/>';
    }
    svg += '</svg>';
    svg += '</div>';
    return svg;
  }
  function resizeCharts() {
    f('.f-chart').each(function(item, index){
      var rect = item.getBoundingClientRect();
      var json = JSON.parse(item.dataset.json);
      json.width = rect.width;
      f(item).html(f().chart(json).render());
    });
  }
  f(window).on('resize', resizeCharts);
  var chartPlugin = function(resolve, context) {
    var item = f(context.div).find('.f_chart').item;
    if (item) {
      f(item).removeClass('f_chart').addClass('f-chart');
      var json = JSON.parse(f(item).html());
      item.dataset.json = JSON.stringify(json);
      f(item).html(renderChart(json));
      f(context.div).uiRender(context.callback);
    } else {
      resolve(context);
    }
  }
  f().uiPlugins().push(chartPlugin);
  f().uiOnReadyPlugins().push(resizeCharts);
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  function describeArc(startAngle, endAngle) {
    var start = polarToCartesian(50, 50, 50, endAngle);
    var end = polarToCartesian(50, 50, 50, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
    'M', start.x, start.y,
    'A', 50, 50, 0, largeArcFlag, 0, end.x, end.y,
    'L', 50, 50, 'Z'
    ].join(' ');
    return d;
  }
})();