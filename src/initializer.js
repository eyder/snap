var snap;

(function(converter) {

  this.init = function() {
    converter.convert(document.body);
  }

}).call(snap.initializer, snap.converter);

document.addEventListener("DOMContentLoaded", snap.initializer.init);
