(function () {
  var colors = {
    'blue': 'rgb(0, 122, 255)',
    'green':'rgb(52, 199, 89)',
    'indigo':'rgb(88, 86, 214)',
    'orange':'rgb(255, 149, 0)',
    'pink':'rgb(255, 45, 85)',
    'purple':'rgb(175, 82, 222)',
    'red':'rgb(255, 59, 48)',
    'teal':'rgb(90, 200, 250)',
    'yellow':'rgb(255, 204, 0)',
    'gray-5':'rgb(0, 0, 0)',
    'gray-4':'rgb(28, 28, 30)',
    'gray-3':'rgb(44, 44, 46)',
    'gray-2':'rgb(58, 58, 60)',
    'gray-1':'rgb(72, 72, 74)',
    'gray0':'rgb(99, 99, 102)',
    'gray1':'rgb(142, 142, 147)',
    'gray2':'rgb(174, 174, 178)',
    'gray3':'rgb(199, 199, 204)',
    'gray4':'rgb(209, 209, 214)',
    'gray5':'rgb(229, 229, 234)',
    'gray6':'rgb(242, 242, 247)',
    'darkBlue':'rgb(10, 132, 255)',
    'darkGreen':'rgb(48, 209, 88)',
    'darkIndigo':'rgb(94, 92, 230)',
    'darkOrange':'rgb(255, 159, 10)',
    'darkPink':'rgb(255, 55, 95)',
    'darkPurple':'rgb(191, 90, 242)',
    'darkRed':'rgb(255, 69, 58)',
    'darkTeal':'rgb(100, 210, 255)',
    'darkYellow':'rgb(255, 214, 10)',
    'darkGray-5':'rgb(255, 255, 255)',
    'darkGray-4':'rgb(242, 242, 247)',
    'darkGray-3':'rgb(229, 229, 234)',
    'darkGray-2':'rgb(209, 209, 214)',
    'darkGray-1':'rgb(199, 199, 204)',
    'darkGray0':'rgb(174, 174, 178)',
    'darkGray1':'rgb(142, 142, 147)',
    'darkGray2':'rgb(99, 99, 102)',
    'darkGray3':'rgb(72, 72, 74)',
    'darkGray4':'rgb(58, 58, 60)',
    'darkGray5':'rgb(44, 44, 46)',
    'darkGray6':'rgb(28, 28, 30)'
  }
  f().prototype().color = function (name, isDark) {
    if (isDark === true) {
      name = 'dark'+name.charAt(0).toUpperCase() + name.slice(1);
    }
    return colors[name];
  };
  f().prototype().colors = function () {
    return colors;
  };
  f().prototype().isDark = function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    } else {
      return false;
    }
  };
})();