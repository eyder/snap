var snap;

(function() {

  var DATA_APPEND_TO = 'data-append-to';
  var DATA_PREPEND_TO = 'data-prepend-to';
  var DATA_LOAD_ON = 'data-load-on';
  var ERROR_BUCKET_CLASS = 'error-bucket'

  this.triggers = function(rootElement, tag) {
    return rootElement.querySelectorAll(tag+'['+DATA_APPEND_TO+'], '+tag+'['+DATA_PREPEND_TO+'], '+tag+'['+DATA_LOAD_ON+']');
  }

  this.target = function(trigger) {
    try {
      var selector = getTargetSelector(trigger);
      return findOnPage(selector);
    } catch (e) {
      console.error("SNAP: error looking for targets.", e, trigger);
    }
  }

  function getTargetSelector(trigger) {
    return getAttributeValue(trigger, DATA_APPEND_TO) ||
      getAttributeValue(trigger, DATA_PREPEND_TO) ||
      getAttributeValue(trigger, DATA_LOAD_ON);
  }

  function getAttributeValue(element, attribute) {
    var value = element.getAttribute(attribute);
    return (value && value !== '') ? value : undefined;
  }

  function findOnPage(selector) {
    var element = document.querySelector(selector);
    if (element == null) {
      throw "No element found using selector '" + selector + "'.";
    }
    return element;
  }

  this.errorBucket = function(target) {
    try {
      var firstChildErrorBucket = getFirstChildWithClass(ERROR_BUCKET_CLASS, target);
      if (firstChildErrorBucket) {
        return firstChildErrorBucket;
      }
      var firstSiblingErrorBucket = getFirstSiblingWithClass(ERROR_BUCKET_CLASS, target);
      if (firstSiblingErrorBucket) {
        return firstSiblingErrorBucket;
      }
      var firstErrorBucket = getFirstElementWithClass(ERROR_BUCKET_CLASS);
      if (firstErrorBucket) {
        return firstErrorBucket;
      }
      return undefined;
    } catch (e) {
      console.error("SNAP: error looking for error-bucket.", e, target);
    }
  }

  function getFirstChildWithClass(clazz, parent) {
    var length = parent.childNodes.length;
    var i = 0;
    while (i < length) {
      var child = parent.childNodes[i++];
      if (child.nodeType !== 1) {
        continue;
      }
      var classes = child.className.split(" ");
      if (classes.indexOf(clazz) >= 0) {
        return child;
      }
    }
    return undefined;
  }

  function getFirstSiblingWithClass(clazz, element) {
    // TODO
    return undefined;
  }

  function getFirstElementWithClass(clazz, element) {
    // TODO
    return undefined;
  }

  this.isAppendTo = function(trigger) {
    return hasAttribute(trigger, DATA_APPEND_TO);
  }

  this.isPrependTo = function(trigger) {
    return hasAttribute(trigger, DATA_PREPEND_TO);
  }

  this.isLoadOn = function(trigger) {
    return hasAttribute(trigger, DATA_LOAD_ON);
  }

  function hasAttribute(trigger, attribute) {
    return getAttributeValue(trigger, attribute) != undefined;
  }

}).call(snap.finder);
