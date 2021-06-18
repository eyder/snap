var snap;

(function(fetcher, finder) {

  this.convert = function(content) {
    if (content && content.nodeType === 1) {
      var navs = finder.triggers(content, 'nav');
      for (var i = 0; i < navs.length; i++) convertNav(navs[i]);
      var links = finder.triggers(content, 'a');
      for (i = 0; i < links.length; i++) convertLink(links[i], links[i]);
      var forms = finder.triggers(content, 'form');
      for (i = 0; i < forms.length; i++) convertForm(forms[i]);
    }
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
      var target = finder.target(triggerElement);
      if (!target) return;
      fetcher.fetch(link.getAttribute('href'), triggerElement, target);
    });
  }

  function convertForm(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var target = finder.target(form);
      if (!target) return;
      var formData = new FormData(form);
      fetcher.fetch(event.target.action, form, target, formData, event.target.method);
    });
  }

}).call(snap.converter, snap.fetcher, snap.finder);
