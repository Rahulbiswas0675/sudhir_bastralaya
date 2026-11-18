import { INTEREST_OPTIONS } from './config.js';
import {
  sanitizeText,
  validateEmail,
  validateName,
  validatePhone,
  validateRequiredSelect,
  setFieldError,
} from './validation.js';
import { formatContactMessage, openWhatsApp } from './whatsapp.js';

export function initContactForm() {
  const form = document.querySelector('#whatsappForm');
  if (!form) return;

  const interest = form.querySelector('#interestedIn');
  if (interest && interest.options.length <= 1) {
    INTEREST_OPTIONS.forEach((option) => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      interest.append(opt);
    });
  }

  const fields = {
    fullName: form.querySelector('[data-field="fullName"]'),
    phoneNumber: form.querySelector('[data-field="phoneNumber"]'),
    emailAddress: form.querySelector('[data-field="emailAddress"]'),
    interestedIn: form.querySelector('[data-field="interestedIn"]'),
    userMessage: form.querySelector('[data-field="userMessage"]'),
  };

  const validateAll = () => {
    const name = sanitizeText(form.fullName.value);
    const phone = sanitizeText(form.phoneNumber.value);
    const email = sanitizeText(form.emailAddress.value);
    const category = sanitizeText(form.interestedIn.value);
    const message = sanitizeText(form.userMessage.value);

    const errors = {
      fullName: validateName(name),
      phoneNumber: validatePhone(phone),
      emailAddress: validateEmail(email),
      interestedIn: validateRequiredSelect(category, 'category'),
      userMessage: '',
    };

    setFieldError(fields.fullName, errors.fullName);
    setFieldError(fields.phoneNumber, errors.phoneNumber);
    setFieldError(fields.emailAddress, errors.emailAddress);
    setFieldError(fields.interestedIn, errors.interestedIn);
    setFieldError(fields.userMessage, errors.userMessage);

    const firstInvalid = Object.entries(errors).find(([, msg]) => msg);
    return {
      valid: !firstInvalid,
      values: { name, phone, email, category, message },
      firstInvalid: firstInvalid?.[0],
    };
  };

  ['fullName', 'phoneNumber', 'emailAddress', 'interestedIn'].forEach((name) => {
    const input = form.elements.namedItem(name);
    input?.addEventListener('blur', () => validateAll());
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = validateAll();
    if (!result.valid) {
      const field = fields[result.firstInvalid];
      field?.querySelector('input, select, textarea')?.focus();
      return;
    }

    const text = formatContactMessage(result.values);
    openWhatsApp(text);
  });
}
