var snap = snap || {};

snap.loader = new function() {

  this.load = function(content, event, onContentLoaded) {
    var elementsWithTarget = snap.selectors.findElementsWithTarget(content);
    if (elementsWithTarget == null || elementsWithTarget.length === 0) {
      this.loadOnEventTarget(content, event, onContentLoaded);
    } else {
      for (var i = 0, len = elementsWithTarget.length; i < len; i++) {
        var targets = snap.selectors.findTargets(document, elementsWithTarget[i]);
        this.loadOnTargets(elementsWithTarget[i], targets, onContentLoaded);
      }
    }
  }

  this.loadOnEventTarget = function(content, event, onContentLoaded) {
    event.target.parentNode.replaceChild(content.documentElement, event.target);
    onContentLoaded(content.documentElement);
  }

  this.loadOnTargets = function(content, targets, onContentLoaded) {
    for (var i = 0, len = targets.length; i < len; i++) {
      content.documentElement.getAttribute('da')
      targets[i]
      event.target.parentNode.replaceChild(content.documentElement, event.target);
      onContentLoaded(content.documentElement);
    }
  }

}
