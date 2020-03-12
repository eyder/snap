var snap = snap || {};

snap.onContentLoaded = function(content) {
  var links = snap.selectors.findLinks(content);
  snap.links.convertAllToAsync(links, snap.onContentReceived, snap.onErrorReceived);
  var navs = snap.selectors.findNavs(content);
  snap.navs.convertAllLinksToAsync(navs, snap.onContentReceived, snap.onErrorReceived);
}

snap.onContentReceived = function(elements, triggerElement) {
  if (!elements) return;
  try {
    var target = snap.selectors.findTarget(triggerElement);
    var mode = snap.selectors.getMode(triggerElement);
    snap.loader.load(elements, target, mode, snap.onContentLoaded);
  } catch (e) {
    console.error("SNAP: error loading content ", elements, e);
  }
}

snap.onErrorReceived = function(errorElements, triggerElement) {
  if (!errorElements) return;
  try {
    var target = snap.selectors.findErrorTarget(triggerElement);
    var mode = snap.selectors.getMode(triggerElement);
    snap.loader.load(errorElements, target, mode, snap.onContentLoaded);
  } catch (e) {
    console.error("SNAP: error loading content ", errorElements, e);
  }
}

document.addEventListener("DOMContentLoaded", snap.onContentLoaded(document.body));

