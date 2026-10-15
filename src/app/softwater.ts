import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, ViewEncapsulation, inject, signal, viewChild } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';

/* ==========================================================================
   Soft Water Technologies: the whole site's code (one TS file).
   The page is in softwater.html and the styles are in softwater.css (same folder).
   Image paths are written directly in softwater.html. Search for  images/  to find them.
   ========================================================================== */

/* ---- 1. YOUR DETAILS: replace the placeholders before going live ---- */
const SITE = {
  name: 'Soft Water Technologies',
  phoneDisplay: '+91 XXXXX XXXXX', // [TO CONFIRM] shown on the page
  phoneDial: '+910000000000', // [TO CONFIRM] used for the call link
  whatsapp: '910000000000', // [TO CONFIRM] digits only with country code, e.g. 919876543210
  email: 'hello@example.com', // [TO CONFIRM]
  address: 'Address to be confirmed, Karnataka', // [TO CONFIRM]
  hours: 'Working hours to be confirmed', // [TO CONFIRM]
  mapEmbed: '' as string, // [TO CONFIRM] Google Maps embed link (Share > Embed a map > copy src="...")
  placeholders: true, // set to false when real details and photos are in; hides the sample boxes
};

const WA_TEXT = 'Namaskara! I would like to book a free water test for my home.';
const waLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

/* ---- 2. LISTS SHOWN ON THE PAGE ---- */
type IconName =
  | 'whatsapp' | 'phone' | 'mail' | 'pin' | 'clock' | 'check' | 'arrow'
  | 'facebook' | 'instagram' | 'youtube' | 'menu' | 'close'
  | 'drop' | 'shield' | 'wrench' | 'flask'
  | 'gear' | 'leaf' | 'funnel' | 'factory' | 'sparkle' | 'coin' | 'users' | 'headset' | 'star' | 'chevron';

interface Faq {
  q: string;
  a: string;
}

/* These questions also feed the FAQPage data for Google (see jsonLd below), so change them here only. */
const FAQS: Faq[] = [
  { q: "How do I know if my borewell water is hard?",
    a: "Hard water carries a lot of dissolved calcium and magnesium. At home you usually see it as white, chalky scale on taps, tiles and steel vessels, clothes that feel stiff or dull, soap and shampoo that barely lather, and dry skin or hair. A water test gives the exact hardness, so you are not left guessing." },
  { q: "Why is borewell water in Karnataka often hard?",
    a: "Bore water travels through soil and rock before it reaches the borewell, and on the way it dissolves minerals such as calcium and magnesium. How hard it becomes varies from area to area and even from street to street, which is why we test your water first and only then suggest a system." },
  { q: "Can hard water damage my geyser, pipes and washing machine?",
    a: "Yes, over time. The minerals leave scale inside pipes, geysers, washing machines and fittings. Scale can reduce water flow and make appliances work harder. Removing the hardness before the water spreads through the house protects all of them." },
  { q: "How does a water softener work?",
    a: "Hard water flows through a tank of resin beads. The beads hold on to calcium and magnesium, the minerals that cause scale, and release sodium in their place, so the water that reaches your taps is soft. Every so often the softener rinses the beads with salt water, and the trapped hardness washes down the drain. You only need to keep the salt topped up." },
  { q: "Do I need a water softener or an RO system?",
    a: "They solve different problems. A softener removes hardness for the whole house and is fitted where water enters your home or overhead tank. An RO system is for drinking and cooking water, and lowers dissolved salts and impurities at the kitchen. Many borewell homes use a softener for the house and an RO for the kitchen. The water test tells us which of the two, or both, you actually need." },
  { q: "Do I also need a sand filter or a carbon filter?",
    a: "Only if your water needs one. A sand filter traps mud, silt and suspended dirt from bore and tanker water before it reaches your tank. A carbon filter takes out chlorine, odour, colour and bad taste. We check for these during the water test, so you pay only for what your water needs." },
  { q: "What happens after I book a water test?",
    a: "First we test your water. Then we explain the results in plain words and suggest the right system and size for your family. Our team then fits it neatly at your inlet or overhead tank and shows you how it works. After that, servicing, salt refills and regular checks keep the water soft year after year." },
  { q: "Which areas do you serve?",
    a: "We serve customers in Karnataka, for single homes, villas, apartments, offices and commercial sites. Send your area to us on WhatsApp or call us, and we will confirm how soon we can reach you." },
];

