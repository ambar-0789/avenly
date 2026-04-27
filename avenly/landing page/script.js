/* ── Eye tracking ── */
(function () {
  const eyeL = document.getElementById('eyeL');
  const eyeR = document.getElementById('eyeR');
  const socketL = document.getElementById('socketL');
  const socketR = document.getElementById('socketR');

  const MAX_OFFSET = 7; // px, max pupil travel from socket center

  function getSocketCenter(socket) {
    const r = socket.getBoundingClientRect();
    return {
      x: r.left + r.width / 2,
      y: r.top  + r.height / 2,
    };
  }

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  let targetLx = 0, targetLy = 0;
  let targetRx = 0, targetRy = 0;
  let curLx = 0, curLy = 0;
  let curRx = 0, curRy = 0;
  let rafId = null;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    const SPEED = 0.18;
    curLx = lerp(curLx, targetLx, SPEED);
    curLy = lerp(curLy, targetLy, SPEED);
    curRx = lerp(curRx, targetRx, SPEED);
    curRy = lerp(curRy, targetRy, SPEED);

    eyeL.style.transform = `translate(calc(-50% + ${curLx}px), calc(-50% + ${curLy}px))`;
    eyeR.style.transform = `translate(calc(-50% + ${curRx}px), calc(-50% + ${curRy}px))`;

    rafId = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => {
    const cL = getSocketCenter(socketL);
    const cR = getSocketCenter(socketR);

    const dxL = e.clientX - cL.x;
    const dyL = e.clientY - cL.y;
    const distL = Math.sqrt(dxL * dxL + dyL * dyL) || 1;
    const scaleL = Math.min(1, MAX_OFFSET / distL);
    targetLx = dxL * scaleL;
    targetLy = dyL * scaleL;

    const dxR = e.clientX - cR.x;
    const dyR = e.clientY - cR.y;
    const distR = Math.sqrt(dxR * dxR + dyR * dyR) || 1;
    const scaleR = Math.min(1, MAX_OFFSET / distR);
    targetRx = dxR * scaleR;
    targetRy = dyR * scaleR;
  });

  // Touch support
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const fakeEvt = { clientX: touch.clientX, clientY: touch.clientY };
    document.dispatchEvent(new MouseEvent('mousemove', fakeEvt));
  }, { passive: true });

  rafId = requestAnimationFrame(animate);
})();


/* ── Card stagger-in on scroll ── */
(function () {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const idx = card.dataset.idx;
        setTimeout(() => {
          card.classList.add('visible');
        }, idx * 90);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card, i) => {
    card.dataset.idx = i;
    observer.observe(card);
  });
})();


/* ── Subtle hero parallax on scroll ── */
(function () {
  const hero = document.getElementById('hero');
  const blob = document.getElementById('blob');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // Fade + slide hero center up
        const heroH = hero.offsetHeight;
        const progress = Math.min(y / (heroH * 0.6), 1);
        const center = hero.querySelector('.hero-center');
        center.style.transform = `translateY(${-progress * 40}px)`;
        center.style.opacity = `${1 - progress * 0.7}`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
