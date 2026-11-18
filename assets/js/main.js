import { collections } from './data/collections.js';
import { categories } from './data/categories.js';
import { products } from './data/products.js';
import { testimonials } from './data/testimonials.js';
import {
  renderCategories,
  renderCollections,
  renderProducts,
  renderTestimonials,
  initCarousel,
} from './components.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initContactForm } from './contact-form.js';

function applyProductFilter(filterId) {
  const list =
    filterId === 'all'
      ? products
      : products.filter((item) => item.categories.includes(filterId));

  renderProducts(document.querySelector('#productsGrid'), list);
  initAnimations();
}

function bindCategoryFilters() {
  document.querySelector('#categoriesGrid')?.addEventListener('click', (event) => {
    const link = event.target.closest('[data-filter]');
    if (!link) return;
    const filter = link.getAttribute('data-filter');
    if (!filter) return;
    // Allow hash navigation, then filter products
    window.setTimeout(() => {
      applyProductFilter(filter === 'fabrics' ? 'all' : filter);
    }, 350);
  });
}

function boot() {
  renderCollections(document.querySelector('#collectionsGrid'), collections);
  renderCategories(document.querySelector('#categoriesGrid'), categories);
  renderProducts(document.querySelector('#productsGrid'), products);
  renderTestimonials(document.querySelector('#testimonialsTrack'), testimonials);
  initCarousel(document.querySelector('#reviewsCarousel'));
  bindCategoryFilters();
  initNavigation();
  initContactForm();
  initAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
