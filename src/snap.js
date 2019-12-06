var snap = snap || {};

snap.onContentLoaded = function(content) {
  var links = snap.selectors.findLinks(content);
  snap.links.convertAllToAsync(links, snap.onContentReceived);
  //snap.forms.convertAllToAsync(ref);
}

snap.onContentReceived = function(content, event) {
  snap.loader.load(content, event, snap.onContentLoaded);
}

document.addEventListener("DOMContentLoaded", snap.onContentLoaded(document.body));

