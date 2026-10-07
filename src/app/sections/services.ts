import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { MOTION_OK, gsap } from '../motion';

interface Service {
  id: string;
  name: string;
  kn: string;
  text: string;
  for: string;
}

@Component({
  selector: 'app-services',
  template: `
    <section class="services" id="services" aria-labelledby="services-title">
      <header class="head">
        <h2 id="services-title">Every kind of water problem, <span>one team.</span></h2>
        <p>Bore water in Karnataka varies from street to street. We test yours first, then fit what it actually needs, for a single home, an apartment block or a factory.</p>
      </header>

      <ul class="list">
        @for (s of services; track s.id) {
          <li class="row">
            <svg class="pic" viewBox="0 0 64 64" aria-hidden="true">
              @switch (s.id) {
                @case ('softener') {
                  <rect x="10" y="12" width="20" height="44" rx="10" /><rect x="14" y="4" width="12" height="8" rx="2" />
                  <rect x="36" y="28" width="18" height="28" rx="3" /><path d="M30 20h10v8" />
                  <circle cx="17" cy="38" r="1.5" class="f" /><circle cx="23" cy="44" r="1.5" class="f" /><circle cx="18" cy="48" r="1.5" class="f" />
                }
                @case ('ro') {
                  <rect x="8" y="10" width="48" height="34" rx="4" /><path d="M18 18v18M28 18v18M38 18v18M48 18v18" />
                  <path d="M20 44v10h24" /><path d="M44 50v8" />
                }
                @case ('sand') {
                  <rect x="18" y="8" width="28" height="48" rx="12" /><path d="M18 34h28M18 42h28" />
                  <circle cx="26" cy="47" r="1.5" class="f" /><circle cx="34" cy="50" r="1.5" class="f" /><circle cx="39" cy="46" r="1.5" class="f" />
                  <path d="M32 8V2h12" />
                }
                @case ('carbon') {
                  <rect x="18" y="8" width="28" height="48" rx="12" /><path d="M24 26h16v22H24z" class="f" /><path d="M32 8V2H20" />
                }
                @case ('smart') {
                  <rect x="14" y="14" width="36" height="28" rx="6" /><rect x="20" y="20" width="24" height="10" rx="2" />
                  <path d="M24 42v10M40 42v10M8 52h48" /><circle cx="32" cy="36" r="2" class="f" />
                }
                @case ('conditioner') {
                  <path d="M2 32h60" /><rect x="22" y="22" width="20" height="20" rx="4" /><path d="M27 18v28M37 18v28" />
                }
                @case ('stp') {
                  <rect x="4" y="30" width="18" height="24" /><rect x="24" y="22" width="18" height="32" /><rect x="44" y="34" width="16" height="20" />
                  <path d="M22 38h2M42 42h2M10 30v-8h8" /><path d="M8 44c3-2 7 2 10 0M28 38c3-2 7 2 10 0" />
                }
              }
            </svg>
            <div class="name">
              <h3>{{ s.name }}</h3>
              <p class="kn" lang="kn">{{ s.kn }}</p>
            </div>
            <p class="text">{{ s.text }}</p>
            <p class="for">
              <span class="tag">
                <svg class="tag-end" viewBox="0 0 30 36" aria-hidden="true">
                  <path class="thread" d="M13 18 C 6 8, -4 6, -16 2" />
                  <path d="M30 0 H13 L0 18 L13 36 H30 Z" class="tag-steel" />
                  <circle cx="12" cy="18" r="4.2" class="tag-hole" />
                  <circle cx="12" cy="18" r="5.6" class="tag-ring" />
                </svg>
                <span class="tag-body">{{ s.for }}</span>
              </span>
            </p>
          </li>
        }
      </ul>
    </section>
  `,
  styleUrl: './services.css',
})
export class Services {
  protected readonly services: Service[] = [
    { id: 'softener', name: 'Water softeners', kn: 'ನೀರು ಮೃದುಗೊಳಿಸುವ ಯಂತ್ರ', text: 'Remove the calcium and magnesium that leave white scale. The direct fix for hard borewell water.', for: 'Homes, villas, apartments' },
    { id: 'ro', name: 'RO systems', kn: 'ಆರ್‌ಒ ಶುದ್ಧೀಕರಣ', text: 'Reverse osmosis for drinking and cooking water: lowers dissolved salts and impurities.', for: 'Kitchens, offices, commercial' },
    { id: 'sand', name: 'Sand filters', kn: 'ಮರಳು ಫಿಲ್ಟರ್', text: 'Trap mud, silt and suspended dirt from bore and tanker water before it reaches your tank.', for: 'Homes, apartments' },
    { id: 'carbon', name: 'Carbon filters', kn: 'ಕಾರ್ಬನ್ ಫಿಲ್ಟರ್', text: 'Activated carbon takes out chlorine, odour, colour and bad taste.', for: 'Homes, commercial' },
    { id: 'smart', name: 'Smart water controllers', kn: 'ಸ್ಮಾರ್ಟ್ ನಿಯಂತ್ರಕ', text: 'Automatic control for your treatment system, so it runs on schedule without anyone turning valves.', for: 'Homes, apartments' },
    { id: 'conditioner', name: 'Water conditioners', kn: 'ನೀರಿನ ಕಂಡೀಷನರ್', text: 'Fitted on the pipeline to reduce scale build-up in pipes, fittings and appliances.', for: 'Homes, commercial' },
    { id: 'stp', name: 'STP & ETP', kn: 'ತ್ಯಾಜ್ಯ ನೀರು ಸಂಸ್ಕರಣೆ', text: 'Sewage and effluent treatment plants that clean wastewater for safe reuse or discharge.', for: 'Apartments, hotels, industry' },
  ];
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap.from(q('.head > *'), {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: q('.head')[0], start: 'top 80%' },
        });
        q('.row').forEach((row) => {
          gsap.from(row, {
            clipPath: 'inset(0 0 100% 0)',
            y: 24,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          });
        });
      });
      destroyRef.onDestroy(() => mm.revert());
    });
  }
}
