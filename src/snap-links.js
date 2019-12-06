var snap = snap || {};

snap.links = new function() {

  this.convertAllToAsync = function(links, onContentReceived) {
    for (var i = 0, len = links.length; i < len; i++) {
      this.convertToAsync(links[i], onContentReceived);
    }
  }

  this.convertToAsync = function(link, onContentReceived) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      snap.async.get(event.target.href)
        .then(function(element) { onContentReceived(element, event)});
    });
  }

};
