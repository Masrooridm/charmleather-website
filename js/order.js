// Order form: posts to the Google Form (-> Google Sheet), then opens WhatsApp with the order.
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdaN9qviPmfMGwYn6w943D9LDA1Ujri7dnkp8hsLw3Yhay5Sg/formResponse';
const WA_NUMBER = '923458340235';
// Google Form ke field IDs: pre-filled link se milte hain. Jab tak 'entry.XXXX' hai, Sheet mein save nahi hoga (WhatsApp phir bhi chalega).
const ENTRY = {
  name: 'entry.XXXX', phone: 'entry.XXXX', address: 'entry.XXXX', city: 'entry.XXXX',
  colour: 'entry.XXXX', size: 'entry.XXXX', product: 'entry.XXXX'
};

(() => {
  const f = document.getElementById('orderForm');
  const delivery = document.getElementById('delivery');
  const err = document.getElementById('err');
  const sizeRow = document.getElementById('sizeRow');
  const isKarachi = c => /karachi|krachi|کراچی/i.test(c); // 'Karachi, Pakistan' bhi Karachi

  const note = () => {
    const c = f.city.value.trim();
    if (!c) return 'Shehar likhein, delivery ka tareeqa yahan nazar aayega.';
    return isKarachi(c)
      ? 'Karachi: Cash on Delivery bilkul free. Rider se 2-3 working days mein.'
      : 'Baqi shehar: delivery charges Rs. 300 aur advance payment. PostEx se 2-3 working days mein.';
  };
  const sync = () => {
    sizeRow.hidden = f.product.value !== 'Belt';
    delivery.textContent = note();
  };
  // change + pageshow: autofill aur Back button se wapas aane par bhi note update ho
  f.addEventListener('input', sync);
  f.addEventListener('change', sync);
  addEventListener('pageshow', sync);
  sync();

  // Card ke "Order" button se product pehle se select ho jaye.
  document.querySelectorAll('[data-type]').forEach(a =>
    a.addEventListener('click', () => { f.product.value = a.dataset.type; sync(); }));

  f.addEventListener('submit', async e => {
    e.preventDefault();
    err.hidden = true;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(f));
    d.phone = d.phone.replace(/[\s-]/g, '').replace(/^(0092|92|0)/, '+92');
    if (!d.phone.startsWith('+')) d.phone = '+92' + d.phone;
    if (!/^\+923\d{9}$/.test(d.phone)) { err.textContent = 'Number +92 3XX XXXXXXX ki tarah likhein (mas\'lan +923458340235).'; err.hidden = false; return; }
    const belt = d.product === 'Belt';
    if (!belt) d.size = 'N/A';
    const where = isKarachi(d.city) ? 'COD (Karachi, free delivery)' : 'Advance payment + Rs. 300 delivery';

    const body = new URLSearchParams();
    for (const k in ENTRY) if (!ENTRY[k].endsWith('XXXX')) body.append(ENTRY[k], d[k]);
    if ([...body].length) {
      try { await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body }); }
      catch { err.textContent = 'Sheet mein save nahi hua, lekin WhatsApp par order bhej sakte hain.'; err.hidden = false; }
    }

    const msg = `Assalam o Alaikum, Charm Leather order:\n` +
      `Product: ${d.product}\nColour: ${d.colour}\n` + (belt ? `Waist size: ${d.size}\n` : '') +
      `Naam: ${d.name}\nNumber: ${d.phone}\nAddress: ${d.address}\nShehar: ${d.city}\nDelivery: ${where}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    document.getElementById('waLink').href = url;
    f.hidden = true;
    document.getElementById('done').hidden = false;
    setTimeout(() => { location.href = url; }, 900);
  });
})();
