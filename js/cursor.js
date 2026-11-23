/* cursor.js — Curseur personnalisé */

(function () {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Agrandir le ring sur les éléments cliquables
  const clickables = 'a, button, [role="button"], input, textarea, select, .filter-btn, .project-card';
  document.querySelectorAll(clickables).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });

  // Observer dynamiquement les éléments ajoutés
  const observer = new MutationObserver(() => {
    document.querySelectorAll(clickables).forEach(el => {
      if (!el._cursorBound) {
        el._cursorBound = true;
        el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Cacher le curseur quand la souris quitte la fenêtre
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();
