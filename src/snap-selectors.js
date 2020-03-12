var snap = snap || {};

snap.selectors = new function() {

  this.findForms = function(rootElement) {
    return rootElement.querySelectorAll('form[' + snap.constants.data.TARGET + ']');
  }

  this.findLinks = function(rootElement) {
    return rootElement.querySelectorAll('a[' + snap.constants.data.TARGET + ']');
  }

  this.findNavs = function(rootElement) {
    return rootElement.querySelectorAll('nav[' + snap.constants.data.TARGET + ']');
  }

  this.findTarget = function(triggerElement) {
    return this.findTargetElement(triggerElement, snap.constants.data.TARGET);
  }

  this.findErrorTarget = function(triggerElement) {
    return this.findTargetElement(triggerElement, snap.constants.data.ERROR_TARGET);
  }

  this.findTargetElement = function(triggerElement, targetAttribute) {
    var targetValue = triggerElement.getAttribute(targetAttribute);
    var target = document.querySelector(targetValue);
    if (target == null) {
      console.error('SNAP: no target found for ' + targetAttribute + ' = ' + targetValue);
    }
    return target;
  }

  this.getMode = function(triggerElement) {
    var mode = triggerElement.getAttribute(snap.constants.data.MODE);
    if (mode && !snap.constants.modes.indexOf(mode) >= 0) {
      console.error('SNAP: invalid ' + snap.constants.data.MODE + ' = ' + mode);
      mode = undefined;
    }
    return mode;
  }
}
