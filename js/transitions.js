/* transitions.js — GSAP page transitions */

(function () {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Init : cacher l'overlay immédiatement si GSAP pas dispo ─── */
  if (!window.gsap) {
    overlay.style.display = 'none';
    return;
  }

  /* ─── Page enter : retirer l'overlay ─── */
  function pageEnter() {
    if (prefersReduced) {
      gsap.set(overlay, { display: 'none' });
      return;
    }

    gsap.fromTo(overlay,
      { scaleY: 1, transformOrigin: 'top center' },
      {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete: () => gsap.set(overlay, { display: 'none' })
      }
    );
  }

  /* ─── Page exit : couvrir l'écran avant navigation ─── */
  function pageExit(href) {
    if (prefersReduced) {
      window.location.href = href;
      return;
    }

    gsap.set(overlay, { display: 'block', scaleY: 0, transformOrigin: 'bottom center' });
    gsap.to(overlay, {
      scaleY: 1,
      transformOrigin: 'bottom center',
      duration: 0.5,
      ease: 'expo.inOut',
      onComplete: () => { window.location.href = href; }
    });
  }

  /* ─── Intercept navigation links ─── */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    if (
      href.startsWith('http') ||
      href.startsWith('#') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      link.hasAttribute('download') ||
      link.getAttribute('target') === '_blank'
    ) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === href.split('/').pop()) return;

    e.preventDefault();
    pageExit(href);
  });

  /* ─── Lancer l'entrée dès que le DOM est prêt ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pageEnter);
  } else {
    pageEnter();
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) pageEnter();
  });

})();
