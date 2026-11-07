(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Theme toggle (follows the OS until the visitor chooses)
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // BibTeX: show and copy
  document.querySelectorAll('.bib-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.closest('.pub').querySelector('.bib');
      if (!pre) return;
      pre.hidden = !pre.hidden;
      btn.setAttribute('aria-expanded', pre.hidden ? 'false' : 'true');
      if (!pre.hidden && navigator.clipboard) {
        navigator.clipboard.writeText(pre.textContent).then(function () {
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = 'BibTeX'; }, 1400);
        }, function () {});
      }
    });
  });

  // Copy short bio
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = document.querySelector(btn.dataset.target);
      if (!box || !navigator.clipboard) return;
      navigator.clipboard.writeText(box.innerText.trim()).then(function () {
        var old = btn.textContent; btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1400);
      });
    });
  });

  // Publication search and topic filter
  var search = document.getElementById('pub-search');
  var chips = document.querySelectorAll('.chip-btn');
  if (search || chips.length) {
    var pubs = Array.prototype.slice.call(document.querySelectorAll('.pub'));
    var groups = document.querySelectorAll('.year-group');
    var empty = document.getElementById('no-results');
    var counter = document.getElementById('pub-count');
    var topic = '';

    var apply = function () {
      var q = (search ? search.value : '').trim().toLowerCase();
      var shown = 0;
      pubs.forEach(function (el) {
        var topics = (el.dataset.topics || '').split('|');
        var ok = (!topic || topics.indexOf(topic) !== -1) && (!q || el.textContent.toLowerCase().indexOf(q) !== -1);
        el.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach(function (g) { g.hidden = !g.querySelector('.pub:not([hidden])'); });
      if (empty) empty.hidden = shown !== 0;
      if (counter) counter.textContent = shown === pubs.length ? pubs.length + ' papers.' : 'Showing ' + shown + ' of ' + pubs.length + ' papers.';
    };

    if (search) search.addEventListener('input', apply);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        c.setAttribute('aria-pressed', 'true');
        topic = c.dataset.topic;
        apply();
      });
    });
    apply();
  }
})();
