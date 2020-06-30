var snap;

(function(converter) {

  var MODE = 'data-snap-mode';
  var APPEND = "append";
  var PREPEND =  "prepend";
  var REPLACE = "replace";
  var POSITION = {};
  POSITION[APPEND] = "beforeend";
  POSITION[PREPEND] = "afterbegin";
  POSITION[REPLACE] = "beforebegin";

  this.load = function(nodes, target, triggerElement) {
    if (!nodes || nodes.length === 0) return;
    try {
      var mode = getMode(triggerElement) || APPEND;
      var nodesToRemove = [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        addNodeToDOM(node, target, mode);
        if (mode === REPLACE) {
          nodesToRemove.push(target);
        }
      }
      for (var j = 0; j < nodesToRemove.length; j++) {
        nodesToRemove[j].remove();
      }
      for (var k = 0; k < nodes.length; k++) {
        converter.convert(nodes[k]);
      }
    } catch (e) {
      console.error("SNAP: error loading content.", e, nodes);
    }
  }

  function getMode(triggerElement) {
    var mode = triggerElement.getAttribute(MODE);
    if (mode && !([APPEND, PREPEND, REPLACE].indexOf(mode) >= 0)) {
      throw 'Invalid ' + MODE + ' = ' + mode;
    }
    return mode;
  }

  function addNodeToDOM(node, target, mode) {
    switch (node.nodeType) {
      case 1:
        target.insertAdjacentElement(POSITION[mode], node);
        return;
      case 3:
        target.insertAdjacentText(POSITION[mode], node.nodeValue);
        return;
      case 8: // comment
        target.insertAdjacentHTML(POSITION[mode], "<!--" + node.nodeValue + "-->");
        return;
      default:
        throw 'Can\'t load node of type ', node.nodeType;
    }
  }

}).call(snap.loader, snap.converter);
