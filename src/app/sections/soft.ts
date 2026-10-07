import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { MOTION_OK, gsap } from '../motion';
import { SoftenerSim } from './softener-sim';

@Component({
  selector: 'app-soft',
  template: `
    <section class="soft" id="how" aria-labelledby="soft-title">
      <div class="pin">
        <div class="copy">
          <p class="words" aria-hidden="true">
            <span class="w-hard" lang="kn">ಗಡಸು</span>
            <span class="w-soft" lang="kn">ಮೃದು</span>
          </p>
          <div class="beats">
            <div class="beat beat-1">
              <p class="said" lang="kn">“ನಮಸ್ಕಾರ! ಮೊದಲು ನಿಮ್ಮ ನೀರನ್ನು ಪರೀಕ್ಷೆ ಮಾಡೋಣ.”</p>
              <h2 id="soft-title">Then Soft Water Technologies came home.</h2>
              <p>First we test the water. Then we explain what the results mean and which system this borewell needs. No guessing, no one-size-fits-all.</p>
            </div>
            <div class="beat beat-2">
              <h3>Inside the softener</h3>
              <p>Hard water flows through a tank of resin beads. The beads hold on to calcium and magnesium, the minerals that leave scale, and release sodium in their place. What comes out is soft water.</p>
              <ul class="legend">
                <li><span class="dot dot-hard"></span>Calcium &amp; magnesium (hardness)</li>
                <li><span class="dot dot-bead"></span>Resin beads</li>
                <li><span class="dot dot-soft"></span>Soft water</li>
              </ul>
            </div>
            <div class="beat beat-3">
              <h3>And it cleans itself.</h3>
              <p>Every so often the softener rinses its beads with salt water (brine). The trapped hardness washes down the drain and the beads are ready again. You just keep the salt topped up.</p>
            </div>
          </div>
        </div>
        <div class="sim">
          <canvas aria-label="Animation: hard water flecks entering a softener tank, sticking to resin beads, and soft water flowing out" role="img"></canvas>
          <p class="hint">Move your finger or mouse through the water</p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './soft.css',
})
export class Soft {
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const q = gsap.utils.selector(root);
      const canvas = q('canvas')[0] as HTMLCanvasElement;
      const sim = new SoftenerSim(canvas);
      sim.resize();
      const ro = new ResizeObserver(() => sim.resize());
      ro.observe(canvas);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const io = new IntersectionObserver(([e]) => (e.isIntersecting ? sim.start() : sim.stop()), { rootMargin: '100px' });
        io.observe(canvas);

        gsap.set(q('.beat-2, .beat-3'), { autoAlpha: 0, y: 30 });
        gsap.set(q('.w-soft'), { autoAlpha: 0, filter: 'blur(14px)', scale: 1.1 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('.pin')[0], start: 'top top', end: '+=260%', pin: true, scrub: 0.8 },
        });
        tl.fromTo(q('.pin'), { backgroundColor: '#1b2340' }, { backgroundColor: '#0c3a45', duration: 3 }, 0)
          .to(sim, { flow: 1, duration: 1.2 }, 0.6)
          .to(q('.beat-1'), { autoAlpha: 0, y: -30, duration: 0.3 }, 0.8)
          .to(q('.beat-2'), { autoAlpha: 1, y: 0, duration: 0.3 }, 1)
          .to(q('.w-hard'), { autoAlpha: 0, filter: 'blur(14px)', scale: 0.9, duration: 0.8 }, 1.4)
          .to(q('.w-soft'), { autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 0.8 }, 1.6)
          .to(q('.beat-2'), { autoAlpha: 0, y: -30, duration: 0.3 }, 2.2)
          .to(q('.beat-3'), { autoAlpha: 1, y: 0, duration: 0.3 }, 2.4)
          .to(sim, { regen: 1, flow: 0.4, duration: 0.3 }, 2.4)
          .to(sim, { regen: 0, flow: 0.8, duration: 0.3 }, 3.1)
          .to({}, { duration: 0.3 });
        return () => io.disconnect();
      });
      mm.add('(prefers-reduced-motion: reduce)', () => sim.drawStill());

      destroyRef.onDestroy(() => {
        mm.revert();
        ro.disconnect();
        sim.destroy();
      });
    });
  }
}
