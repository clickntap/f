(function(){f().prototype().interactive=function(d){this.each(function(b){function g(a,c){return{x:c.clientX-a.x,y:c.clientY-a.y}}function l(a,c){e=!0;if(a.down){var b=g(h,c);b.down=e;a.down(c,b)}}function k(a,b){e=!1;if(a.up){var c=g(h,b);c.down=e;a.up(b,c)}}function m(a,b){if(a.move){var c=g(h,b);c.down=e;a.move(b,c)}}var h=b.getBoundingClientRect(),e=!1;f(b).on("mousedown",function(a){0===a.button&&l(d,a)},!0);f(b).on("mouseup",function(a){0===a.button&&k(d,a)},!0);f(b).on("mousemove",function(a){m(d,
a)},!0);f(b).on("touchstart",function(a){l(d,a.touches[0])},!0);f(b).on("touchend",function(a){k(d,a)},!0);f(b).on("touchcancel",function(a){k(d,a)},!0);f(b).on("touchmove",function(a){m(d,a.touches[0])},!0)});return this}})();