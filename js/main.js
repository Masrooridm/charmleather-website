// Top slider: auto-advance every 5s, arrows, dots, pauses on hover.
(() => {
  const root = document.querySelector('.slider');
  const slides = [...root.querySelectorAll('.slide')];
  const dots = root.querySelector('.dots');
  let i = 0, timer;

  slides.forEach((_, n) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Slide ${n + 1}`);
    b.onclick = () => { go(n); restart(); };
    dots.append(b);
  });

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    [...dots.children].forEach((d, k) => d.setAttribute('aria-selected', k === i));
  }
  function restart() {
    clearInterval(timer);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => go(i + 1), 5000);
  }

  root.querySelector('.prev').onclick = () => { go(i - 1); restart(); };
  root.querySelector('.next').onclick = () => { go(i + 1); restart(); };
  root.onmouseenter = () => clearInterval(timer);
  root.onmouseleave = restart;

  go(0);
  restart();
})();

// Missing product photo: hide the broken-image icon.
document.querySelectorAll('.card img').forEach(i => {
  const hide = () => i.classList.add('noimg');
  i.addEventListener('error', hide);
  if (i.complete && !i.naturalWidth) hide();
});

// Belt flip: black side <-> tan side.
(() => {
  const belt = document.getElementById('beltFlip'), badge = document.getElementById('flipBadge');
  const flip = () => {
    const on = belt.classList.toggle('flipped');
    badge.textContent = on ? 'Showing: tan side' : 'Showing: black side';
  };
  belt.addEventListener('click', flip);
  document.getElementById('flipBtn').addEventListener('click', flip);
})();

// Card tilt on mouse hover (skipped for touch and reduced motion).
if (matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) {
  document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
    });
    c.addEventListener('mouseleave', () => { c.style.transform = ''; });
  });
}
