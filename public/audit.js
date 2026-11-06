/* Business data is rendered with textContent. The token stays only in this page. */
const endpoint = '/api/audit/';
const page = document.body.dataset.auditPage;
async function api(action, { method = 'GET', body, token, query = '' } = {}) {
  const response = await fetch(`${endpoint}?action=${action}${query}`, {
    method, headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}), cache: 'no-store', referrerPolicy: 'no-referrer',
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The service could not confirm this request.');
  return result;
}
if (page === 'landing') {
  const buttons = [...document.querySelectorAll('.audit-buy')];
  const status = document.getElementById('checkout-state');
  api('status').then(result => {
    status.textContent = result.available ? 'Secure payment through Stripe. Share your details after payment.' : 'Checkout is not available yet. Please check back.';
    buttons.forEach(button => { button.disabled = !result.available; });
  }).catch(() => { status.textContent = 'Checkout availability could not be confirmed. Please check back.'; });
  buttons.forEach(button => button.addEventListener('click', async () => {
    buttons.forEach(item => { item.disabled = true; });
    try { const result = await api('checkout', { method: 'POST' }); window.location.assign(result.url); }
    catch (error) { status.textContent = error.message; buttons.forEach(item => { item.disabled = false; }); }
  }));
}
if (page === 'intake') {
  const sessionId = new URLSearchParams(window.location.search).get('session_id');
  const status = document.getElementById('intake-state');
  const form = document.getElementById('audit-intake');
  api('order', { query: `&session_id=${encodeURIComponent(sessionId || '')}` }).then(result => {
    form.hidden = result.status !== 'intake_needed';
    status.textContent = result.status === 'intake_needed' ? 'Payment confirmed. Share these seven details.' : 'Your business details are already saved. Watch your delivery email for the report.';
  }).catch(error => { status.textContent = error.message; });
  form.addEventListener('submit', async event => {
    event.preventDefault(); const button = form.querySelector('button'); button.disabled = true;
    try { const result = await api('intake', { method: 'POST', body: { sessionId, intake: Object.fromEntries(new FormData(form)) } }); form.hidden = true; status.textContent = result.message; }
    catch (error) { status.textContent = error.message; button.disabled = false; }
  });
}
if (page === 'fulfillment') {
  const token = () => document.getElementById('audit-token').value;
  const status = document.getElementById('admin-state');
  const orders = document.getElementById('audit-orders');
  const editor = document.getElementById('report-editor');
  const order = document.getElementById('report-order');
  const report = document.getElementById('audit-report');
  const deliver = document.getElementById('audit-deliver');
  const preview = document.getElementById('report-preview');
  const more = document.getElementById('audit-more');
  let nextCursor = null;
  let previewed = '';
  async function load(after = '') {
    try {
      const result = await api('queue', { token: token(), query: after ? `&after=${encodeURIComponent(after)}` : '' });
      if (!after) orders.replaceChildren();
      result.orders.forEach(item => {
        const article = document.createElement('article'); const title = document.createElement('h3');
        title.textContent = `${item.intake.businessName || 'Awaiting business details'} | ${item.status}`;
        const details = document.createElement('pre'); details.textContent = JSON.stringify(item, null, 2);
        article.append(title, details); orders.append(article);
      });
      nextCursor = result.nextCursor; more.hidden = !nextCursor; editor.hidden = false;
      status.textContent = `${result.orders.length} paid orders on this page. Stripe is the source of truth.`;
    } catch (error) { status.textContent = error.message; }
  }
  document.getElementById('queue-login').addEventListener('submit', event => { event.preventDefault(); load(); });
  more.addEventListener('click', () => load(nextCursor));
  [order, report].forEach(input => input.addEventListener('input', () => { previewed = ''; deliver.disabled = true; }));
  document.getElementById('audit-preview').addEventListener('click', async () => {
    try {
      const body = { sessionId: order.value.trim(), report: JSON.parse(report.value) };
      const result = await api('preview', { method: 'POST', token: token(), body });
      preview.srcdoc = result.html; preview.hidden = false;
      document.getElementById('report-recipient').textContent = `This report will go to ${result.to}. Both optional offers appear in the preview.`;
      previewed = JSON.stringify(body); deliver.disabled = false;
    } catch (error) { status.textContent = error.message; deliver.disabled = true; }
  });
  deliver.addEventListener('click', async () => {
    deliver.disabled = true;
    try {
      const body = { sessionId: order.value.trim(), report: JSON.parse(report.value) };
      if (JSON.stringify(body) !== previewed) throw new Error('Preview this version before sending.');
      const result = await api('deliver', { method: 'POST', token: token(), body });
      status.textContent = `Resend accepted the report. Message ${result.providerMessageId}. Acceptance does not confirm inbox receipt.`;
      previewed = ''; await load();
    } catch (error) { status.textContent = error.message; }
  });
}
