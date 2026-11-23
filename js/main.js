/* main.js — Navigation, burger menu, video-on-hover, filtres projets */

(function () {

  /* ───────────────────────────────────────────
     NAVIGATION — scroll shrink + burger menu
  ─────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('is-open');
      mobileNav.setAttribute('aria-hidden', String(isOpen));
      document.body.classList.toggle('nav-open');
    });

    // Fermer le menu en cliquant sur un lien
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* ───────────────────────────────────────────
     VIDEO ON HOVER — remplace img par video
  ─────────────────────────────────────────── */
  function initVideoCards() {
    document.querySelectorAll('.project-card').forEach(card => {
      const video = card.querySelector('video.project-card__video');
      if (!video) return;

      const link = card.querySelector('.project-card__link');

      link.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch(() => {}); // silencieux si autoplay bloqué
        card.classList.add('is-playing');
      });

      link.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        card.classList.remove('is-playing');
      });

      // Accessibility : keyboard focus
      link.addEventListener('focus', () => {
        video.play().catch(() => {});
        card.classList.add('is-playing');
      });
      link.addEventListener('blur', () => {
        video.pause();
        video.currentTime = 0;
        card.classList.remove('is-playing');
      });
    });
  }

  /* ───────────────────────────────────────────
     FILTRES PROJETS
  ─────────────────────────────────────────── */
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projectsGrid .project-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Mise à jour des boutons actifs
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Filtrage avec animation
        projectCards.forEach(card => {
          const category = card.dataset.category;
          const match = filter === 'all' || category === filter;

          if (match) {
            card.classList.remove('is-hidden');
            card.style.display = '';
            // Petite animation d'apparition
            requestAnimationFrame(() => {
              card.style.opacity = '0';
              card.style.transform = 'translateY(16px)';
              requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          } else {
            card.classList.add('is-hidden');
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              if (card.classList.contains('is-hidden')) {
                card.style.display = 'none';
              }
            }, 260);
          }
        });
      });
    });
  }

  /* ───────────────────────────────────────────
     VIDEO ON HOVER — image principale page projet
  ─────────────────────────────────────────── */
  function initMainVideoHover() {
    const wrap = document.querySelector('.project-main-media');
    if (!wrap) return;

    const video = wrap.querySelector('video.project-main-video');
    if (!video) return;

    wrap.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play().catch(() => {});
      wrap.classList.add('is-playing');
    });

    wrap.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      wrap.classList.remove('is-playing');
    });
  }

  /* ───────────────────────────────────────────
     INIT
  ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initVideoCards();
    initFilters();
    initMainVideoHover();
  });

})();
