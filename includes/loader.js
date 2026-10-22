(function() {
  async function loadInclude(path, placeholderId) {
    try {
      const res = await fetch(path, {cache: 'no-cache'});
      if (!res.ok) throw new Error(path + ' ' + res.status);
      const html = await res.text();
      const placeholder = document.getElementById(placeholderId);
      if (placeholder) placeholder.outerHTML = html;
      // If we just inserted the header, attach menu behaviors (scripts inserted via outerHTML won't auto-run)
      if (placeholderId === 'site-header-placeholder') attachHeaderMenu();
    } catch (err) {
      console.error('Failed to load include', path, err);
    }
  }

  function attachHeaderMenu(){
    try{
      var toggle = document.getElementById('menuToggle');
      var panel = document.getElementById('sidePanel');
      var overlay = document.getElementById('sideOverlay');
      var closeBtn = document.getElementById('sideClose');
      if(!toggle || !panel) return;
      function openPanel(){ panel.classList.add('open'); overlay.style.display='block'; setTimeout(function(){ overlay.classList.add('visible'); },10); panel.setAttribute('aria-hidden','false'); toggle.setAttribute('aria-expanded','true'); }
      function closePanel(){ overlay.classList.remove('visible'); panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); toggle.setAttribute('aria-expanded','false'); setTimeout(function(){ overlay.style.display='none'; },250); }
      toggle.addEventListener('click', function(e){ e.preventDefault(); var isOpen = panel.classList.contains('open'); if(isOpen) closePanel(); else openPanel(); });
      overlay && overlay.addEventListener('click', closePanel);
      closeBtn && closeBtn.addEventListener('click', closePanel);
      panel.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', closePanel);
      });
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closePanel(); });
      // attach side-group toggles (collapsible submenu groups)
      var groupToggles = document.querySelectorAll('.side-group-toggle');
      groupToggles.forEach(function(btn){
        btn.addEventListener('click', function(){
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          var submenu = btn.nextElementSibling; // the .side-submenu
          if(!submenu) return;
          if(expanded){
            btn.setAttribute('aria-expanded','false');
            submenu.setAttribute('hidden','');
          } else {
            btn.setAttribute('aria-expanded','true');
            submenu.removeAttribute('hidden');
          }
        });
      });
      // back-link removed — no-op
    }catch(e){console.error('attachHeaderMenu error', e)}
  }

  function isTripsDetailPage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (!path.includes('/diary/trips/')) return false;
    return !path.endsWith('/trips.html');
  }
  // Detect the trips index page (/diary/trips/trips.html)
  function isTripsIndexPage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    return path.includes('/diary/trips/') && path.endsWith('/trips.html');
  }

  function resetScrollToTop() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }

  // Directory -> preferred index target mapping
  var indexTargets = {
    '/tools/': '/tools/tools.html',
    '/diary/': '/diary/diary.html',
    '/diary/projects/': '/diary/diary.html',
    '/SupportMe/': '/SupportMe/SupportMe.html',
    '/diary/trips/': '/diary/diary.html'
  };
  
  function ensurePageBackButtons() {
    try {
      var path = window.location.pathname.replace(/\\/g,'/');
      var isHome = (path === '/' || path === '' || path.endsWith('/index.html'));
      if (isHome) return;
      if (document.querySelector('.page-back-wrap')) return;

      var target;
      var label = 'Back';
      if (isTripsDetailPage()) {
        target = '/diary/trips/trips.html';
        label = 'Back to Trips';
      } else if (isTripsIndexPage()) {
        target = '/diary/diary.html';
        label = 'Back to Diary';
      } else {
        var parentPath = path.replace(/\/[^\/]+\/?$/,'/');
        target = indexTargets[parentPath] || parentPath || '/';
        if (target.replace(/\/+$/,'').toLowerCase() === path.replace(/\/+$/,'').toLowerCase()) {
          target = '/';
        }
      }

      var wrap = document.createElement('div');
      wrap.className = 'page-back-wrap';
      var link = document.createElement('a');
      link.className = 'page-back-button';
      link.href = target;
      link.setAttribute('aria-label', label);
      link.textContent = '\u2190 ' + label;
      wrap.appendChild(link);

      if (!attachToHero(wrap)) {
        var main = document.querySelector('main');
        if (main && main.parentNode) main.parentNode.insertBefore(wrap, main);
        else document.body.insertBefore(wrap, document.body.firstChild);
      }
    } catch (e) { console.error('ensurePageBackButtons error', e); }
  }

  // Attempt to attach the back button to the hero container.
  function attachToHero(wrap) {
    try {
      var hero = document.querySelector('.hero, .hero-inner, .hero-copy');
      if (!hero) return false;
      // Find the outermost hero container
      while (hero && hero.parentElement && hero.parentElement.classList && hero.parentElement.classList.contains('hero-inner')) {
        hero = hero.parentElement;
      }
      wrap.classList.add('hero-attached');
      hero.insertBefore(wrap, hero.firstChild);
      return true;
    } catch (e) {
      console.error('attachToHero error', e);
      return false;
    }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadInclude('/includes/header.html', 'site-header-placeholder');
      loadInclude('/includes/footer.html', 'site-footer-placeholder');
      resetScrollToTop();
      ensurePageBackButtons();
    });
  } else {
    loadInclude('/includes/header.html', 'site-header-placeholder');
    loadInclude('/includes/footer.html', 'site-footer-placeholder');
    resetScrollToTop();
    ensurePageBackButtons();
  }

  window.addEventListener('pageshow', function() {
    resetScrollToTop();
  });
})();
