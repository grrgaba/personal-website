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
      // back-link removed — no-op
    }catch(e){console.error('attachHeaderMenu error', e)}
  }

  function isTripsDetailPage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (!path.includes('/diary/trips/')) return false;
    return !path.endsWith('/trips.html');
  }
  // trip-specific back button removed: the global page back button will handle trips pages

  function ensurePageBackButtons() {
    // Insert a small "Back" link aligned with h1.name on every page
    try {
      // don't show on homepage
      var path = window.location.pathname.replace(/\\/g,'/');
      var isHome = (path === '/' || path === '' || path.endsWith('/index.html'));
      if (isHome) return;

      if (!document.getElementById('page-back-button-style')) {
        const style = document.createElement('style');
        style.id = 'page-back-button-style';
        style.textContent = [
          '.page-back-wrap{max-width:1100px;margin:0;padding:0 1rem;display:flex;justify-content:flex-start;position:fixed;top:calc(56px + 0.6rem);left:1rem;z-index:10010}',
          '.page-back-button{display:inline-block;padding:.28rem .6rem;border-radius:6px;border:1px solid rgba(16,24,32,0.06);background:transparent;color:#334155;text-decoration:underline;font-weight:600;font-size:0.95rem;box-shadow:none;cursor:pointer}',
          '.page-back-button:hover{background:#f8fafc}',
          '@media (min-width:1100px){.page-back-wrap{left:calc(50% - 550px + 1rem)}}',
          '.page-back-wrap + h1.name{margin-top:2.25rem}',
          '@media (max-width:600px){.page-back-wrap{top:calc(56px + 0.8rem);left:1rem}.page-back-wrap + h1.name{margin-top:2.8rem}}'
        ].join('');
        document.head.appendChild(style);
      }

      // If there are headings, add per-heading back button (avoiding duplicates)
      const headings = document.querySelectorAll('h1.name');
      if (headings.length) {
        headings.forEach(function(h){
          // Avoid adding duplicate
          const prev = h.previousElementSibling;
          if (prev && prev.classList && prev.classList.contains('page-back-wrap')) return;

          const wrap = document.createElement('div');
          wrap.className = 'page-back-wrap';

          const link = document.createElement('a');
          link.className = 'page-back-button';
          link.href = '#';
          link.setAttribute('aria-label','Go back');
          link.textContent = 'Back';
          if (isTripsDetailPage()) {
            link.href = '/diary/trips/trips.html';
            link.setAttribute('aria-label','Back to Trips');
            link.addEventListener('click', function(e){ e.preventDefault(); window.location.href = '/diary/trips/trips.html'; });
          } else {
            link.addEventListener('click', function(e){ e.preventDefault(); try { if(history.length>1) history.back(); else window.location.href = '/'; } catch(err){ window.location.href = '/'; }});
          }

          wrap.appendChild(link);

          // Insert the wrap immediately before the heading so it lines up
          h.parentNode.insertBefore(wrap, h);
        });
      } else {
        // No h1.name on this page: insert a single back button at the top (before main), avoid duplicates
        if (document.querySelector('.page-back-wrap')) return;
        const wrap = document.createElement('div');
        wrap.className = 'page-back-wrap';
        const link = document.createElement('a');
        link.className = 'page-back-button';
        link.href = '#';
        link.setAttribute('aria-label','Go back');
        link.textContent = 'Back';
        if (isTripsDetailPage()) {
          link.href = '/diary/trips/trips.html';
          link.setAttribute('aria-label','Back to Trips');
          link.addEventListener('click', function(e){ e.preventDefault(); window.location.href = '/diary/trips/trips.html'; });
        } else {
          link.addEventListener('click', function(e){ e.preventDefault(); try { if(history.length>1) history.back(); else window.location.href = '/'; } catch(err){ window.location.href = '/'; }});
        }
        wrap.appendChild(link);
        const main = document.querySelector('main');
        if (main && main.parentNode) {
          main.parentNode.insertBefore(wrap, main);
        } else {
          document.body.insertBefore(wrap, document.body.firstChild);
        }
      }
    } catch (e) { console.error('ensurePageBackButtons error', e); }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadInclude('/includes/header.html', 'site-header-placeholder');
      loadInclude('/includes/footer.html', 'site-footer-placeholder');
      ensurePageBackButtons();
    });
  } else {
    loadInclude('/includes/header.html', 'site-header-placeholder');
    loadInclude('/includes/footer.html', 'site-footer-placeholder');
    ensurePageBackButtons();
  }
})();
