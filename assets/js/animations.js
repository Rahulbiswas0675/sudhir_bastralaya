export function initAnimations() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('[data-hero]');
  if (hero && !reduceMotion) hero.classList.add('hero-enter');
  else if (hero) {
    hero.querySelectorAll('.hero-kicker, .hero-title, .hero-lead, .hero-quote, .hero-actions, .hero-meta, .hero-media, .hero__photo, .hero__accent-line').forEach((node) => {
      node.style.opacity = '1';
      node.style.transform = 'none';
      if (node.classList.contains('hero__accent-line')) node.style.width = '4.5rem';
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    reveals.forEach((node) => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  reveals.forEach((node) => observer.observe(node));
}
