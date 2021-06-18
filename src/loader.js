var snap;

(function(converter, finder) {

  var PENDING_CLASS = 'pending';
  var LOADING_CLASS = 'loading';
  //var ACTIVE_CLASS = 'active';

  var targetsLoading = [];
  var triggersLoading = [];

  this.loading = function(target, trigger) {
    addClass(trigger, PENDING_CLASS);
    addClass(target, LOADING_CLASS);
    var i = targetsLoading.indexOf(target);
    if (i >= 0) {
      removeClass(triggersLoading[i], PENDING_CLASS);
      triggersLoading[i] = trigger;
    } else {
      targetsLoading.push(target);
      triggersLoading.push(trigger);
    }
  }

  function addClass(element, newClass) {
    var classes = element.className.split(" ");
    if (classes.indexOf(newClass) == -1) {
      element.className += " " + newClass + " ";
    }
  }

  this.success = function(target, trigger, nodes) {
    if (!isCurrentTrigger(target, trigger)) return;
    stopLoading(target, trigger);
    load(nodes, target, trigger);
  }

  this.error = function(target, trigger, nodes) {
    if (!isCurrentTrigger(target, trigger)) return;
    stopLoading(target, trigger);
    if (nodes) {
      var errorTarget = findErrorTarget(target);
      load(nodes, errorTarget, trigger);
    }
  }

  function isCurrentTrigger(target, trigger) {
    var i = targetsLoading.indexOf(target);
    return i >= 0 && triggersLoading[i] === trigger;
  }

  function stopLoading(target, trigger) {
    var i = targetsLoading.indexOf(target);
    targetsLoading.splice(i, 1);
    triggersLoading.splice(i, 1);
    removeClass(trigger, PENDING_CLASS);
    removeClass(target, LOADING_CLASS);
  }

  function removeClass(element, classToRemove) {
    var regexText = "\\b" + classToRemove + "\\b";
    var regex = new RegExp(regexText,"g");
    element.className = element.className.replace(regex, "");
  }

  function findErrorTarget(target) {
    // TODO find error-bucket
    return target;
  }

  function load(nodes, target, trigger) {
    if (!nodes || nodes.length === 0) return;
    var position = getPosition(trigger);
    if (finder.isLoadOn(trigger)) {
      target.innerHTML = '';
    }
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      addNodeToDOM(node, target, position);
    }
    for (var k = 0; k < nodes.length; k++) {
      converter.convert(nodes[k]);
    }
  }

  function getPosition(trigger) {
    if (finder.isPrependTo(trigger)) {
      return "afterbegin";
    } else if (finder.isAppendTo(trigger) || finder.isLoadOn(trigger)) {
      return "beforeend";
    }
    throw 'It looks like snap data-tag was removed from element ', trigger;
  }

  function addNodeToDOM(node, target, position) {
    switch (node.nodeType) {
      case 1:
        target.insertAdjacentElement(position, node);
        return;
      case 3:
        target.insertAdjacentText(position, node.nodeValue);
        return;
      case 8: // comment
        target.insertAdjacentHTML(position, "<!--" + node.nodeValue + "-->");
        return;
      default:
        throw 'Can\'t load node of type ', node.nodeType;
    }
  }

}).call(snap.loader, snap.converter, snap.finder);
