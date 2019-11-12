
function Snap() {
  document.addEventListener("DOMContentLoaded", this.registerSnapElements());
}

Snap.prototype.registerSnapElements = function() {
  /*
  var forms = window.SnapSelectors.findForms(document.body);
  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      fetch('snap-form-1');
    })
  });
  */
  var links = window.SnapSelectors.findLinks(document.body);
  //links.forEach(function(link) {
  for (var i = 0, len = links.length; i < len; i++) {
    window.SnapLinks.addClickListener(links[i]);
  }
}

window.snap = new Snap();
