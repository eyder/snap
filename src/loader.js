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

  var LOADING_CLASS = 'snap-loading';

  var targetsLoading = [];
  var triggersLoading = [];

  this.loading = function(successTarget, triggerElement) {
    addClass(triggerElement, LOADING_CLASS);
    addClass(successTarget, LOADING_CLASS);
    var i = targetsLoading.indexOf(successTarget);
    if (i >= 0) {
      removeClass(triggersLoading[i], LOADING_CLASS);
      triggersLoading[i] = triggerElement;
    } else {
      targetsLoading.push(successTarget);
      triggersLoading.push(triggerElement);
    }
  }

  function addClass(element, newClass) {
    var classes = element.className.split(" ");
    if (classes.indexOf(newClass) == -1) {
      element.className += " " + newClass + " ";
    }
  }

  this.success = function(successTarget, triggerElement, nodes) {
    var i = targetsLoading.indexOf(successTarget);
    if (i >= 0 && triggersLoading[i] !== triggerElement) return;
    stopLoading(successTarget, triggerElement, i);
    load(nodes, successTarget, triggerElement);
  }

  this.error = function(successTarget, triggerElement, errorNodes, errorTarget) {
    var i = targetsLoading.indexOf(successTarget);
    if (i >= 0 && triggersLoading[i] !== triggerElement) return;
    stopLoading(successTarget, triggerElement, i);
    if (errorTarget) {
      load(errorNodes, errorTarget, triggerElement);
    }
  }

  function stopLoading(successTarget, triggerElement, i) {
    if (i >= 0) {
      targetsLoading.splice(i, 1);
      triggersLoading.splice(i, 1);
    }
    removeClass(triggerElement, LOADING_CLASS);
    removeClass(successTarget, LOADING_CLASS);
  }

  function removeClass(element, classToRemove) {
    var regexText = "\\b" + classToRemove + "\\b";
    var regex = new RegExp(regexText,"g");
    element.className = element.className.replace(regex, "");
  }

  function load(nodes, target, triggerElement) {
    if (!nodes || nodes.length === 0) return;
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
