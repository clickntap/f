(function () {
  var db;
  f().prototype().db = function (tables, callback) {
    var request = window.indexedDB.open(this.input);
    request.onsuccess = function(event) {
      db = event.target.result;
      callback(event);
    }
    request.onupgradeneeded = function(event) {
      db = event.target.result;
      f(tables).each(function(item) {
        db.createObjectStore(item.name, { keyPath: item.key });
      });
    }
    return this;
  };
  f().prototype().dbDelete = function(table, value) {
    var transaction = db.transaction([table], 'readwrite');
    var objectStore = transaction.objectStore(table);
    objectStore['delete'](value);
    return this;
  };
  f().prototype().dbGet = function(table, value, callback) {
    var transaction = db.transaction([table], 'readonly');
    var objectStore = transaction.objectStore(table);
    objectStore.get(value).onsuccess = function(event) {
      callback(event.target.result);
    }
    return this;
  };
  f().prototype().dbList = function(table, callback) {
    var transaction = db.transaction([table], 'readonly');
    var objectStore = transaction.objectStore(table);
    var result = [];
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        result.push(cursor.value);
        cursor['continue']();
      } else {
        callback(result);
      }
    }
    return this;
  };
  f().prototype().dbPut = function(table, value) {
    var transaction = db.transaction([table], 'readwrite');
    var objectStore = transaction.objectStore(table);
    objectStore.put(value);
    return this;
  };
})();