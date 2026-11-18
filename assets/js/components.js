import { buildWhatsAppUrl, productEnquiryMessage } from './whatsapp.js';

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null || value === false) return;
    if (key === 'className') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else node.setAttribute(key, value === true ? '' : String(value));
  });
  children.forEach((child) => {
    if (child == null) return;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  });
  return node;
}

function createLazyImage({ src, alt, width, height, className = '', eager = false }) {
  const img = el('img', {
    src,
    alt,
    width,
    height,
    className: `img-loading ${className}`.trim(),
    loading: eager ? 'eager' : 'lazy',
    decoding: 'async',
  });
  if (eager) img.setAttribute('fetchpriority', 'high');
  img.addEventListener('load', () => {
    img.classList.remove('img-loading');
    img.classList.add('img-loaded');
  });
  if (img.complete) {
    img.classList.remove('img-loading');
    img.classList.add('img-loaded');
  }
  return img;
}

export function renderCollections(target, items) {
  if (!target) return;
  target.replaceChildren();
  items.forEach((item, index) => {
    const tile = el('article', {
      id: item.id,
      className: `collection-tile reveal reveal-delay-${(index % 4) + 1}`,
    });

    const media = el('div', { className: 'collection-tile__media media-frame' }, [
      createLazyImage({
        src: item.image,
        alt: item.alt,
        width: item.width,
        height: item.height,
      }),
    ]);

    const body = el('div', { className: 'collection-tile__body' }, [
      el('span', { className: 'eyebrow', text: item.eyebrow }),
      el('h3', { className: 'heading-card collection-tile__title', text: item.title }),
      el('p', { className: 'collection-tile__desc', text: item.description }),
      el('a', { className: 'btn btn-secondary collection-tile__cta', href: item.href }, [
        document.createTextNode('Explore Collection'),
      ]),
    ]);

    tile.append(media, body);
    target.append(tile);
  });
}

export function renderCategories(target, items) {
  if (!target) return;
  target.replaceChildren();
  items.forEach((item, index) => {
    const tile = el('a', {
      className: `category-tile group reveal reveal-delay-${(index % 4) + 1}`,
      href: item.href,
      'data-filter': item.filter,
    });

    tile.append(
      el('div', { className: 'media-frame' }, [
        createLazyImage({
          src: item.image,
          alt: item.alt,
          width: item.width,
          height: item.height,
        }),
      ]),
      el('div', { className: 'category-tile__content' }, [
        el('span', { className: 'eyebrow text-gold', text: item.eyebrow }),
        el('h3', { className: 'heading-card', text: item.title }),
        el('p', { className: 'text-sm mt-1 mb-2', text: item.description }),
        el('span', { className: 'text-xs uppercase tracking-[0.14em] text-gold', text: `${item.cta} →` }),
      ])
    );

    target.append(tile);
  });
}

export function renderProducts(target, items) {
  if (!target) return;
  target.replaceChildren();

  if (!items.length) {
    target.append(
      el('p', {
        className: 'body-muted col-span-full',
        text: 'No pieces match this filter. Try another category.',
      })
    );
    return;
  }

  items.forEach((item, index) => {
    const card = el('article', {
      className: `product-card group reveal reveal-delay-${(index % 4) + 1}`,
      'data-categories': item.categories.join(' '),
    });

    const enquireHref = buildWhatsAppUrl(productEnquiryMessage(item.title));

    card.append(
      el('div', { className: 'product-card__media media-frame' }, [
        createLazyImage({
          src: item.image,
          alt: item.alt,
          width: item.width,
          height: item.height,
        }),
      ]),
      el('div', { className: 'product-card__body' }, [
        el('span', { className: 'eyebrow', text: item.categoryLabel }),
        el('h3', { className: 'heading-card product-card__title', text: item.title }),
        el('p', { className: 'product-card__desc', text: item.description }),
        el(
          'a',
          {
            className: 'btn btn-secondary product-card__cta',
            href: enquireHref,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          [document.createTextNode('Enquire on WhatsApp')]
        ),
      ])
    );

    target.append(card);
  });
}

export function renderTestimonials(track, items) {
  if (!track) return;
  track.replaceChildren();
  items.forEach((item) => {
    const slide = el('div', { className: 'carousel__slide' }, [
      el('blockquote', { className: 'testimonial-card' }, [
        item.isSample
          ? el('span', { className: 'testimonial-sample', text: 'Sample review' })
          : null,
        el('p', {
          className: 'testimonial-card__quote',
          text: `“${item.quote}”`,
        }),
        el('footer', { className: 'mt-6' }, [
          el('cite', {
            className: 'testimonial-card__name',
            text: item.name,
          }),
          el('span', { className: 'body-muted text-sm', text: item.location }),
        ]),
      ]),
    ]);
    track.append(slide);
  });
}

export function initCarousel(root) {
  if (!root) return;
  const track = root.querySelector('.carousel__track');
  const prev = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  if (!track) return;

  let index = 0;

  const getPerView = () => {
    const value = Number.parseFloat(getComputedStyle(track).getPropertyValue('--carousel-per-view'));
    return Number.isFinite(value) && value > 0 ? Math.round(value) : 1;
  };

  const getMaxIndex = () => {
    const slides = track.querySelectorAll('.carousel__slide').length;
    return Math.max(0, slides - getPerView());
  };

  const apply = () => {
    const maxIndex = getMaxIndex();
    index = Math.min(Math.max(0, index), maxIndex);
    const slide = track.querySelector('.carousel__slide');
    if (!slide) return;

    const gap = Number.parseFloat(getComputedStyle(track).gap) || 20;
    const step = slide.getBoundingClientRect().width + gap;
    track.style.transform = `translate3d(${-index * step}px, 0, 0)`;

    if (prev) prev.disabled = index <= 0;
    if (next) next.disabled = index >= maxIndex;
  };

  prev?.addEventListener('click', () => {
    index -= 1;
    apply();
  });

  next?.addEventListener('click', () => {
    index += 1;
    apply();
  });

  window.addEventListener('resize', () => {
    apply();
  });

  apply();
}
