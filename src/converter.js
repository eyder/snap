var snap;

(function(fetcher) {

  var TARGET = 'data-snap-target';
  var ERROR_TARGET = 'data-snap-error-target';

  this.convert = function(content) {
    if (content && content.nodeType === 1) {
      var navs = findTagsWithTarget(content, 'nav');
      for (var i = 0; i < navs.length; i++) convertNav(navs[i]);
      var links = findTagsWithTarget(content, 'a');
      for (i = 0; i < links.length; i++) convertLink(links[i], links[i]);
      var forms = findTagsWithTarget(content, 'form');
      for (i = 0; i < forms.length; i++) convertForm(forms[i]);
    }
  }

  function findTagsWithTarget(rootElement, tag) {
    return rootElement.querySelectorAll(tag + '[' + TARGET + ']');
  }

  function convertNav(nav) {
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      convertLink(links[i], nav);
    }
  }

  function convertLink(link, triggerElement) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var targets = findTargets(triggerElement);
      if (!targets) return;
      fetcher.fetch(link.getAttribute('href'), triggerElement, targets);
    });
  }

  function convertForm(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var targets = findTargets(form);
      if (!targets) return;
      var formData = new FormData(form);
      fetcher.fetch(event.target.action, form, targets, formData, event.target.method);
    });
  }

  function findTargets(element) {
    try {
      var successTargetValue = element.getAttribute(TARGET);
      var successTarget = findTargetOnPage(successTargetValue);
      var errorTargetValue = element.getAttribute(ERROR_TARGET);
      var errorTarget = errorTargetValue ? findTargetOnPage(errorTargetValue) : undefined;
      return [successTarget, errorTarget];
    } catch (e) {
      console.error("SNAP: error looking for targets.", e, element);
    }
  }

  function findTargetOnPage(targetValue) {
    var target = document.querySelector(targetValue);
    if (target == null) {
      throw "Target '" + targetValue + "' not found on page.";
    }
    return target;
  }

}).call(snap.converter, snap.fetcher);
