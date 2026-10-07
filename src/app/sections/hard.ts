import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { Family } from '../art/family';
import { KodaRow } from '../art/koda-row';
import { MOTION_OK, gsap, moodTo, reducedMotion } from '../motion';

@Component({
  selector: 'app-hard',
  imports: [Family, KodaRow],
  template: `
    <section class="hard" aria-labelledby="hard-title">
      <div class="pin">
        <svg class="word" viewBox="0 0 1000 300" aria-hidden="true">
          <defs>
            <filter id="crust-word" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.06 0.9" numOctaves="3" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <clipPath id="crust-rise"><rect class="rise" x="0" y="300" width="1000" height="300" /></clipPath>
          </defs>
          <text x="500" y="236" text-anchor="middle" class="word-clean" lang="kn">ಗಡಸು</text>
          <g clip-path="url(#crust-rise)">
            <text x="500" y="236" text-anchor="middle" class="word-crust" filter="url(#crust-word)" lang="kn">ಗಡಸು</text>
          </g>
        </svg>

        <div class="copy">
          <div class="beat beat-1">
            <p class="said" lang="kn">“ಅಮ್ಮಾ, ನಲ್ಲಿಯಲ್ಲಿ ಬಿಳಿ ಕಲೆ!”</p>
            <h2 id="hard-title">Then the white marks began.</h2>
            <p>Within weeks a chalky crust grows on every tap, tile and steel koda. Scrubbing can't keep up. This is hard water: <span lang="kn">ಗಡಸು ನೀರು</span>.</p>
          </div>
          <div class="beat beat-2">
            <h3>Hard water shows up everywhere.</h3>
            <ul class="signs">
              <li>White scale on taps, tiles and steel vessels</li>
              <li>Clothes come out stiff and dull</li>
              <li>Soap and shampoo barely lather</li>
              <li>Dry hair, itchy skin</li>
              <li>Geysers and washing machines clog with scale</li>
            </ul>
          </div>
          <div class="beat beat-3">
            <p class="said" lang="kn">“ಅಯ್ಯೋ… ಈ ನೀರು ಯಾಕೆ ಹೀಗಿದೆ?”</p>
            <h3>The new home stopped feeling new.</h3>
            <p>Ajji's steel kodas turned white. The new bathroom tiles lost their shine. This is usually when a family starts looking for help.</p>
          </div>
        </div>

        <div class="stage">
          <app-family class="hard-family" [mood]="reduced ? 'sad' : 'happy'" label="The family, worried about the water" />
          <app-koda-row class="hard-kodas" [crusted]="true" label="Steel kodas and tap crusted with white hard-water scale" />
        </div>
      </div>
    </section>
  `,
  styleUrl: './hard.css',
})
export class Hard {
  protected readonly reduced = reducedMotion();
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const pin = q('.pin')[0];

        gsap.set(q('.hard-kodas .crust'), { opacity: 0 });
        gsap.set(q('.beat-2, .beat-3'), { autoAlpha: 0, y: 30 });
        gsap.set(q('.signs li'), { autoAlpha: 0, x: -16 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: pin, start: 'top top', end: '+=240%', pin: true, scrub: 0.8 },
        });

        tl.to(q('.water-in'), { opacity: 1, duration: 0.2 }, 0)
          .fromTo(q('.water-in'), { attr: { 'stroke-dasharray': '0 40' } }, { attr: { 'stroke-dasharray': '40 0' }, duration: 0.3 }, 0)
          .to(q('.hard-kodas .crust'), { opacity: 1, duration: 1.4, stagger: 0.25 }, 0.3)
          .to(q('.rise'), { attr: { y: 0 }, duration: 2.2 }, 0.3)
          .to(pin, { backgroundColor: '#1b2340', duration: 2.4 }, 0.6)
          .to(q('.beat-1'), { autoAlpha: 0, y: -30, duration: 0.3 }, 1)
          .to(q('.beat-2'), { autoAlpha: 1, y: 0, duration: 0.3 }, 1.2)
          .to(q('.signs li'), { autoAlpha: 1, x: 0, duration: 0.25, stagger: 0.18 }, 1.3);
        moodTo(tl, q('.hard-family')[0], 'sad', 1.6, 0.8);
        tl.to(q('.hard-family .fig'), { y: 6, duration: 0.8, ease: 'power1.inOut' }, 1.6)
          .to(q('.beat-2'), { autoAlpha: 0, y: -30, duration: 0.3 }, 2.6)
          .to(q('.beat-3'), { autoAlpha: 1, y: 0, duration: 0.3 }, 2.8)
          .to({}, { duration: 0.5 });
      });
      destroyRef.onDestroy(() => mm.revert());
    });
  }
}
