var snap = snap || {};

snap.loader = new function() {

  this.load = function(nodes, target, mode, onContentLoaded) {
    if (target == null) {
      console.error('SNAP: no target specified to load nodes.');
      return;
    }
    mode = mode || snap.constants.mode.APPEND;
    var nodesToRemove = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      this.loadNode(node, target, mode);
      if (mode === snap.constants.mode.REPLACE) {
        nodesToRemove.push(target);
      }
      onContentLoaded(node);
    }
    for (var j = 0; j < nodesToRemove.length; j++) {
      nodesToRemove[j].remove();
    }
  }

  this.loadNode = function(node, target, mode) {
    var position = this.getPositionToInsert(mode);
    switch (node.nodeType) {
      case 1:
        target.insertAdjacentElement(position, node);
        return;
      case 3:
        target.insertAdjacentText(position, node);
        return;
      case 8: // comment
        target.insertAdjacentHTML(position, node);
        return;
      default:
        console.error('SNAP: can\'t load node of type ', node.nodeType);
    }
  }

  this.getPositionToInsert = function(mode) {
    switch (mode) {
      case snap.constants.mode.REPLACE: return "beforebegin";
      case snap.constants.mode.PREPEND: return "afterbegin";
      case snap.constants.mode.APPEND: default: return "beforeend";
    }
  }

}
