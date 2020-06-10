var snap = snap || {};

snap.onContentLoaded = function(content) {
  try {
    if (content && content.nodeType === 1) {
      var links = snap.selectors.findLinks(content);
      snap.links.convertAllToAsync(links, snap.onContentReceived, snap.onErrorReceived);
      var navs = snap.selectors.findNavs(content);
      snap.navs.convertAllLinksToAsync(navs, snap.onContentReceived, snap.onErrorReceived);
    }
  } catch (e) {
    console.error("SNAP: error adding SNAP behavior to content", content, e);
  }
}

snap.onContentReceived = function(nodes, triggerElement) {
  if (!nodes) return;
  try {
    var target = snap.selectors.findTarget(triggerElement);
    var mode = snap.selectors.getMode(triggerElement);
    snap.loader.load(nodes, target, mode, snap.onContentLoaded);
  } catch (e) {
    console.error("SNAP: error loading content.", e, nodes);
  }
}

snap.onErrorReceived = function(errorNodes, triggerElement) {
  if (!errorNodes) return;
  try {
    var target = snap.selectors.findErrorTarget(triggerElement);
    var mode = snap.selectors.getMode(triggerElement);
    snap.loader.load(errorNodes, target, mode, snap.onContentLoaded);
  } catch (e) {
    console.error("SNAP: error loading content.", e, errorNodes);
  }
}

document.addEventListener("DOMContentLoaded", snap.onContentLoaded(document.body));

