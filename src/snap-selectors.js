function SnapSelectors() { }

SnapSelectors.prototype.findForms = function(ref) {
  return ref.querySelectorAll('form[data-snap]');
}

SnapSelectors.prototype.findLinks = function(ref) {
  return ref.querySelectorAll('a[data-snap]');
}

SnapSelectors.prototype.findTargets = function(ref) {
  return ref.querySelectorAll('[data-snap-target]');
}

window.SnapSelectors = new SnapSelectors();
