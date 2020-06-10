var snap = snap || {};

snap.loader = new function() {

  this.load = function(nodes, target, mode, onContentLoaded) {
    if (target == null) {
      throw 'No target specified to load nodes.';
    }
    mode = mode || snap.constants.mode.APPEND;
    var nodesToRemove = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      this.loadNode(node, target, mode);
      if (mode === snap.constants.mode.REPLACE) {
        nodesToRemove.push(target);
      }
    }
    for (var j = 0; j < nodesToRemove.length; j++) {
      nodesToRemove[j].remove();
    }
    for (var k = 0; k < nodes.length; k++) {
      onContentLoaded(nodes[k]);
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
        throw 'Can\'t load node of type ', node.nodeType;
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
