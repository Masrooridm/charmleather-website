// Order form: posts to the Google Form (-> Google Sheet), then opens WhatsApp with the order.
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdaN9qviPmfMGwYn6w943D9LDA1Ujri7dnkp8hsLw3Yhay5Sg/formResponse';
const WA_NUMBER = '923458340235';
// Google Form field IDs come from the pre-filled link. While a value is 'entry.XXXX', nothing is saved to the Sheet (WhatsApp still works).
const ENTRY = {
  name: 'entry.XXXX', phone: 'entry.XXXX', address: 'entry.XXXX', city: 'entry.XXXX',
  colour: 'entry.XXXX', size: 'entry.XXXX', product: 'entry.XXXX'
};

(() => {
  const f = document.getElementById('orderForm');
  const delivery = document.getElementById('delivery');
  const err = document.getElementById('err');
  const sizeRow = document.getElementById('sizeRow');
  const colourRow = document.getElementById('colourRow');
  // Product list comes from the cards: a card shows only once its price is filled in (no 'Rs. ____').
  const typeOf = {};
  const items = [];
  document.querySelectorAll('.card').forEach(card => {
    const price = card.querySelector('.price').textContent.trim();
    if (price.includes('____')) { card.hidden = true; return; }
    const name = card.querySelector('h3').textContent.trim();
    if (card.hasAttribute('data-ask')) { // no fixed price yet: the button opens WhatsApp instead of the form
      const a = card.querySelector('[data-type]');
      a.removeAttribute('data-type'); a.textContent = 'Ask price'; a.target = '_blank'; a.rel = 'noopener';
      a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello, I would like to know the price of the ' + name + '.')}`;
      return;
    }
    typeOf[name] = card.querySelector('[data-type]').dataset.type;
    items.push({ name, price });
  });
  f.elements.product.innerHTML = items.map(i => `<option value="${i.name.replace(/"/g, '&quot;')}">${i.name} (${i.price})</option>`).join('');
  const priceOf = n => (items.find(i => i.name === n) || {}).price || '';
  const isKarachi = c => /karachi|krachi|کراچی/i.test(c); // 'Karachi, Pakistan' also counts as Karachi

  const note = () => {
    const c = f.elements.city.value.trim();
    if (!c) return 'Enter your city to see delivery and payment details.';
    return isKarachi(c)
      ? 'Karachi: free cash on delivery. Delivered by rider in 2-3 working days.'
      : 'Other cities: Rs. 300 delivery charge with advance payment. Delivered by PostEx in 2-3 working days.';
  };
  const sync = () => {
    const wallet = typeOf[f.elements.product.value] === 'Wallet';
    sizeRow.hidden = colourRow.hidden = wallet;      // wallets have no size or colour choice
    f.elements.size.disabled = f.elements.colour.disabled = wallet;
    delivery.textContent = note();
  };
  // change + pageshow: keep the note right after autofill or Back navigation
  f.addEventListener('input', sync);
  f.addEventListener('change', sync);
  addEventListener('pageshow', sync);
  sync();

  // The card's Order button selects that product.
  document.querySelectorAll('[data-type]').forEach(a =>
    a.addEventListener('click', () => { f.elements.product.value = a.closest('.card').querySelector('h3').textContent.trim(); sync(); }));

  f.addEventListener('submit', async e => {
    e.preventDefault();
    err.hidden = true;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(f));
    d.phone = d.phone.replace(/[\s-]/g, '').replace(/^(0092|92|0)/, '+92');
    if (!d.phone.startsWith('+')) d.phone = '+92' + d.phone;
    if (!/^\+923\d{9}$/.test(d.phone)) { err.textContent = 'Enter your number like +92 3XX XXXXXXX (for example +923458340235).'; err.hidden = false; return; }
    const belt = typeOf[d.product] !== 'Wallet';
    f.querySelector('[type=submit]').disabled = true; // stops a double click from sending two orders
    if (!belt) { d.size = 'N/A'; d.colour = 'N/A'; }
    const where = isKarachi(d.city) ? 'Cash on delivery (Karachi, free delivery)' : 'Advance payment + Rs. 300 delivery';

    const body = new URLSearchParams();
    for (const k in ENTRY) if (!ENTRY[k].endsWith('XXXX')) body.append(ENTRY[k], d[k]);
    if ([...body].length) {
      try { await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body }); }
      catch { err.textContent = 'Could not save to the sheet, but you can still send your order on WhatsApp.'; err.hidden = false; }
    }

    const msg = `Hello, I would like to place an order with Charm Leather:\n` +
      `Product: ${d.product} ${priceOf(d.product)}\n` + (belt ? `Colour: ${d.colour}\nWaist size: ${d.size}\n` : '') +
      `Name: ${d.name}\nPhone: ${d.phone}\nAddress: ${d.address}\nCity: ${d.city}\nDelivery: ${where}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    document.getElementById('waLink').href = url;
    f.hidden = true;
    document.getElementById('done').hidden = false;
    setTimeout(() => { location.href = url; }, 900);
  });
})();
