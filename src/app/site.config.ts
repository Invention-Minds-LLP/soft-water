/**
 * Everything the client still has to confirm lives here.
 * Replace the placeholders before going live; nothing else in the site
 * needs to change.
 */
export const SITE = {
  name: 'Soft Water Technologies',

  // [CLIENT TO CONFIRM] Shown on buttons and in the footer.
  phoneDisplay: '+91 XXXXX XXXXX',
  // [CLIENT TO CONFIRM] Digits only, with country code, e.g. '919876543210'.
  phoneDial: '+910000000000',
  // [CLIENT TO CONFIRM] Digits only, with country code. Used for wa.me links.
  whatsapp: '910000000000',
  // [CLIENT TO CONFIRM]
  email: 'hello@example.com',
  // [CLIENT TO CONFIRM]
  address: 'Address to be confirmed, Karnataka',
  // [CLIENT TO CONFIRM]
  serviceArea: 'Service area to be confirmed',
  // [CLIENT TO CONFIRM]
  hours: 'Working hours to be confirmed',

  /** True until the client supplies real contact details. Shows a small notice in the footer. */
  placeholders: true,
} as const;

export function whatsappLink(text: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_TEST_MESSAGE =
  'Namaskara! I would like to book a free water test for my home.';
