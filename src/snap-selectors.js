var snap = snap || {};

snap.selectors = new function() {

  this.DATA_SNAP_TARGET = 'data-snap-target';

  this.findForms = function(rootElement) {
    return rootElement.querySelectorAll('form[data-snap]');
  }

  this.findLinks = function(rootElement) {
    return rootElement.querySelectorAll('a[data-snap]');
  }

  this.findElementsWithTarget = function(rootElement) {
    return rootElement.querySelectorAll('[' + this.DATA_SNAP_TARGET + ']');
  }

  this.findTargets = function(rootElement, elementWithTarget) {
    var targetValue = this.getTargetValue(elementWithTarget);
    var targets = rootElement.querySelectorAll(targetValue);
    if (targets == null || targets.length === 0) {
      console.error('SNAP: no target found for ' + this.DATA_SNAP_TARGET + ' = ' + targetValue);
      return [];
    }
    return targets;
  }

  this.getTargetValue = function(element) {
    return element.getAttribute(this.DATA_SNAP_TARGET);
  }

}
