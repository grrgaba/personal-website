(function () {
  const form = document.getElementById('custom-order-form');
  const designSelect = document.getElementById('design');
  const preview = document.getElementById('request-preview');
  const requestText = document.getElementById('request-text');
  const status = document.getElementById('form-status');
  const copyButton = document.getElementById('copy-request');
  const emailLink = document.getElementById('email-request');

  if (!(form instanceof HTMLFormElement) ||
      !(designSelect instanceof HTMLSelectElement) ||
      !(preview instanceof HTMLElement) ||
      !(requestText instanceof HTMLTextAreaElement) ||
      !(status instanceof HTMLElement) ||
      !(copyButton instanceof HTMLButtonElement) ||
      !(emailLink instanceof HTMLAnchorElement)) {
    console.error('Storefront customization form could not initialize because required page elements are missing.');
    return;
  }

  function setShopLogo() {
    const logo = document.querySelector('.site-header .logo');
    if (!logo) return false;

    const image = document.createElement('img');
    image.src = '/assets/logo.png';
    image.alt = '';
    image.className = 'shop-header-logo';
    logo.replaceChildren(image);
    logo.href = '/Sarah/';
    logo.setAttribute('aria-label', 'Sarah’s Flower Charms home');
    return true;
  }

  if (!setShopLogo()) {
    const headerObserver = new MutationObserver(function () {
      if (setShopLogo()) headerObserver.disconnect();
    });
    headerObserver.observe(document.body, { childList: true, subtree: true });
  }

  document.querySelectorAll('[data-design]').forEach(function (button) {
    button.addEventListener('click', function () {
      designSelect.value = button.getAttribute('data-design') || '';
      document.getElementById('customize').scrollIntoView({ behavior: 'smooth' });
      designSelect.focus({ preventScroll: true });
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const details = [
      'Hi Sarah! I’m interested in a custom flower charm.',
      '',
      'Style: ' + formData.get('design'),
      'Favorite flower: ' + (formData.get('flower') || 'No preference'),
      'Colors: ' + (formData.get('colors') || 'Open to ideas'),
      'Initial or personalization: ' + (formData.get('personalization') || 'None'),
      'Additional details: ' + (formData.get('details') || 'None'),
      '',
      'Could you let me know if this design is available and the price?'
    ];

    requestText.value = details.join('\n');
    const subject = 'Custom flower charm request';
    emailLink.href = 'mailto:sarjlabrador@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(details.join('\n'));
    preview.hidden = false;
    status.textContent = 'Your request is ready. Email Sarah to send it, or copy it to share another way.';
    preview.focus();
  });

  copyButton.addEventListener('click', function () {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      requestText.focus();
      requestText.select();
      status.textContent = 'Copy is unavailable here. Your request is selected; copy it to share with Sarah.';
      return;
    }

    navigator.clipboard.writeText(requestText.value).then(function () {
      status.textContent = 'Request copied. Share it with Sarah to ask about availability and pricing.';
    }).catch(function () {
      requestText.focus();
      requestText.select();
      status.textContent = 'Could not copy automatically. Your request is selected; copy it to share with Sarah.';
    });
  });
})();
