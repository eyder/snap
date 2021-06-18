var snap;

(function(loader) {

  this.fetch = function(url, trigger, target, formData, method) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'document';
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 1) {
        loader.loading(target, trigger);
      } else if (xhr.readyState === 4) {
        var nodes = parseBodyNodes(xhr.responseXML);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            loader.success(target, trigger, nodes);
          } catch (e) {
            console.error("SNAP: error loading content.", e, nodes);
            loader.error(target, trigger);
          }
        } else {
          console.error('SNAP: HTTP error ' + xhr.status, xhr, trigger);
          try {
            loader.error(target, trigger, nodes);
          } catch (e) {
            console.error("SNAP: error loading error content.", e, nodes);
          }
        }
      }
    };
    if (method && method.toLowerCase() === 'post') {
      xhr.open('POST', url);
      xhr.send(formData);
    } else {
      xhr.open('GET', url + (formData ? '?' + toURLSearchParams(formData) : ''));
      xhr.send();
    }
  }

  function parseBodyNodes(document) {
    try {
      if (!document) throw "Empty response text";
      var error = document.querySelector('parsererror');
      if (error) throw error;
      var body = document.querySelector('body');
      if (!body) throw "No body tag found";
      var nodes = [];
      for (var i = 0; i < body.childNodes.length; i++) {
        nodes.push(body.childNodes[i]);
      }
      return nodes;
    } catch (error) {
      console.error("SNAP: Error reading respose text.", error);
      return [];
    }
  }

  function toURLSearchParams(formData) {
    var parameters = []
    var entries = formData.entries();
    var param = entries.next();
    while (!param.done) {
      parameters.push(
          encodeURIComponent(param.value[0]) + '=' +
          encodeURIComponent(param.value[1])
      );
      param = entries.next();
    }
    return parameters.join('&');
  }

}).call(snap.fetcher, snap.loader);
