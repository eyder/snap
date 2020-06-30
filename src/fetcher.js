var snap;

(function(loader) {

  this.fetch = function(url, triggerElement, targets, formData, method) {
    var xhr = new XMLHttpRequest();
    var successTarget = targets[0];
    var errorTarget = targets[1];
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        var nodes = parseBodyNodes(xhr.responseText);
        loader.load(nodes, successTarget, triggerElement);
      } else if (errorTarget) {
        var errorNodes = parseBodyNodes(xhr.responseText);
        loader.load(errorNodes, errorTarget, triggerElement);
      } else {
        console.error('SNAP: HTTP error', xhr, triggerElement);
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

  function parseBodyNodes(text) {
    try {
      if (!text) throw "Empty response text";
      var document = new DOMParser().parseFromString(text, "text/xml");
      var error = document.querySelector('parsererror');
      if (error) throw error;
      var body = document.querySelector('body');
      if (!body) throw "No body tag found";
      return body.childNodes;
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
