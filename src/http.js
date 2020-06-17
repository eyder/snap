var snap;

(function() {

  this.get = function(href) {
    return fetch(href)
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        return parseBodyNodes(text);
      })
      .catch(function(error) {
        console.error("SNAP: Error trying to read respose text", error);
        throw error;
      });
  }

  function parseBodyNodes(text) {
    var document = new DOMParser().parseFromString(text, "text/xml");
    var error = document.querySelector('parsererror');
    if (error) throw error;
    var body = document.querySelector('body');
    return body == null ? [] : body.childNodes;
  }

}).call(snap.http);
