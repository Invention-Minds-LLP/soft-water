import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { MOTION_OK, gsap } from '../motion';

@Component({
  selector: 'app-process',
  template: `
    <section class="process" aria-labelledby="process-title">
      <h2 id="process-title">From the first call to <span lang="kn">ಮೃದು</span> water.</h2>
      <div class="run">
        <div class="pipe" aria-hidden="true"><div class="fill"></div></div>
        <span class="sr-only">Four steps:</span>
        <ol class="steps">
          @for (s of steps; track s.title; let i = $index) {
            <li class="step">
              <svg class="valve" viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="19" />
                <path d="M24 5v38M5 24h38M10.6 10.6l26.8 26.8M37.4 10.6 10.6 37.4" />
                <circle cx="24" cy="24" r="9" class="hub" />
                <text x="24" y="28.5" text-anchor="middle" class="hub-n">{{ i + 1 }}</text>
              </svg>
              <span class="branch" aria-hidden="true"><span class="branch-fill"></span></span>
              <h3>{{ s.title }}</h3>
              <p class="kn" lang="kn">{{ s.kn }}</p>
              <p class="text">{{ s.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styleUrl: './process.css',
})
export class Process {
  protected readonly steps = [
    { title: 'Water test', kn: 'ನೀರಿನ ಪರೀಕ್ಷೆ', text: 'We check your water before recommending anything, so you only pay for what your borewell needs.' },
    { title: 'Consultation', kn: 'ಸಲಹೆ', text: 'We explain the results in plain words and suggest the right system and size for your family.' },
    { title: 'Installation', kn: 'ಅಳವಡಿಕೆ', text: 'Our team fits it neatly at your inlet or overhead tank and shows you how it works.' },
    { title: 'Maintenance', kn: 'ನಿರ್ವಹಣೆ', text: 'Servicing, salt refills and regular checks keep the water soft year after year.' },
  ];
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('.run')[0], start: 'top 80%', end: 'bottom 88%', scrub: 0.6 },
        });
        tl.fromTo(q('.fill'), { scaleY: 0 }, { scaleY: 1, duration: 4 }, 0);
        q('.step').forEach((step, i) => {
          tl.fromTo(step.querySelector('.branch-fill'), { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, i * 0.95)
            .from(step.querySelectorAll(':scope > :not(.valve):not(.branch)'), { y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, i * 0.95)
            .fromTo(step.querySelector('.valve'), { rotation: -120 }, { rotation: 0, duration: 0.8, ease: 'power2.out' }, i * 0.95)
            .to(step.querySelector('.hub'), { fill: '#5cc8d8', duration: 0.3 }, i * 0.95 + 0.5);
        });
      });
      destroyRef.onDestroy(() => mm.revert());
    });
  }
}
