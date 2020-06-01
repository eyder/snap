var snap = snap || {};

snap.parser = new function() {

  this.getNodesToLoad = function(text) {
    var document = new DOMParser().parseFromString(text, "text/xml");
    var error = document.querySelector('parsererror');
    if (error) {
      console.error("SNAP: Error trying to parse respose text", error);
      throw error;
    }
    var body = document.querySelector('body');
    if (body == null) {
      return [];
    }
    return body.childNodes;
  }

}
