(function(){function k(a){a.dataTransfer.clearData();e=void 0;d={};d.from=JSON.parse(JSON.stringify(a.currentTarget.dataset));d.type="start";f("drag-move").emit(d);f(a.currentTarget).addClass("f-drag")}function l(a){d.type="end";f("drag-move").emit(d);d=void 0;var b=f(".f-drag").closest(".f-draggable").item;e?f("drag").emit({from:JSON.parse(JSON.stringify(b.dataset)),to:JSON.parse(JSON.stringify(e.dataset))}):f("drag").emit({from:JSON.parse(JSON.stringify(b.dataset))});f(a.target).removeClass("f-drag");
    f(".f-droparea-after").removeClass("on");f(".f-droparea-before").removeClass("on");f(".f-drop").removeClass("f-drop");a.preventDefault()}function m(a){g(a);var b=f(".f-drag").closest(".f-draggable").item,c=f(a.target).closest(".f-draggable").item;c.dataset.drop?(a=c.dataset.drop.split(","),f(a).each(function(a){b.dataset.what==a&&(b.dataset.id!=c.dataset.id&&b.dataset.what==c.dataset.what||b.dataset.what!=c.dataset.what)&&(e=c,f(c).addClass("f-drop"),c.dataset.type="drop")})):b.dataset.what==c.dataset.what&&
    (b.dataset.id!=c.dataset.id&&(e=c,a=b.compareDocumentPosition(c),a&Node.DOCUMENT_POSITION_PRECEDING&&f(c.parentElement).find(".f-droparea-before").addClass("on"),a&Node.DOCUMENT_POSITION_FOLLOWING&&f(c.parentElement).find(".f-droparea-after").addClass("on")),c.dataset.type="drag")}function n(a){g(a);var b=f(".f-drag").closest(".f-draggable").item,c=f(a.target).closest(".f-droppable").item;c.dataset.drop&&(a=c.dataset.drop.split(","),f(a).each(function(a){b.dataset.what==a&&(b.dataset.id!=c.dataset.id&&
      b.dataset.what==c.dataset.what||b.dataset.what!=c.dataset.what)&&(e=c,f(c).addClass("f-drop"),c.dataset.type="drop")}))}function g(a){e=void 0;f(".f-droparea-after").removeClass("on");f(".f-droparea-before").removeClass("on");f(".f-drop").removeClass("f-drop")}function h(a){a.preventDefault();a.dataTransfer.dropEffect="move";d.type="start";d.to=JSON.parse(JSON.stringify(a.target.dataset));for(var b in a)if(b.endsWith("X")||b.endsWith("Y"))d[b]=a[b];f("drag-move").emit(d)}var d=void 0,e=void 0;f().uiOnReadyPlugins().push(function(){f(".f-draggable").each(function(a){var b=
f(a);b.hasClass("f-draggable-ok")||(b.addClass("f-draggable-ok"),a.setAttribute("draggable","true"),a.addEventListener("dragstart",k,!1),a.addEventListener("dragend",l,!1),a.addEventListener("dragenter",m,!1),a.addEventListener("dragover",h,!1))});f(".f-droppable").each(function(a){var b=f(a);b.hasClass("f-droppable-ok")||(b.addClass("f-droppable-ok"),a.addEventListener("dragenter",n,!1),a.addEventListener("dragover",h,!1))})})})();