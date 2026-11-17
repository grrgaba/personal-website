(function () {
  const form = document.getElementById('custom-order-form');
  const preview = document.getElementById('request-preview');
  const requestText = document.getElementById('request-text');
  const status = document.getElementById('form-status');
  const copyButton = document.getElementById('copy-request');
  const emailLink = document.getElementById('email-request');

  if (!(form instanceof HTMLFormElement) ||
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
    logo.setAttribute('aria-label', 'Sarj’s Flower Charms home');
    return true;
  }

  if (!setShopLogo()) {
    const headerObserver = new MutationObserver(function () {
      if (setShopLogo()) headerObserver.disconnect();
    });
    headerObserver.observe(document.body, { childList: true, subtree: true });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const details = [
      'Hi Sarj! I’m interested in a custom flower keychain.',
      '',
      'Fillers: ' + (formData.get('fillers') || 'Open to suggestions'),
      'Big flower: ' + (formData.get('bigFlower') || 'Open to suggestions'),
      'Four small flowers: ' + (formData.get('smallFlowers') || 'Open to suggestions'),
      'Colors: ' + (formData.get('colors') || 'Open to ideas'),
      '',
      'Could you let me know if this custom keychain is available and the price?'
    ];

    requestText.value = details.join('\n');
    const subject = 'Custom flower keychain request';
    emailLink.href = 'mailto:sarjlabrador@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(details.join('\n'));
    preview.hidden = false;
    status.textContent = 'Your request is ready. Email Sarj to send it, or copy it to share another way.';
    preview.focus();
  });

  copyButton.addEventListener('click', function () {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      requestText.focus();
      requestText.select();
      status.textContent = 'Copy is unavailable here. Your request is selected; copy it to share with Sarj.';
      return;
    }

    navigator.clipboard.writeText(requestText.value).then(function () {
      status.textContent = 'Request copied. Share it with Sarj to ask about availability and pricing.';
    }).catch(function () {
      requestText.focus();
      requestText.select();
      status.textContent = 'Could not copy automatically. Your request is selected; copy it to share with Sarj.';
    });
  });
})();
