var snap = snap || {};

snap.links = new function() {

  this.convertAllToAsync = function(links, onContentReceived, onErrorReceived) {
    for (var i = 0, len = links.length; i < len; i++) {
      this.convertToAsync(links[i], links[i], onContentReceived, onErrorReceived);
    }
  }

  this.convertToAsync = function(link, triggerElement, onContentReceived, onErrorReceived) {
    try {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        snap.async.get(event.target.href)
          .then(function(elements) { onContentReceived(elements, triggerElement)})
          .catch(function(error) { onErrorReceived(error, triggerElement)});
      });
    } catch (e) {
      console.error("SNAP: error converting link to async ", link, triggerElement, e);
    }
  }

};
