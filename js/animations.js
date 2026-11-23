/* animations.js — GSAP scroll animations */

(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  /* ══════════════════════════════════════════════
     HERO — animation d'entrée (uniquement sur index.html)
     On anime seulement si le hero EXISTE sur la page
  ══════════════════════════════════════════════ */
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroEyebrow = hero.querySelector('.hero__eyebrow');
    const heroLines   = hero.querySelectorAll('.hero__title-line');
    const heroRole    = hero.querySelector('.hero__role');
    const heroDesc    = hero.querySelector('.hero__desc');
    const heroActions = hero.querySelector('.hero__actions');
    const heroAvatar  = hero.querySelector('.hero__visual');

    const tl = gsap.timeline({ delay: 0.8 }); // délai pour laisser la transition d'entrée finir

    if (heroEyebrow) tl.from(heroEyebrow, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' });
    if (heroLines.length) tl.from(heroLines, { opacity: 0, y: 60, skewY: 3, stagger: 0.1, duration: 0.8, ease: 'expo.out' }, '-=0.3');
    if (heroRole)    tl.from(heroRole,    { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' }, '-=0.35');
    if (heroDesc)    tl.from(heroDesc,    { opacity: 0, y: 14, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    if (heroActions) tl.from(heroActions, { opacity: 0, y: 14, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    if (heroAvatar)  tl.from(heroAvatar,  { opacity: 0, scale: 0.88, duration: 0.8, ease: 'expo.out' }, '-=0.6');
  }

  /* ══════════════════════════════════════════════
     PAGE HERO (toutes les pages sauf accueil)
     — on anime seulement si PAS de .hero (accueil)
  ══════════════════════════════════════════════ */
  if (!hero) {
    const pageHeroItems = document.querySelectorAll(
      '.page-hero .section-label, .page-hero h1, .page-hero .divider, .page-hero .lead, .page-hero .btn, .page-hero .cv-hero__top, .page-hero .cv-hero__subtitle'
    );
    if (pageHeroItems.length) {
      gsap.from(pageHeroItems, {
        opacity: 0, y: 28, stagger: 0.09, duration: 0.65, ease: 'expo.out',
        delay: 0.75 // attendre la fin de la transition d'entrée
      });
    }
  }

  /* ══════════════════════════════════════════════
     SCROLL ANIMATIONS — éléments en-dessous du fold
     (ScrollTrigger : ne déclenche QUE quand l'élément
      arrive dans le viewport, jamais sur ce qui est déjà visible)
  ══════════════════════════════════════════════ */

  /* Section labels */
  gsap.utils.toArray('.section-label').forEach(el => {
    // Ignorer les éléments déjà dans le page-hero (déjà animés)
    if (el.closest('.page-hero')) return;
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0, x: -18, duration: 0.5, ease: 'power2.out'
    });
  });

  /* Titres en-dessous du fold */
  gsap.utils.toArray('.display-title, .display-title--sm').forEach(el => {
    if (el.closest('.page-hero') || el.closest('.hero')) return;
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0, y: 36, duration: 0.65, ease: 'expo.out'
    });
  });

  /* Grilles de projets */
  document.querySelectorAll('.projects-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.project-card');
    if (!cards.length) return;
    gsap.from(cards, {
      scrollTrigger: { trigger: grid, start: 'top 85%' },
      opacity: 0, y: 44, stagger: 0.1, duration: 0.6, ease: 'power3.out'
    });
  });

  /* Paragraphes lead */
  gsap.utils.toArray('.lead').forEach(el => {
    if (el.closest('.page-hero')) return;
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 91%' },
      opacity: 0, y: 18, duration: 0.5, ease: 'power2.out'
    });
  });

  /* Skill-exp cards */
  gsap.utils.toArray('.skill-exp').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0, x: i % 2 === 0 ? -20 : 20, duration: 0.5, ease: 'power2.out'
    });
  });

  /* CV entries */
  gsap.utils.toArray('.cv-entry').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 91%' },
      opacity: 0, x: -20, duration: 0.45, ease: 'power2.out'
    });
  });

  /* Contact links */
  gsap.utils.toArray('.contact-link').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 93%' },
      opacity: 0, x: 20, duration: 0.4, delay: i * 0.07, ease: 'power2.out'
    });
  });

  /* Dividers */
  gsap.utils.toArray('.divider').forEach(el => {
    if (el.closest('.page-hero')) return;
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 93%' },
      scaleX: 0, transformOrigin: 'left', duration: 0.55, ease: 'expo.out'
    });
  });

  /* Skills domain headers */
  gsap.utils.toArray('.skills-domain__header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0, y: 20, duration: 0.5, ease: 'power2.out'
    });
  });

  /* Project hero (fiches projet) */
  const projectHero = document.querySelector('.project-hero');
  if (projectHero) {
    const items = projectHero.querySelectorAll('h1, .project-back, .tag, .badge, p');
    gsap.from(items, {
      opacity: 0, y: 22, stagger: 0.07, duration: 0.55, ease: 'power2.out',
      delay: 0.75
    });
  }

})();
