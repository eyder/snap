var snap = snap || {};

snap.async = new function() {

  this.get = function(href) {
    return fetch(href)
      .then(function(response) {
        return response.text()
          .then(function(text) {
            return snap.DOMParser.parseFromXMLString(text);
          })
          .catch(function(error) {
            console.error("SNAP: Error trying to read respose text", error);
          });
      })
      .catch(function(error) {
        console.error("SNAP: Error trying to fetch URL " + href, error);
      });
  }

}
