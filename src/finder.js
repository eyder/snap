var snap;

(function() {

  var DATA_APPEND_TO = 'data-append-to';
  var DATA_PREPEND_TO = 'data-prepend-to';
  var DATA_LOAD_ON = 'data-load-on';

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
