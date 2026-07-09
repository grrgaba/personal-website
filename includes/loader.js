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
    }catch(e){console.error('attachHeaderMenu error', e)}
  }

  function isTripsDetailPage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (!path.includes('/diary/trips/')) return false;
    return !path.endsWith('/trips.html');
  }

  function hasExistingTripsBackLink() {
    return !!document.querySelector(
      '.trip-back-button, a[href="../../trips.html"], a[href="/diary/trips/trips.html"]'
    );
  }

  function ensureTripsBackButton() {
    if (!isTripsDetailPage() || hasExistingTripsBackLink()) return;

    if (!document.getElementById('trip-back-button-style')) {
      const style = document.createElement('style');
      style.id = 'trip-back-button-style';
      style.textContent = [
        '.trip-back-button-wrap{max-width:1100px;margin:0.9rem 0 0;padding:0 1rem;display:flex;justify-content:flex-start;}',
        '.trip-back-button{display:inline-block;padding:.35rem .65rem;border-radius:6px;border:1px solid rgba(16,24,32,0.06);background:transparent;color:#334155;text-decoration:none;font-weight:500;font-size:0.95rem;box-shadow:none;}',
        '.trip-back-button:hover{background:#f1f5f9;}'
      ].join('');
      document.head.appendChild(style);
    }

    const wrap = document.createElement('div');
    wrap.className = 'trip-back-button-wrap';

    const link = document.createElement('a');
    link.className = 'trip-back-button';
    link.href = '/diary/trips/trips.html';
    link.textContent = 'Back to Trips';

    wrap.appendChild(link);

    const main = document.querySelector('main');
    if (main && main.parentNode) {
      main.parentNode.insertBefore(wrap, main);
    } else {
      document.body.insertBefore(wrap, document.body.firstChild);
    }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadInclude('/includes/header.html', 'site-header-placeholder');
      loadInclude('/includes/footer.html', 'site-footer-placeholder');
      ensureTripsBackButton();
    });
  } else {
    loadInclude('/includes/header.html', 'site-header-placeholder');
    loadInclude('/includes/footer.html', 'site-footer-placeholder');
    ensureTripsBackButton();
  }
})();
