var snap = snap || {};

snap.navs = new function() {

  this.convertAllLinksToAsync = function(navs, onContentReceived, onErrorReceived) {
    for (var i = 0, len = navs.length; i < len; i++) {
      this.convertNavLinksToAsync(navs[i], onContentReceived, onErrorReceived);
    }
  }

  this.convertNavLinksToAsync = function(nav, onContentReceived, onErrorReceived) {
    try {
      var links = nav.querySelectorAll("a");
      for (var j = 0, len = links.length; j < len; j++) {
        snap.links.convertToAsync(links[j], nav, onContentReceived, onErrorReceived);
      }
    } catch (e) {
      console.error("SNAP: error converting NAV links to async ", navs[i], e);
    }
  }

};
