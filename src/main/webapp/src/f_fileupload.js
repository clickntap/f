(function () {
  f().prototype().fileupload = function (options) {
    options = options || {};
    this.each(function (item) {
      if (!item.getAttribute('fileupload')) {
        item.onchange = function () {
          var input = this;
          var files = input.files;
          var url = input.getAttribute('data-url');
          var json = undefined;
          try {
            json = JSON.parse(input.getAttribute('data-json'));
          } catch(err) {
          }
          f().api(function(headers) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              var request = new XMLHttpRequest();
              var formData = new FormData();
              if(json !== undefined) {
                var blob = new Blob([JSON.stringify(json)], { type: "application/json"});
                formData.append("json", blob);
              }
              formData.set(input.name, file, file.name);
              if (typeof (options.timeout) != 'undefined') {
                request.timeout = options.timeout;
              }
              if (typeof (options.progress) == 'function') {
                request.onprogress = options.progress;
              }
              request.onloadend = function (event) {
                if (typeof (options.stop) == 'function') {
                  setTimeout(function () {
                    options.stop(event);
                  }, 0);
                }
                if(json !== undefined) {
                  try {
                    json.info = JSON.parse(event.target.responseText);
                  } catch(err) {
                  }
                  delete json.progress;
                  f('upload-complete').emit(json);
                }
                input.value = '';
              };
              if (typeof (options.start) == 'function') {
                request.onloadstart = options.start;
              }
              request.open('POST', url);
              f(Object.keys(headers)).each(function (key) {
                request.setRequestHeader(key, headers[key]);
              });
              request.upload.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                  var percentComplete = evt.loaded / evt.total;
                  if(json !== undefined) {
                    json.progress = percentComplete;
                    f('upload-progress').emit(json);
                  }
                }
              }, false);
              request.send(formData);
              if(json !== undefined) {
                delete json.progress;
                f('upload-start').emit(json);
              }
            }
          });
          item.blur();
        };
        item.setAttribute('fileupload', true);
      }
    });
  };
})();