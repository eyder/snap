var snapSelectors = new function() {

  this.findForms = function(ref) {
    return ref.querySelectorAll('form[data-snap]');
  }

  this.findLinks = function(ref) {
    return ref.querySelectorAll('a[data-snap]');
  }

  this.findElementsWithTarget = function(ref) {
    return ref.querySelectorAll('[data-snap-target]');
  }

}
