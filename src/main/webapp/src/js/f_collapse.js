(function(){function updateCollapse(collapse){var height=0;collapse.find(".f-body").each(function(body){height=body.children[0].getBoundingClientRect().height});collapse.find(".f-body").each(function(body){if(collapse.hasClass("f-on"))body.style.height=height+"px";else body.style.height=0+"px";app.collapses=app.collapses});collapse.find(".f-header").find(".f-icon").each(function(icon){icon.innerHTML='\x3ci class\x3d"'+f().fa()+' fa-angle-down"\x3e\x3c/i\x3e'})}f().prototype().collapse=function(json){if(json)this.each(function(item){f(item).find(".f-body").each(function(body){body.children[0].addEventListener("DOMSubtreeModified",
function(event){var collapse=f(event.target).closest(".f-collapse");updateCollapse(collapse)})});f(item).find(".f-header").on("click",function(event){var collapse=f(event.target).closest(".f-collapse");collapse.toggleClass("f-on");updateCollapse(collapse)})});f(".f-collapse").each(function(collapse){updateCollapse(f(collapse))});if(json)json.onready();return this}})();