import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { Thoranam } from '../art/thoranam';
import { Home } from '../art/home';
import { Family } from '../art/family';
import { KodaRow } from '../art/koda-row';
import { Icon } from '../art/icon';
import { SITE, WHATSAPP_TEST_MESSAGE, whatsappLink } from '../site.config';
import { MOTION_OK, gsap, scrollToTarget } from '../motion';

@Component({
  selector: 'app-hero',
  imports: [Thoranam, Home, Family, KodaRow, Icon],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <app-thoranam class="hero-thoranam" [span]="wide ? 1800 : 1200" [density]="wide ? 46 : 30" />

      <div class="hero-copy">
        <h1 id="hero-title">
          <span class="kn" lang="kn">ಹೊಸ ಮನೆ, ಹೊಸ ನೀರು.</span>
          <span class="en">A new home deserves water as pure as the kalasha.</span>
        </h1>
        <p class="lede">
          We test your borewell water and fit the right softener or filter, so hard water never leaves its white
          mark on your taps, tiles, clothes or kodas.
        </p>
        <div class="actions">
          <a class="btn btn--whatsapp" [href]="waLink" target="_blank" rel="noopener">
            <app-icon name="whatsapp" /> Book a water test
          </a>
          <a class="btn btn--ghost" [href]="'tel:' + site.phoneDial"><app-icon name="phone" /> Call us</a>
        </div>
      </div>

      <div class="hero-stage" aria-hidden="false">
        <app-home class="stage-home" />
        <app-family class="stage-family" label="The family at the door of their new home, smiling" />
        <app-koda-row class="stage-kodas" [tap]="false" label="Shining steel kodas and a copper kalasha placed at the threshold" />
      </div>

      <a class="scroll-cue" href="#story" (click)="go($event)">
        <span>Watch their story</span>
        <app-icon name="arrow" />
      </a>
    </section>
  `,
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly site = SITE;
  protected readonly wide = typeof window !== 'undefined' && window.innerWidth > 900;
  protected readonly waLink = whatsappLink(WHATSAPP_TEST_MESSAGE);
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
          .from(q('.hero-thoranam .sway'), { rotation: () => gsap.utils.random(-28, 28), duration: 2.4, ease: 'elastic.out(1, 0.35)', stagger: 0.025 }, 0)
          .from(q('.sun'), { y: 140, duration: 1.8 }, 0.1)
          .from(q('.hero-copy > *'), { y: 28, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.15)
          .from(q('.stage-family .fig'), { y: 40, opacity: 0, duration: 1, stagger: 0.09 }, 0.45)
          .from(q('.stage-kodas .vessel'), { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.6)
          .fromTo(q('.stage-kodas .shine'), { x: 0 }, { x: 260, duration: 1.6, ease: 'power2.inOut', stagger: 0.12 }, 1.1);

        // a breeze through the thoranam, now and then
        gsap.to(q('.hero-thoranam .sway'), {
          rotation: 'random(-6, 6)',
          duration: 'random(2.2, 3.4)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          delay: 2.2,
          stagger: { each: 0.04, from: 'center' },
        });

        // as you scroll away, the house settles back and the copy lifts
        gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true } })
          .to(q('.hero-copy'), { y: -80, opacity: 0.2, ease: 'none' }, 0)
          .to(q('.stage-home'), { y: 60, ease: 'none' }, 0)
          .to(q('.sun'), { y: 120, ease: 'none' }, 0);
      });
      destroyRef.onDestroy(() => mm.revert());
    });
  }

  protected go(e: Event): void {
    e.preventDefault();
    scrollToTarget('#story');
  }
}
