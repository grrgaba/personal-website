/* Favorites system: stores favorites in a cookie named 'favorites' as JSON array of pathnames */
(function(){
  const COOKIE_NAME = 'favorites';
  const COOKIE_DAYS = 365;

  function getCookie(name){
    const v = document.cookie.match('(^|;)\\s*'+name+'\\s*=\\s*([^;]+)');
    return v ? decodeURIComponent(v.pop()) : '';
  }
  function setCookie(name, value, days){
    const d = new Date(); d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + d.toUTCString();
  }

  function getFavorites(){
    try{ const raw = getCookie(COOKIE_NAME); return raw? JSON.parse(raw): []; }catch(e){return []}
  }
  function saveFavorites(arr){ setCookie(COOKIE_NAME, JSON.stringify(arr), COOKIE_DAYS); }

  function hrefKey(a){ try{ return new URL(a.href).pathname }catch(e){ return a.getAttribute('href') }
  }

  function createStarButton(isFav){
    const btn = document.createElement('button');
    btn.className = 'fav-btn' + (isFav? ' favorited':'' );
    btn.setAttribute('aria-pressed', !!isFav);
    btn.innerHTML = '★';
    return btn;
  }

  function initGrid(grid){
    const favs = getFavorites();
    const items = Array.from(grid.querySelectorAll('.grid-button'));

    // Insert buttons
    items.forEach(a => {
      const key = hrefKey(a);
      const isFav = favs.includes(key);
      // prevent double-insert
      if (a.querySelector('.fav-btn')) return;
      const btn = createStarButton(isFav);
      btn.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        const key = hrefKey(a);
        toggleFavorite(key, a, btn);
      });
      a.appendChild(btn);
    });

    // Reorder favorites to top (most recent first)
    reorderFavorites(grid, favs);
  }

  function toggleFavorite(key, anchor, btn){
    const favs = getFavorites();
    const idx = favs.indexOf(key);
    if (idx === -1){
      // add to front
      favs.unshift(key);
      btn.classList.add('favorited');
      btn.setAttribute('aria-pressed','true');
      // move anchor to top of its parent
      anchor.parentNode.insertBefore(anchor, anchor.parentNode.firstChild);
    } else {
      favs.splice(idx,1);
      btn.classList.remove('favorited');
      btn.setAttribute('aria-pressed','false');
      // leave anchor where it is
    }
    saveFavorites(favs);
  }

  function reorderFavorites(grid, favs){
    if (!favs || !favs.length) return;
    // For each favorite in order, find matching anchor and move to top
    favs.forEach(k => {
      const a = Array.from(grid.querySelectorAll('.grid-button')).find(x => {
        try{ return new URL(x.href).pathname === k }catch(e){return x.getAttribute('href')===k}
      });
      if (a) grid.insertBefore(a, grid.firstChild);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    const grid = document.querySelector('.grid');
    if (!grid) return;
    initGrid(grid);
  });

})();
