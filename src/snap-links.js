var snapLinks = new function() {

  this.convertToAsync = function(link, onElementLoaded) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      window.snapLoader.get(event.target.href)
        .then(function(element) { onElementLoaded(element, event)});
    });
  }

};