/* ---- 3. SEO: what Google and link previews read (moved here from index.html) ---- */
/*
  TO FINISH BEFORE LAUNCH (needs the real website address):
   1. Add  { rel: canonical } link:  https://YOUR-DOMAIN/
   2. Add  og:url  and  og:image (1200x630 picture) below so WhatsApp / Facebook previews show a picture.
   3. In jsonLd() add "url", "telephone" and "address" once your real details are in SITE above.
*/
const PAGE = {
  title: 'Water Softener & RO for Borewell Water | Soft Water Technologies',
  description:
    'Hard borewell water leaving white marks? Soft Water Technologies tests your water and fits the right softener, RO or filter in Karnataka. Book on WhatsApp.',
  themeColor: '#1260d6',
};

const OFFERS = [
  'Water softeners',
  'RO systems',
  'Sand filters',
  'Carbon filters',
  'Smart water controllers',
  'Water conditioners',
  'STP and ETP (sewage and effluent treatment plants)',
];

/** Structured data for Google: the business, and the FAQ (built from the same FAQS list shown on the page). */
function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': '#business',
        name: SITE.name,
        description:
          'Soft Water Technologies tests borewell water and fits the right water softener, RO system or filter for homes, apartments and commercial sites in Karnataka.',
        areaServed: { '@type': 'AdministrativeArea', name: 'Karnataka, India' },
        knowsAbout: ['Hard water', 'Borewell water treatment', 'Water softeners', 'RO water purification'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Water treatment services',
          itemListElement: OFFERS.map((name) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

/* ---- 4. ICONS (small drawings used by the page) ---- */
const ICONS: Record<IconName, string> = {
  whatsapp: 'M12 2.2a9.7 9.7 0 0 0-8.3 14.8L2.4 21.6l4.8-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3Z',
  phone: 'M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.3 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.3 1l-2.2 2.2Z',
  mail: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11H7v-2h4V6h2v7Z',
  check: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z',
  arrow: 'M4 11h12.2l-5.3-5.3 1.4-1.4L20 12l-7.7 7.7-1.4-1.4 5.3-5.3H4v-2Z',
  facebook: 'M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.5H7.5v3.3h2.8V22h3.2Z',
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.2-3.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z',
  youtube: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z',
  menu: 'M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z',
  close: 'M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z',
  drop: 'M12 2.5S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.5 12 2.5Z',
  shield: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1 14-3.5-3.5 1.4-1.4L11 13.2l4.1-4.1 1.4 1.4L11 16Z',
  wrench: 'M22 19.6 13.4 11a5 5 0 0 0-6.7-6.2l3.6 3.6-2.1 2.1-3.6-3.6A5 5 0 0 0 10.8 13l8.6 8.6a1.5 1.5 0 0 0 2.1 0l.5-.5a1.5 1.5 0 0 0 0-2.1Z',
  flask: 'M9 2h6v2h-1v5.2l5.4 9A2 2 0 0 1 17.7 21H6.3a2 2 0 0 1-1.7-2.8L10 9.2V4H9V2Z',
  gear: 'M10.5 2h3l.5 2.3a8 8 0 0 1 1.900 1.100l2.200-.8 1.500 2.600-1.700 1.600a8 8 0 0 1 0 2.200l1.700 1.600-1.500 2.600-2.200-.8a8 8 0 0 1-1.900 1.100L13.500 22h-3l-.5-2.300a8 8 0 0 1-1.900-1.100l-2.200.8-1.500-2.600 1.700-1.600a8 8 0 0 1 0-2.200L4.400 11.400l1.500-2.600 2.200.8A8 8 0 0 1 10 6.500L10.500 2Zm1.500 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  leaf: 'M20 4C10 4 4 9 4 16c0 1.500.4 2.800 1 4 1-4 4-7 8-9-3 3-5 6-5.500 10C17 21 20 14 20 4Z',
  funnel: 'M3 4h18l-7 8.500V20l-4-2v-5.500L3 4Z',
  factory: 'M2 21V9l6 3V9l6 3V5h4v7h4v9H2Z',
  sparkle: 'M12 2l2.200 6.800L21 11l-6.800 2.200L12 20l-2.200-6.800L3 11l6.800-2.200L12 2Z',
  coin: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15.500V19h-2v-1.500c-1.500-.2-2.600-1-3-2.300l1.800-.7c.2.800.9 1.300 2.200 1.300 1.100 0 1.800-.4 1.800-1.100 0-.7-.5-1-2.200-1.400-2-.5-3.300-1.200-3.300-3 0-1.400 1-2.400 2.700-2.700V5h2v1.500c1.200.2 2.100.9 2.500 2l-1.700.7c-.3-.7-.9-1-1.800-1-1 0-1.600.4-1.600 1 0 .7.600.9 2 1.300 2.100.5 3.500 1.200 3.500 3.100 0 1.500-1.100 2.600-2.900 2.900Z',
  users: 'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2.300 0-7 1.200-7 3.500V19h14v-2.500C15 14.200 10.300 13 8 13Zm8 0c-.3 0-.6 0-1 .1 1.200.9 2 2 2 3.400V19h6v-2.500c0-2.300-4.700-3.500-7-3.500Z',
  headset: 'M12 2a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h2v-8H5v-2a7 7 0 0 1 14 0v2h-3v8h3v1h-6v2h6a3 3 0 0 0 3-3v-8a9 9 0 0 0-9-9Z',
  star: 'M12 2l3 6.300 6.900.9-5 4.800 1.200 6.900L12 17.600 5.900 20.900 7.100 14 2.100 9.200 9 8.300 12 2Z',
  chevron: 'M9 5l7 7-7 7-1.400-1.400L13.200 12 7.600 6.400 9 5Z',
};

/* ---- 5. THE PAGE LOGIC ---- */
@Component({
  selector: 'app-root',
  templateUrl: './softwater.html',
  styleUrl: './softwater.css',
  // None = the CSS applies to the whole page (colours, fonts, body), not just this component.
  encapsulation: ViewEncapsulation.None,
})
export class SoftWater {
  protected readonly site = SITE;
  protected readonly ic = ICONS;
  protected readonly faqs = FAQS;
  protected readonly year = new Date().getFullYear();
  protected readonly tel = 'tel:' + SITE.phoneDial;
  protected readonly wa = waLink(WA_TEXT);

  protected readonly menu = signal(false);
  protected readonly interest = signal('Free water test');
  private readonly gallery = viewChild<ElementRef<HTMLElement>>('gallery');

  constructor() {
    const doc = inject(DOCUMENT);
    doc.documentElement.lang = 'en-IN';
    inject(Title).setTitle(PAGE.title);
    inject(Meta).addTags([
      { name: 'description', content: PAGE.description },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'theme-color', content: PAGE.themeColor },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: 'en_IN' },
      { property: 'og:title', content: PAGE.title },
      { property: 'og:description', content: PAGE.description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: PAGE.title },
      { name: 'twitter:description', content: PAGE.description },
    ]);
    const script = doc.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd());
    doc.head.appendChild(script);
  }

  protected readonly map: SafeResourceUrl | null = SITE.mapEmbed
    ? inject(DomSanitizer).bypassSecurityTrustResourceUrl(SITE.mapEmbed)
    : null;

  protected readonly nav = [
    { l: 'Home', h: '#home' },
    { l: 'About', h: '#about' },
    { l: 'Technology', h: '#technology' },
    { l: 'Services', h: '#services' },
    { l: 'Gallery', h: '#gallery' },
    { l: 'Contact', h: '#contact' },
  ];

  protected readonly perks: { i: IconName; t: string }[] = [
    { i: 'drop', t: 'Removes Hardness Minerals' },
    { i: 'shield', t: 'Protects Appliances' },
    { i: 'leaf', t: 'Healthier Skin & Hair' },
  ];

  protected readonly features: { i: IconName; t: string; h: string }[] = [
    { i: 'gear', t: 'Soft Water Technology', h: '#technology' },
    { i: 'flask', t: 'Underground Water Testing', h: '#testing' },
    { i: 'funnel', t: 'Advanced Filtration Systems', h: '#services' },
    { i: 'wrench', t: 'Installation & AMC', h: '#process' },
    { i: 'factory', t: 'Industrial Solutions', h: '#services' },
    { i: 'leaf', t: 'Eco Friendly & Sustainable', h: '#about' },
  ];

  protected readonly tests = ['pH', 'TDS', 'Hardness', 'Iron', 'Nitrates', 'Fluoride'];

  protected readonly benefits: { i: IconName; t: string }[] = [
    { i: 'leaf', t: 'Softer Skin & Hair' },
    { i: 'shield', t: 'Cleaner Dishes' },
    { i: 'sparkle', t: 'Brighter Laundry' },
    { i: 'wrench', t: 'Longer Appliance Life' },
    { i: 'coin', t: 'Cost Saving Maintenance' },
    { i: 'drop', t: 'Better Water for Everyday Use' },
  ];

  protected readonly values: { i: IconName; t: string }[] = [
    { i: 'shield', t: 'Quality Products' },
    { i: 'users', t: 'Expert Team' },
    { i: 'coin', t: 'Affordable Pricing' },
    { i: 'headset', t: 'After Sales Support' },
  ];

  protected readonly steps: { i: IconName; t: string; d: string }[] = [
    { i: 'flask', t: 'Water Testing', d: 'We analyse your water quality' },
    { i: 'gear', t: 'Solution Design', d: 'Customized system for your needs' },
    { i: 'wrench', t: 'Installation', d: 'Professional setup by experts' },
    { i: 'headset', t: 'Support & Maintenance', d: 'Regular service & AMC' },
  ];

  /** Choices in the contact form's "Service interested in" list. */
  protected readonly services = [
    'Free water test',
    'Water Softener',
    'Sand Filter',
    'Carbon Filter',
    'RO Plant',
    'Water Conditioner',
    'Smart Water Controller',
    'Sewage Treatment Plant (STP)',
    'Effluent Treatment Plant (ETP)',
    'Installation & AMC',
  ];

  /** Sample review boxes, shown only while SITE.placeholders is true. Replace with real reviews in softwater.html. */
  protected readonly sampleReviews = [1, 2, 3];

  /** FAQ water drop: short facts shown in its speech bubble, one per tap. */
  protected readonly tips = [
    'Crystal-clear soft water! Tap the drop to see why it is better.',
    'Soap lathers easily in soft water, so you use less.',
    'No more white scale on taps, geysers and pipes.',
    'Soft water feels gentler on skin and hair after a bath.',
    'Geysers and washing machines last longer with soft water.',
    'Not sure about your water? Book a free water test!',
  ];
  protected readonly tip = signal(0);
  protected readonly pop = signal(false);
  private popTimer: ReturnType<typeof setTimeout> | undefined;

  /** Makes the water drop wobble and splash. Tapping the scene also shows the next fact. */
  protected react(nextTip = false): void {
    if (nextTip) this.tip.update((n) => (n + 1) % this.tips.length);
    this.pop.set(false);
    clearTimeout(this.popTimer);
    setTimeout(() => this.pop.set(true), 20);
    this.popTimer = setTimeout(() => this.pop.set(false), 900);
  }

  /** "Know More" / "Book a Water Test" buttons: choose the service in the form, then scroll to it. */
  protected know(service: string): void {
    this.interest.set(service);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Gallery arrows. */
  protected slide(dir: number): void {
    const el = this.gallery()?.nativeElement;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  /** Opens WhatsApp with the form details filled in. Nothing is sent until the visitor presses send there. */
  protected send(e: Event, name: string, phone: string, email: string, service: string, message: string): void {
    e.preventDefault();
    const text =
      `Namaskara! My name is ${name}. Phone: ${phone}.` +
      (email ? ` Email: ${email}.` : '') +
      ` I am interested in: ${service}.` +
      (message ? ' ' + message : '');
    window.open(waLink(text), '_blank', 'noopener');
  }
}
