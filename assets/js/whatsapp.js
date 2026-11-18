import { SITE } from './config.js';

export function buildWhatsAppUrl(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export function openWhatsApp(message) {
  const url = buildWhatsAppUrl(message);
  const popup = window.open(url, '_blank', 'noopener,noreferrer');
  if (!popup) {
    window.location.assign(url);
  }
  return url;
}

export function productEnquiryMessage(productTitle) {
  return `Hello Sudhir Bastralaya, I am interested in enquiring about the ${productTitle}.`;
}

export function formatContactMessage({ name, phone, email, category, message }) {
  const lines = [
    'Namaste Sudhir Bastralaya,',
    '',
    'I would like to make an enquiry:',
    `Name: ${name}`,
    `Phone: ${phone}`,
  ];

  if (email) {
    lines.push(`Email: ${email}`);
  }

  lines.push(`Interested In: ${category}`);
  lines.push(`Message: ${message || 'Looking forward to your collection details.'}`);
  lines.push('');
  lines.push('(I will confirm and send this message from WhatsApp.)');

  return lines.join('\n');
}
