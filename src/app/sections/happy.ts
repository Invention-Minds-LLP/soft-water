import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { Family } from '../art/family';
import { KodaRow } from '../art/koda-row';
import { Thoranam } from '../art/thoranam';
import { Icon } from '../art/icon';
import { MOTION_OK, gsap, moodTo, reducedMotion } from '../motion';
import { WHATSAPP_TEST_MESSAGE, whatsappLink } from '../site.config';

@Component({
  selector: 'app-happy',
  imports: [Family, KodaRow, Thoranam, Icon],
  template: `
    <section class="happy" aria-labelledby="happy-title">
      <div class="pin">
        <app-thoranam class="happy-thoranam" [density]="24" />
        <div class="copy">
          <p class="said" lang="kn">“ಈಗ ಎಲ್ಲರ ಮುಖದಲ್ಲೂ ನಗು!”</p>
          <h2 id="happy-title">Shining steel. Soft clothes. Sweet water.</h2>
          <p class="body">Ajji's kodas shine again. The tiles stay clean, clothes come out soft and the geyser stops clogging. The new home finally feels new.</p>
          <a class="btn btn-dark" [href]="waLink" target="_blank" rel="noopener"><app-icon name="whatsapp" /> Get your water tested</a>
        </div>
        <div class="stage">
          <app-family class="happy-family" [mood]="startMood" label="The family, happy again" />
          <app-koda-row class="happy-kodas" [crusted]="!reduced" label="Steel kodas polished clean, shining" />
        </div>
      </div>
    </section>
  `,
  styleUrl: './happy.css',
})
export class Happy {
  protected readonly waLink = whatsappLink(WHATSAPP_TEST_MESSAGE);
  protected readonly reduced = reducedMotion();
  protected readonly startMood = this.reduced ? 'happy' : 'sad';
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const pin = q('.pin')[0];
        gsap.set(q('.copy > *'), { autoAlpha: 0, y: 30 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: pin, start: 'top top', end: '+=180%', pin: true, scrub: 0.8 },
        });
        tl.fromTo(pin, { backgroundColor: '#0c3a45' }, { backgroundColor: '#f2a516', duration: 1.4 }, 0)
          .from(q('.happy-thoranam .sway'), { y: -140, duration: 0.8, stagger: 0.02, ease: 'power2.out' }, 0.2)
          // wipe the scale away, vessel by vessel, then polish
          .to(q('.happy-kodas .crust'), { opacity: 0, duration: 0.6, stagger: 0.18 }, 0.4)
          .fromTo(q('.happy-kodas .shine'), { x: 0 }, { x: 260, duration: 0.7, stagger: 0.15, ease: 'power2.inOut' }, 1)
          .to(q('.copy > *'), { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.12 }, 0.9);
        moodTo(tl, q('.happy-family')[0], 'happy', 0.9, 0.5);
        tl.to(q('.happy-family .fig'), { y: -22, duration: 0.15, ease: 'power2.out', stagger: 0.05, yoyo: true, repeat: 3 }, 1.4)
          .to({}, { duration: 0.6 });
      });
      destroyRef.onDestroy(() => mm.revert());
    });
  }
}
