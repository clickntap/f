[#include "lib/t.js"]
function selectModule(module) {
  f().app().set('module', module);
  f().ui({target:'#doc',onready:setupUi});
}

f(window).on('load',function() {
  f('body').uiRender(setupUi);
});

function setupUi() {
  setupCards();
}

function setupCards() {
  var cardContext = undefined;
  f('body').interactive({
    up:function(event, context) {
      f('.card').each(function(item) {
        item.style.marginLeft = 'auto';
        item.style.transform = '';
        item.style.opacity = 1;
      });
      cardContext = undefined;
    },
    move:function(event, context) {
      if(cardContext) {
        var offset = (cardContext.containerRect.width-cardContext.cardRect.width)/2;
        cardContext.card.style.marginLeft = (context.x-cardContext.cardRect.x-cardContext.context.x+offset)+'px';
        var distance = (parseInt(cardContext.card.style.marginLeft)-offset)/100;
        cardContext.card.style.transform = 'rotatez('+(distance*10)+'deg)';
        cardContext.card.style.opacity = 1-Math.abs(distance/4);
      }
    }
  });
  f('.card').interactive({
    down:function(event, context) {
      var card = f(event.target).closest('.card').item;
      var container = f(event.target).closest('.visua-search').item;
      cardContext = {card:card,context:context,cardRect:card.getBoundingClientRect(),containerRect:container.getBoundingClientRect()};
    }
  });
}