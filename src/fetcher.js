var snap;

(function(loader) {

  this.fetch = function(url, triggerElement, targets, formData, method) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'document';
    var successTarget = targets[0];
    var errorTarget = targets[1];
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 1) {
        loader.loading(successTarget, triggerElement);
      } else if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var nodes = parseBodyNodes(xhr.responseXML);
          try {
            loader.success(successTarget, triggerElement, nodes);
          } catch (e) {
            console.error("SNAP: error loading content.", e, nodes);
            loader.error(successTarget, triggerElement);
          }
        } else {
          console.error('SNAP: HTTP error ' + xhr.status, xhr, triggerElement);
          if (errorTarget) {
            var errorNodes = parseBodyNodes(xhr.responseXML);
            try {
              loader.error(successTarget, triggerElement, errorNodes, errorTarget);
            } catch (e) {
              console.error("SNAP: error loading error content.", e, errorNodes);
              loader.error(successTarget, triggerElement);
            }
          } else {
            loader.error(successTarget, triggerElement);
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
