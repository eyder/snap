var snap = snap || {};

snap.DOMParser = new function() {

  this.parseFromXMLString = function(text) {
    var document = new DOMParser().parseFromString(text, "text/xml");
    var error = document.querySelector('parsererror');
    if (error) {
      console.error("SNAP: Error trying to parse respose text", error);
      throw error;
    }
    var body = document.querySelector('body');
    if (body) {
      if (body.children.length == 1) {
        return body.children[0];
      }
    }
    return body;
  }

}
