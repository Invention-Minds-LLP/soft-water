import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { Hero } from './sections/hero';
import { Bore } from './sections/bore';
import { Hard } from './sections/hard';
import { Soft } from './sections/soft';
import { Happy } from './sections/happy';
import { Services } from './sections/services';
import { Process } from './sections/process';
import { Enquiry } from './sections/enquiry';
import { Icon } from './art/icon';
import { Thoranam } from './art/thoranam';
import { SITE, WHATSAPP_TEST_MESSAGE, whatsappLink } from './site.config';
import { MOTION_OK, ScrollTrigger, gsap, scrollToTarget, startSmoothScroll } from './motion';

@Component({
  selector: 'app-root',
  imports: [Hero, Bore, Hard, Soft, Happy, Services, Process, Enquiry, Icon, Thoranam],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly site = SITE;
  protected readonly waLink = whatsappLink(WHATSAPP_TEST_MESSAGE);
  protected readonly year = new Date().getFullYear();
  protected readonly scrolled = signal(false);
  protected readonly nav = [
    { label: 'Their story', href: '#story' },
    { label: 'How it works', href: '#how' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    startSmoothScroll();
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const fill = root.querySelector<HTMLElement>('.pipe-fill');
      const soft = document.getElementById('how');

      // the page-long pipe: its water level is your place in the story,
      // cloudy until the softener scene, clear after it
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (fill) fill.style.transform = `scaleY(${self.progress})`;
          this.scrolled.set(self.scroll() > 40);
        },
      });
      const clear = soft
        ? ScrollTrigger.create({ trigger: soft, start: 'top+=40% top', onToggle: (s) => root.classList.toggle('water-soft', s.isActive || s.progress >= 1), end: 'max' })
        : null;

      // the divider garlands swing with the speed of your scroll, then settle
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const leaves = gsap.utils.toArray<SVGGElement>('.divider .sway', root);
        const swing = leaves.map((el) => gsap.quickTo(el, 'rotation', { duration: 1.6, ease: 'elastic.out(1, 0.3)' }));
        const weights = leaves.map(() => gsap.utils.random(0.6, 1.3));
        const settle = gsap.delayedCall(0.15, () => swing.forEach((to) => to(0))).pause();
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-14, 14, self.getVelocity() / -180);
            swing.forEach((to, i) => to(v * weights[i]));
            settle.restart(true);
          },
        });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      destroyRef.onDestroy(() => {
        st.kill();
        mm.revert();
        clear?.kill();
        gsap.killTweensOf('*');
      });
    });
  }

  protected go(e: Event, href: string): void {
    e.preventDefault();
    scrollToTarget(href);
  }
}
