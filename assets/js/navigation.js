import { NAV_LINKS } from './config.js';

export function initNavigation() {
  const header = document.querySelector('[data-site-header]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const openBtn = document.querySelector('[data-mobile-open]');
  const closeBtns = document.querySelectorAll('[data-mobile-close]');
  const backToTop = document.querySelector('[data-back-to-top]');
  const navAnchors = [...document.querySelectorAll('[data-nav-link]')];
  const sectionIds = NAV_LINKS.map((link) => link.id);
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let scrollingToId = null;
  let scrollLockTimer = 0;

  const setHeaderState = () => {
    if (!header) return;
    const scrolled = window.scrollY > 40;
    const overHero = window.scrollY < window.innerHeight * 0.65;
    header.classList.toggle('is-transparent', overHero && !scrolled);
    header.classList.toggle('is-solid', scrolled || !overHero);
  };

  const setActiveLink = (id) => {
    if (!id) return;
    navAnchors.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  const getActiveSectionId = () => {
    if (scrollingToId) return scrollingToId;

    const headerOffset = (header?.offsetHeight || 72) + 8;
    const probe = headerOffset + window.innerHeight * 0.28;
    let current = sections[0]?.id || 'home';

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top - probe <= 0) current = section.id;
    });

    // Near bottom of page → force last section active
    const doc = document.documentElement;
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
      current = sections[sections.length - 1]?.id || current;
    }

    return current;
  };

  const syncActiveFromScroll = () => {
    setActiveLink(getActiveSectionId());
  };

  const closeMobile = () => {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    openBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMobile = () => {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    openBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileNav.querySelector('a')?.focus();
  };

  openBtn?.addEventListener('click', openMobile);
  closeBtns.forEach((btn) => btn.addEventListener('click', closeMobile));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobile();
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();

      const id = hash.slice(1);
      scrollingToId = id;
      setActiveLink(id);
      window.clearTimeout(scrollLockTimer);
      scrollLockTimer = window.setTimeout(() => {
        scrollingToId = null;
        syncActiveFromScroll();
      }, 900);

      const headerOffset = header?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobile();
      history.replaceState(null, '', hash);
    });
  });

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setHeaderState();
        syncActiveFromScroll();
        if (backToTop) {
          backToTop.classList.toggle('is-visible', window.scrollY > 500);
        }
        ticking = false;
      });
    },
    { passive: true }
  );

  backToTop?.addEventListener('click', () => {
    scrollingToId = 'home';
    setActiveLink('home');
    window.clearTimeout(scrollLockTimer);
    scrollLockTimer = window.setTimeout(() => {
      scrollingToId = null;
      syncActiveFromScroll();
    }, 900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  setHeaderState();
  syncActiveFromScroll();
}
