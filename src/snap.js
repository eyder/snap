
var snap = new function() {

  this.load = function() {
    document.addEventListener("DOMContentLoaded", this.convertLinksToAsync(document.body));
  }

  this.convertLinksToAsync = function(ref) {
    var links = window.snapSelectors.findLinks(ref);
    for (var i = 0, len = links.length; i < len; i++) {
      window.snapLinks.convertToAsync(links[i], window.snap.onElementLoaded);
    }
  }

    /*
    var forms = window.SnapSelectors.findForms(document.body);
    forms.forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        fetch('snap-form-1');
      })
    });
    */

  this.onElementLoaded = function(element, event) {
    var elementsWithTarget = window.snapSelectors.findElementsWithTarget(element);
    if (elementsWithTarget == null || elementsWithTarget.length === 0) {
      event.target.parentNode.replaceChild(element.documentElement, event.target);
    } else {
      for (var i = 0, len = elementsWithTarget.length; i < len; i++) {
        // TODO
      }
    }

  }

}

window.snap.load();
