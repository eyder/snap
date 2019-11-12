function SnapLinks() { }

SnapLinks.prototype.addClickListener = function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    fetch(event.target.href)
      .then(function(response) {
        response.text()
          .then(function(text) {
            var el = new DOMParser().parseFromString(text, "text/xml");
            var targets = window.SnapSelectors.findTargets(el);
            if (targets == null || targets.length === 0) {
              event.target.parentNode.replaceChild(el.documentElement, event.target);
            } else {
              // TODO
              // for (var i = 0, len = links.length; i < len; i++) {
              // }
            }
          })
          .catch(function(error) {
            // This is where you run code if the server returns any errors
          });
      })
      .catch(function(error) {
        // This is where you run code if the server returns any errors
      });
  })
}

window.SnapLinks = new SnapLinks();
