var snap = snap || {};

snap.loader = new function() {

  this.load = function(elements, target, mode, onContentLoaded) {
    if (target == null) {
      console.error('SNAP: no target specified to load elements.');
      return;
    }
    var mode = mode || snap.constants.mode.APPEND;
    var elementsToRemove = [];
    for (var i = 0, len = elements.length; i < len; i++) {
      var element = elements[i];
      this.loadElement(element, target, mode);
      if (mode === snap.constants.mode.REPLACE) {
        elementsToRemove.push(target);
      }
      onContentLoaded(element);
    }
    for (var i = 0, len = elementsToRemove.length; i < len; i++) {
      elementsToRemove[i].remove();
    }
  }

  this.loadElement = function(element, target, mode) {
    // TODO should consider noteType before inserting
    // If the node is an element node, the nodeType property will return 1.
    // If the node is an attribute node, the nodeType property will return 2.
    // If the node is a text node, the nodeType property will return 3.
    // If the node is a comment node, the nodeType property will return 8.
    var position = this.getPositionToInsert(mode);
    target.insertAdjacentElement(position, element);
  }

  this.getPositionToInsert = function(mode) {
    switch (mode) {
      case snap.constants.mode.REPLACE: return "beforebegin";
      case snap.constants.mode.PREPEND: return "afterbegin";
      case snap.constants.mode.APPEND: default: return "beforeend";
    }
  }

}
