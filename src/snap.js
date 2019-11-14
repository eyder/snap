
var snap = new function() {

  this.load = function() {
    document.addEventListener("DOMContentLoaded", this.registerSnapElements(document.body));
  }

  this.registerSnapElements = function(ref) {
    /*
    var forms = window.SnapSelectors.findForms(document.body);
    forms.forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        fetch('snap-form-1');
      })
    });
    */
    var links = window.snapSelectors.findLinks(ref);
    //links.forEach(function(link) {
    for (var i = 0, len = links.length; i < len; i++) {
      window.snapLinks.addClickListener(links[i]);
    }
  }

}

window.snap.load();
