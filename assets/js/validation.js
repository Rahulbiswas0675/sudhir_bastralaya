const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

export function sanitizeText(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim();
}

export function validateName(value) {
  const name = sanitizeText(value);
  if (!name) return 'Please enter your full name.';
  if (name.length < 2) return 'Name must be at least 2 characters.';
  return '';
}

export function validatePhone(value) {
  const phone = sanitizeText(value).replace(/[()\s-]/g, '');
  const normalized = phone.startsWith('+') ? phone : phone.replace(/^0+/, '');
  const check = normalized.startsWith('91') && normalized.length > 10 ? `+${normalized}` : normalized;
  if (!check) return 'Please enter your phone number.';
  if (!PHONE_RE.test(check.replace(/\s/g, ''))) {
    return 'Enter a valid 10-digit Indian mobile number.';
  }
  return '';
}

export function validateEmail(value, { required = false } = {}) {
  const email = sanitizeText(value);
  if (!email) return required ? 'Please enter your email.' : '';
  if (!EMAIL_RE.test(email)) return 'Enter a valid email address.';
  return '';
}

export function validateRequiredSelect(value, label = 'selection') {
  if (!sanitizeText(value)) return `Please choose a ${label}.`;
  return '';
}

export function setFieldError(fieldEl, message) {
  if (!fieldEl) return;
  const errorEl = fieldEl.querySelector('.field-error');
  const input = fieldEl.querySelector('input, select, textarea');
  if (message) {
    fieldEl.classList.add('is-invalid');
    if (errorEl) errorEl.textContent = message;
    if (input) input.setAttribute('aria-invalid', 'true');
  } else {
    fieldEl.classList.remove('is-invalid');
    if (errorEl) errorEl.textContent = '';
    if (input) input.removeAttribute('aria-invalid');
  }
}
