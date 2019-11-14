var snapSelectors = new function() {

  this.findForms = function(ref) {
    return ref.querySelectorAll('form[data-snap]');
  }

  this.findLinks = function(ref) {
    return ref.querySelectorAll('a[data-snap]');
  }

  this.findTargets = function(ref) {
    return ref.querySelectorAll('[data-snap-target]');
  }

}
