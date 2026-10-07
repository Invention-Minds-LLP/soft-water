import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { Family } from '../art/family';
import { MOTION_OK, gsap } from '../motion';

@Component({
  selector: 'app-bore',
  imports: [Family],
  template: `
    <section class="bore" id="story" aria-labelledby="bore-title">
      <div class="pin">
        <div class="copy">
          <div class="beat beat-1">
            <p class="said" lang="kn">“ಮನೆ ರೆಡಿ. ಈಗ ನೀರು ಬೇಕು.”</p>
            <h2 id="bore-title">The house is ready. Now it needs water.</h2>
            <p>Like most new homes in Karnataka's growing layouts, this one depends on a borewell. The rig rolls in, the pooja is done, and the drilling begins.</p>
          </div>
          <div class="beat beat-2">
            <p class="said" lang="kn">“ಇನ್ನೂ ಕೆಳಗೆ… ಇನ್ನೂ ಕೆಳಗೆ…”</p>
            <h3>Down through red earth and granite.</h3>
            <p>Bore water rises through hard rock. On the way up it dissolves calcium and magnesium, the minerals that make water hard.</p>
          </div>
          <div class="beat beat-3">
            <p class="said said--big" lang="kn">“ನೀರು ಸಿಕ್ತು!”</p>
            <h3>Water at last.</h3>
            <p>Everyone cheers. Nobody can see what is dissolved in it yet.</p>
          </div>
        </div>
        <p class="depth" aria-hidden="true"><span class="depth-n">{{ depth() }}</span> ft</p>

        <div class="world-wrap">
          <div class="world">
            <svg viewBox="0 0 600 1200" class="ground" role="img" aria-label="A borewell rig drilling down through soil, laterite and granite to water">
              <defs>
                <pattern id="granite" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="40" height="40" fill="#5d5f63" />
                  <circle cx="7" cy="9" r="2" fill="#7c7f84" /><circle cx="27" cy="21" r="1.6" fill="#45474b" />
                  <circle cx="16" cy="33" r="1.4" fill="#8d9095" /><circle cx="34" cy="5" r="1.2" fill="#45474b" />
                </pattern>
                <pattern id="laterite" width="36" height="30" patternUnits="userSpaceOnUse">
                  <rect width="36" height="30" fill="#94321f" />
                  <ellipse cx="9" cy="10" rx="4" ry="3" fill="#7a2418" /><ellipse cx="26" cy="22" rx="5" ry="3" fill="#a8452b" />
                </pattern>
                <clipPath id="above-ground"><rect width="600" height="600" /></clipPath>
              </defs>

              <!-- above ground -->
              <rect width="600" height="600" fill="#7a2418" />
              <circle cx="150" cy="330" r="120" fill="#f2a516" opacity="0.9" />
              <!-- the house, small -->
              <g>
                <rect x="20" y="404" width="250" height="196" fill="#c6dc9a" />
                <rect x="10" y="382" width="270" height="28" fill="#94321f" />
                <rect x="112" y="490" width="66" height="110" fill="#ffc94d" />
                <path d="M100 470 L190 470 L198 486 L92 486 Z" fill="#b5482a" />
                <rect x="40" y="480" width="50" height="60" fill="#4a150e" />
                <rect x="200" y="480" width="50" height="60" fill="#4a150e" />
              </g>

              <!-- the gush: hard water, faintly cloudy -->
              <g clip-path="url(#above-ground)"><g class="gush" fill="#e8e5d8">
                <path d="M462 600 Q440 470 380 420 Q452 448 470 520 Q488 448 560 420 Q500 470 478 600 Z" opacity="0.92" />
                <path d="M466 600 Q462 420 470 330 Q478 420 474 600 Z" />
                @for (d of drops; track $index) {
                  <circle class="drop" [attr.cx]="d[0]" [attr.cy]="d[1]" [attr.r]="d[2]" />
                }
              </g></g>

              <!-- the rig: painted lorry with mast -->
              <g class="rig">
                <rect x="330" y="508" width="250" height="70" rx="6" fill="#2f6b2a" />
                <rect x="330" y="508" width="250" height="14" fill="#f2a516" />
                <rect x="330" y="560" width="250" height="8" fill="#b3122e" />
                <text x="455" y="548" text-anchor="middle" font-family="Baloo Tamma 2, sans-serif" font-weight="800" font-size="19" fill="#ffc94d" lang="kn">ಶ್ರೀ ಗಣೇಶ ಬೋರ್‌ವೆಲ್ಸ್</text>
                <path d="M520 470 L578 470 L590 508 L520 508 Z" fill="#f2a516" />
                <rect x="532" y="478" width="40" height="22" rx="3" fill="#5cc8d8" opacity="0.6" />
                <circle cx="372" cy="584" r="18" fill="#1d120d" /><circle cx="372" cy="584" r="7" fill="#8a959b" />
                <circle cx="540" cy="584" r="18" fill="#1d120d" /><circle cx="540" cy="584" r="7" fill="#8a959b" />
                <!-- mast -->
                <rect x="452" y="150" width="8" height="360" fill="#f2a516" />
                <rect x="480" y="150" width="8" height="360" fill="#f2a516" />
                @for (y of lattice; track y) {
                  <path [attr.d]="'M456 ' + y + ' L484 ' + (y + 24) + ' M484 ' + y + ' L456 ' + (y + 24)" stroke="#d98a10" stroke-width="2.5" />
                }
                <rect x="444" y="140" width="52" height="14" fill="#b3122e" />
                <path d="M470 154 V600" stroke="#3f484d" stroke-width="3" />
                <!-- kumkum + marigold from the pooja -->
                <circle cx="470" cy="600" r="16" fill="none" stroke="#f2a516" stroke-width="5" stroke-dasharray="3 5" />
              </g>

              <!-- below ground -->
              <rect y="600" width="600" height="80" fill="#5a2a14" />
              <rect y="680" width="600" height="130" fill="url(#laterite)" />
              <rect y="810" width="600" height="130" fill="#a8643a" />
              <rect y="940" width="600" height="260" fill="url(#granite)" />
              <path d="M0 680 Q150 672 300 684 T600 678 M0 810 Q160 802 300 814 T600 808 M0 940 Q140 932 300 944 T600 938" stroke="rgb(0 0 0 / 0.25)" stroke-width="3" fill="none" />
              <g class="veins" stroke="#5cc8d8" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.25">
                <path d="M0 1090 Q120 1070 230 1100 T470 1092 T600 1110" />
                <path d="M40 1140 Q180 1120 300 1136 T600 1130" />
                <path d="M240 1100 L290 1060 L340 1098" />
              </g>
              <g class="strata-labels" font-family="Hind Mysuru, sans-serif" font-size="15" fill="#fff3e6" opacity="0.85">
                <text x="20" y="646">Topsoil</text>
                <text x="20" y="752">Laterite (red earth)</text>
                <text x="20" y="880">Weathered rock</text>
                <text x="20" y="1000">Granite</text>
                <text x="20" y="1180">Water-bearing fractures</text>
              </g>

              <!-- drill string -->
              <rect class="drill" x="465" y="600" width="10" height="520" fill="#c9d0d4" />
              <path class="bit" d="M458 1112 L482 1112 L470 1136 Z" fill="#8a959b" />


            </svg>
            <app-family class="bore-family" label="The family watching the drilling" />
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './bore.css',
})
export class Bore {
  protected readonly depth = signal(0);
  protected readonly lattice = Array.from({ length: 14 }, (_, i) => 160 + i * 25);
  protected readonly drops = [
    [402, 404, 5], [430, 380, 4], [520, 386, 5], [548, 410, 4], [468, 316, 5], [492, 350, 3.5], [444, 342, 3.5], [380, 450, 3],
  ];
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const world = q('.world')[0] as HTMLElement;
        const wrap = q('.world-wrap')[0] as HTMLElement;
        const travel = () => -Math.max(0, world.offsetHeight - wrap.offsetHeight);
        const counter = { ft: 0 };

        gsap.set(q('.beat-2, .beat-3'), { autoAlpha: 0, y: 30 });
        gsap.set(q('.drill'), { scaleY: 0, transformOrigin: '50% 0%' });
        gsap.set(q('.bit'), { y: -520 });
        gsap.set(q('.gush'), { y: 300, opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: q('.pin')[0],
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(q('.rig'), { x: 260 }, { x: 0, duration: 0.6, ease: 'power2.out' }, 0)
          // descend
          .to(q('.drill'), { scaleY: 1, duration: 2 }, 0.6)
          .to(q('.bit'), { y: 0, duration: 2 }, 0.6)
          .to(world, { y: travel, duration: 2 }, 0.6)
          .to(counter, { ft: 650, duration: 2, onUpdate: () => this.depth.set(Math.round(counter.ft / 10) * 10) }, 0.6)
          .to(q('.beat-1'), { autoAlpha: 0, y: -30, duration: 0.3 }, 0.9)
          .to(q('.beat-2'), { autoAlpha: 1, y: 0, duration: 0.3 }, 1.1)
          .to(q('.veins'), { opacity: 1, duration: 0.4 }, 2.3)
          // rise and gush
          .to(world, { y: 0, duration: 1, ease: 'power2.inOut' }, 2.8)
          .to(q('.gush'), { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }, 3.4)
          .from(q('.drop'), { y: 80, opacity: 0, duration: 0.5, stagger: 0.03 }, 3.5)
          .to(q('.beat-2'), { autoAlpha: 0, y: -30, duration: 0.3 }, 3.2)
          .to(q('.beat-3'), { autoAlpha: 1, y: 0, duration: 0.3 }, 3.5)
          .to(q('.depth'), { autoAlpha: 0, duration: 0.2 }, 3.4)
          // the family jumps for joy
          .to(q('.bore-family .fig'), { y: -26, duration: 0.18, ease: 'power2.out', stagger: 0.05, yoyo: true, repeat: 3 }, 3.6)
          .to({}, { duration: 0.4 });
      });
      destroyRef.onDestroy(() => mm.revert());
    });
  }
}
