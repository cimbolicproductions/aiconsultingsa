(() => {
  const initialized = new WeakSet();
  let apiReady;

  function loadApi() {
    if (apiReady) return apiReady;
    apiReady = fetch('/api/lead-challenge/', { cache: 'no-store' }).then(async (response) => {
      if (!response.ok) throw new Error('Verification configuration unavailable');
      const { siteKey } = await response.json();
      if (typeof siteKey !== 'string' || !siteKey) throw new Error('Missing site key');
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        const timeout = setTimeout(() => reject(new Error('Verification load timed out')), 15000);
        script.onload = () => { clearTimeout(timeout); window.turnstile.ready(resolve); };
        script.onerror = () => { clearTimeout(timeout); reject(new Error('Verification load failed')); };
        document.head.append(script);
      });
      return siteKey;
    });
    return apiReady;
  }

  function initialize() {
    document.querySelectorAll('[data-lead-challenge]').forEach((container) => {
      if (initialized.has(container)) return;
      initialized.add(container);
      const form = container.closest('form');
      const button = form.querySelector('button[type="submit"]');
      const message = container.querySelector('[role="status"]');
      const widget = container.querySelector('[data-challenge-widget]');
      const setState = (verified, text) => { button.disabled = !verified; message.textContent = text; };
      setState(false, 'Loading verification...');
      let widgetId;
      form.addEventListener('submit', (event) => {
        const token = new FormData(form).get('cf-turnstile-response');
        if (!token || button.disabled) {
          event.preventDefault();
          setState(false, 'Complete the verification before sending.');
          if (widgetId !== undefined) window.turnstile.reset(widgetId);
        }
      });
      loadApi().then((siteKey) => {
        if (!container.isConnected) return;
        widgetId = window.turnstile.render(widget, {
          sitekey: siteKey,
          action: 'lead',
          size: widget.getBoundingClientRect().width < 300 ? 'compact' : 'flexible',
          callback: () => setState(true, 'Verification complete.'),
          'expired-callback': () => setState(false, 'Verification expired. Please verify again.'),
          'error-callback': () => { setState(false, 'Verification could not load. Please retry or call (210) 802-8945.'); },
          'timeout-callback': () => setState(false, 'Verification timed out. Please verify again.'),
        });
      }).catch(() => setState(false, 'Verification is unavailable. Please reload or call (210) 802-8945.'));
    });
  }

  // The homepage replaces its fallback markup with React; cover both copies.
  new MutationObserver(initialize).observe(document.documentElement, { childList: true, subtree: true });
  initialize();
})();
