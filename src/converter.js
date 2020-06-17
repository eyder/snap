var snap;

(function(loader, http) {

  var TARGET = 'data-snap-target';
  var ERROR_TARGET = 'data-snap-error-target';

  this.convert = function(content) {
    if (content && content.nodeType === 1) {
      var navs = findTagsWithTarget(content, 'nav');
      for (var j = 0; j < navs.length; j++) convertNav(navs[j]);
      var links = findTagsWithTarget(content, 'a');
      for (var i = 0; i < links.length; i++) convertLink(links[i], links[i]);
    }
  }

  function findTagsWithTarget(rootElement, tag) {
    return rootElement.querySelectorAll(tag + '[' + TARGET + ']');
  }

  function convertNav(nav) {
    try {
      var links = nav.querySelectorAll("a");
      for (var i = 0; i < links.length; i++) {
        convertLink(links[i], nav);
      }
    } catch (e) {
      console.error("SNAP: error converting NAV links to async ", nav, e);
    }
  }

  function convertLink(link, triggerElement) {
    try {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        http.get(event.target.href)
          .then(function(nodes) { loadContent(nodes, triggerElement)})
          .catch(function(error) { loadError(error, triggerElement)});
      });
    } catch (e) {
      console.error("SNAP: error converting link to async ", link, triggerElement, e);
    }
  }

  function loadContent(nodes, triggerElement) {
    var target = findTarget(triggerElement, TARGET);
    loader.load(nodes, target, triggerElement);
  }

  function loadError(errorNodes, triggerElement) {
    var target = findTarget(triggerElement, ERROR_TARGET) || findTarget(triggerElement, TARGET);
    loader.load(errorNodes, target, triggerElement);
  }

  function findTarget(triggerElement, targetAttribute) {
    var targetValue = triggerElement.getAttribute(targetAttribute);
    var target = document.querySelector(targetValue);
    if (target == null) {
      console.error("SNAP: No target found for " + targetAttribute + " = " + targetValue);
    }
    return target;
  }

}).call(snap.converter, snap.loader, snap.http);
