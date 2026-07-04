(function() {
  async function loadInclude(path, placeholderId) {
    try {
      const res = await fetch(path, {cache: 'no-cache'});
      if (!res.ok) throw new Error(path + ' ' + res.status);
      const html = await res.text();
      const placeholder = document.getElementById(placeholderId);
      if (placeholder) placeholder.outerHTML = html;
    } catch (err) {
      console.error('Failed to load include', path, err);
    }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadInclude('/includes/header.html', 'site-header-placeholder');
      loadInclude('/includes/footer.html', 'site-footer-placeholder');
    });
  } else {
    loadInclude('/includes/header.html', 'site-header-placeholder');
    loadInclude('/includes/footer.html', 'site-footer-placeholder');
  }
})();
