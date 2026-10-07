import { Component, input } from '@angular/core';

/** The family's new house: flat-roof RCC home with a Mangalore-tile sunshade, nameplate and a coconut palm. */
@Component({
  selector: 'app-home',
  template: `
    <svg viewBox="0 0 1200 560" role="img" aria-label="The family's new house" class="home" preserveAspectRatio="xMidYMax meet">
      <!-- morning sun -->
      <circle class="sun" cx="600" cy="250" r="230" fill="#f2a516" />
      <circle cx="600" cy="250" r="230" fill="none" stroke="#ffc94d" stroke-width="2" stroke-dasharray="2 14" opacity="0.7" />

      <!-- coconut palm -->
      <g class="palm">
        <path d="M188 560 Q170 420 214 250 Q222 220 236 196" stroke="#6b4a2c" stroke-width="20" fill="none" stroke-linecap="round" />
        @for (r of ringYs; track r) {
          <path [attr.d]="'M' + (174 + (560 - r) * 0.12) + ' ' + r + ' h26'" stroke="#57391f" stroke-width="2.5" />
        }
        <g transform="translate(236 196)" fill="#2f6b2a">
          @for (a of frondAngles; track a) {
            <path [attr.transform]="'rotate(' + a + ')'" d="M0 0 Q70 -36 150 6 Q72 -14 0 6 Z" />
          }
          <circle cx="-8" cy="12" r="10" fill="#7a5a1c" />
          <circle cx="8" cy="14" r="10" fill="#8a6a22" />
        </g>
      </g>

      <!-- house -->
      <g class="house">
        <rect x="330" y="168" width="540" height="372" fill="#c6dc9a" />
        <rect x="330" y="168" width="24" height="372" fill="#b3cc85" />
        <rect x="846" y="168" width="24" height="372" fill="#b3cc85" />
        <!-- parapet with jali -->
        <rect x="312" y="128" width="576" height="48" fill="#94321f" />
        @for (x of jali; track x) {
          <rect [attr.x]="x" y="140" width="22" height="22" rx="3" fill="#7a2418" />
        }
        <rect x="304" y="168" width="592" height="10" fill="#c2573c" />

        <!-- nameplate -->
        <rect x="532" y="196" width="136" height="40" rx="6" fill="#4a150e" />
        <text x="600" y="223" text-anchor="middle" font-family="Baloo Tamma 2, sans-serif" font-weight="700" font-size="21" fill="#ffc94d" lang="kn">ಶ್ರೀ ನಿಲಯ</text>

        <!-- Mangalore tile sunshade -->
        <path d="M468 262 L732 262 L752 296 L448 296 Z" fill="#b5482a" />
        @for (x of tiles; track x) {
          <path [attr.d]="'M' + x + ' 262 L' + (x - 6) + ' 296'" stroke="#8e321c" stroke-width="2" />
        }
        <path d="M448 296 Q458 304 468 296 Q478 304 488 296 Q498 304 508 296 Q518 304 528 296 Q538 304 548 296 Q558 304 568 296 Q578 304 588 296 Q598 304 608 296 Q618 304 628 296 Q638 304 648 296 Q658 304 668 296 Q678 304 688 296 Q698 304 708 296 Q718 304 728 296 Q738 304 752 296" fill="#8e321c" />

        <!-- doorway, glowing -->
        <rect x="528" y="316" width="144" height="224" fill="#6b3a1c" />
        <rect class="door-glow" x="542" y="330" width="116" height="210" fill="#ffc94d" />
        <path d="M542 330 L584 340 L584 540 L542 540 Z" fill="#7d4524" />
        <path d="M658 330 L616 340 L616 540 L658 540 Z" fill="#7d4524" />
        <circle cx="578" cy="440" r="4" fill="#f2c218" />
        <circle cx="622" cy="440" r="4" fill="#f2c218" />
        <!-- mini thoranam on the door -->
        @for (x of doorLeaves; track x; let i = $index) {
          <path [attr.transform]="'translate(' + x + ' 318)'" d="M0 0 Q6 14 0 30 Q-6 14 0 0 Z" [attr.fill]="i % 3 === 1 ? '#f2a516' : '#2f6b2a'" />
        }

        <!-- windows -->
        @for (wx of windows; track wx) {
          <rect [attr.x]="wx" y="330" width="104" height="120" fill="#4a150e" />
          <rect [attr.x]="wx + 8" y="338" width="88" height="104" fill="#5cc8d8" opacity="0.35" />
          @for (gx of [22, 44, 66]; track gx) {
            <rect [attr.x]="wx + gx + 6" y="338" width="3" height="104" fill="#3f484d" />
          }
          <rect [attr.x]="wx - 8" y="450" width="120" height="10" fill="#c2573c" />
          <rect [attr.x]="wx - 8" y="318" width="120" height="12" fill="#c2573c" />
        }

        <!-- steps -->
        <rect x="508" y="540" width="184" height="10" fill="#c2573c" />
        <rect x="488" y="550" width="224" height="10" fill="#a33b25" />
      </g>
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }
    svg {
      width: 100%;
      height: auto;
      overflow: visible;
    }
  `,
})
export class Home {
  readonly label = input('');
  protected readonly ringYs = [520, 480, 440, 400, 360, 320, 280];
  protected readonly frondAngles = [-170, -140, -110, -70, -40, -10, 20, 160];
  protected readonly jali = Array.from({ length: 16 }, (_, i) => 330 + i * 34);
  protected readonly tiles = Array.from({ length: 21 }, (_, i) => 480 + i * 12.5);
  protected readonly doorLeaves = Array.from({ length: 13 }, (_, i) => 534 + i * 11);
  protected readonly windows = [376, 720];
}
