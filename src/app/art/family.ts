import { Component, computed, input } from '@angular/core';
import { FaceArt } from './face';

interface Face {
  cx: number;
  cy: number;
  s: number;
}

/** Builds the happy and sad versions of one face. Both share the same path commands, so GSAP can tween between them. */
export function face({ cx, cy, s }: Face) {
  const p = (x: number, y: number) => `${(cx + x * s).toFixed(1)} ${(cy + y * s).toFixed(1)}`;
  return {
    eyeL: { x: cx - 6.5 * s, y: cy - 1.5 * s },
    eyeR: { x: cx + 6.5 * s, y: cy - 1.5 * s },
    r: 2.1 * s,
    mouth: {
      happy: `M${p(-6, 9)} Q${p(0, 15)} ${p(6, 9)}`,
      sad: `M${p(-5, 12)} Q${p(0, 7.5)} ${p(5, 12)}`,
    },
    browL: {
      happy: `M${p(-10, -7)} L${p(-3, -8.5)}`,
      sad: `M${p(-10, -6)} L${p(-3, -10.5)}`,
    },
    browR: {
      happy: `M${p(3, -8.5)} L${p(10, -7)}`,
      sad: `M${p(3, -10.5)} L${p(10, -6)}`,
    },
    tear: { x: cx + 7.5 * s, y: cy + 4 * s, r: 1.8 * s },
    cheekL: { x: cx - 10 * s, y: cy + 5 * s },
    cheekR: { x: cx + 10 * s, y: cy + 5 * s },
    cheekR_r: 3.4 * s,
  };
}

/**
 * The family: Appa, Amma, their daughter and Ajji.
 * `mood` sets the starting expression; scenes tween `.mouth`, `.brow` and `.tear`
 * between the data-happy and data-sad paths.
 */
@Component({
  selector: 'app-family',
  template: `
    <svg
      viewBox="0 0 400 262"
      role="img"
      [attr.aria-label]="label()"
      class="family"
      [class.is-sad]="mood() === 'sad'"
    >
      <defs>
        <pattern id="appa-check" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#5b8cc0" />
          <path d="M0 0H8M0 4H8M0 0V8M4 0V8" stroke="#4673a3" stroke-width="1.2" />
        </pattern>
      </defs>

      <ellipse cx="200" cy="252" rx="190" ry="8" fill="rgb(0 0 0 / 0.22)" />

      <!-- Appa -->
      <g class="fig fig-appa">
        <path d="M46 140 L94 140 L99 244 L41 244 Z" fill="#f6f1e7" />
        <path d="M41 236 L99 236 L99 244 L41 244 Z" fill="#d9a521" />
        <path d="M70 140 L70 244" stroke="#e2dbcd" stroke-width="2" />
        <ellipse cx="57" cy="246" rx="10" ry="4.5" fill="#5a3320" />
        <ellipse cx="84" cy="246" rx="10" ry="4.5" fill="#5a3320" />
        <path d="M42 84 Q70 72 98 84 L100 146 L40 146 Z" fill="url(#appa-check)" />
        <path class="arm arm-l" d="M45 90 L35 138" stroke="#5b8cc0" stroke-width="13" stroke-linecap="round" fill="none" />
        <path class="arm arm-r" d="M95 90 L105 138" stroke="#5b8cc0" stroke-width="13" stroke-linecap="round" fill="none" />
        <circle cx="34" cy="143" r="6.5" fill="#8d5a3a" />
        <circle cx="106" cy="143" r="6.5" fill="#8d5a3a" />
        <rect x="63" y="68" width="14" height="14" rx="5" fill="#7b4c30" />
        <circle cx="70" cy="54" r="21" fill="#8d5a3a" />
        <path d="M49 52 Q50 30 70 30 Q90 30 91 52 Q86 40 70 40 Q55 40 49 52 Z" fill="#1d120d" />
        <path d="M61 63 Q70 58.5 79 63 Q70 66.5 61 63 Z" fill="#1d120d" />
        <g appFace [f]="faces[0]" [sad]="sad()"></g>
      </g>

      <!-- Amma -->
      <g class="fig fig-amma">
        <path d="M134 146 Q160 138 186 146 L194 244 L126 244 Z" fill="#2f6b2a" />
        <path d="M126 234 L194 234 L194 244 L126 244 Z" fill="#f2a516" />
        <path d="M150 150 L146 244 M162 150 L162 244 M174 150 L178 244" stroke="#245622" stroke-width="2" />
        <ellipse cx="149" cy="246" rx="9" ry="4" fill="#5a3320" />
        <ellipse cx="172" cy="246" rx="9" ry="4" fill="#5a3320" />
        <path d="M138 94 Q160 86 182 94 L184 136 L136 136 Z" fill="#b3122e" />
        <path class="arm arm-l" d="M139 98 L129 140" stroke="#8d5a3a" stroke-width="10" stroke-linecap="round" fill="none" />
        <path class="arm arm-r" d="M181 98 L191 140" stroke="#8d5a3a" stroke-width="10" stroke-linecap="round" fill="none" />
        <circle cx="128" cy="143" r="5.5" fill="#8d5a3a" />
        <circle cx="192" cy="143" r="5.5" fill="#8d5a3a" />
        <path d="M172 90 L186 98 L180 162 L136 150 Q156 128 172 90 Z" fill="#3a7f33" />
        <path d="M172 90 L186 98 L180 162" stroke="#f2a516" stroke-width="4" fill="none" stroke-linejoin="round" />
        <rect x="154" y="80" width="12" height="12" rx="5" fill="#7b4c30" />
        <circle cx="179" cy="56" r="10" fill="#1d120d" />
        <g fill="#fffaf0">
          <circle cx="186" cy="50" r="2.4" />
          <circle cx="189" cy="56" r="2.4" />
          <circle cx="187" cy="62" r="2.4" />
          <circle cx="182" cy="66" r="2.4" />
        </g>
        <circle cx="160" cy="68" r="18.5" fill="#8d5a3a" />
        <path d="M141.5 66 Q142 48 160 48 Q178 48 178.5 66 Q172 56 160 55 Q148 56 141.5 66 Z" fill="#1d120d" />
        <circle cx="160" cy="58.5" r="2" fill="#b3122e" />
        <g appFace [f]="faces[1]" [sad]="sad()"></g>
      </g>

      <!-- Magalu (daughter) -->
      <g class="fig fig-girl">
        <path d="M226 174 L264 174 L272 244 L218 244 Z" fill="#ffc94d" />
        <path d="M218 235 L272 235 L272 244 L218 244 Z" fill="#b3122e" />
        <ellipse cx="236" cy="246" rx="7" ry="3.5" fill="#5a3320" />
        <ellipse cx="254" cy="246" rx="7" ry="3.5" fill="#5a3320" />
        <path d="M229 150 Q245 144 261 150 L263 178 L227 178 Z" fill="#2f6b2a" />
        <path class="arm arm-l" d="M230 154 L222 182" stroke="#8d5a3a" stroke-width="8" stroke-linecap="round" fill="none" />
        <path class="arm arm-r" d="M260 154 L268 182" stroke="#8d5a3a" stroke-width="8" stroke-linecap="round" fill="none" />
        <path d="M230 128 Q226 150 230 166" stroke="#1d120d" stroke-width="5" stroke-linecap="round" fill="none" />
        <path d="M260 128 Q264 150 260 166" stroke="#1d120d" stroke-width="5" stroke-linecap="round" fill="none" />
        <circle cx="230" cy="167" r="3" fill="#f2a516" />
        <circle cx="260" cy="167" r="3" fill="#f2a516" />
        <circle cx="245" cy="132" r="16" fill="#8d5a3a" />
        <path d="M229 130 Q230 114 245 114 Q260 114 261 130 Q255 121 245 121 Q235 121 229 130 Z" fill="#1d120d" />
        <circle cx="258" cy="118" r="3.2" fill="#fffaf0" />
        <circle cx="245" cy="124.5" r="1.6" fill="#b3122e" />
        <g appFace [f]="faces[2]" [sad]="sad()"></g>
      </g>

      <!-- Ajji (grandmother) -->
      <g class="fig fig-ajji">
        <g transform="rotate(-3 325 244)">
          <path d="M300 150 Q325 142 350 150 L356 244 L294 244 Z" fill="#7a1a2c" />
          <path d="M294 235 L356 235 L356 244 L294 244 Z" fill="#f2a516" />
          <ellipse cx="314" cy="246" rx="8" ry="4" fill="#5a3320" />
          <ellipse cx="336" cy="246" rx="8" ry="4" fill="#5a3320" />
          <path d="M303 104 Q325 96 347 104 L350 152 L300 152 Z" fill="#5d1322" />
          <path d="M339 100 L352 108 L348 170 L304 156 Q324 136 339 100 Z" fill="#8e2236" />
          <path d="M339 100 L352 108 L348 170" stroke="#f2a516" stroke-width="3.5" fill="none" />
          <path class="arm arm-l" d="M305 108 L296 150" stroke="#8d5a3a" stroke-width="9" stroke-linecap="round" fill="none" />
          <circle cx="295" cy="154" r="5" fill="#8d5a3a" />
          <rect x="319" y="90" width="12" height="12" rx="5" fill="#7b4c30" />
          <circle cx="342" cy="68" r="9" fill="#e9e6df" />
          <circle cx="325" cy="78" r="18" fill="#8d5a3a" />
          <path d="M306.5 76 Q307 58 325 58 Q343 58 343.5 76 Q337 66 325 65 Q313 66 306.5 76 Z" fill="#e9e6df" />
          <g fill="none" stroke="#3a2a22" stroke-width="1.6">
            <circle cx="318.5" cy="76.5" r="5" />
            <circle cx="331.5" cy="76.5" r="5" />
            <path d="M323.5 76.5 H326.5" />
          </g>
          <g appFace [f]="faces[3]" [sad]="sad()"></g>
        </g>
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
  imports: [FaceArt],
})
export class Family {
  readonly mood = input<'happy' | 'sad'>('happy');
  readonly label = input('Appa, Amma, their daughter and Ajji');
  protected readonly sad = computed(() => this.mood() === 'sad');
  protected readonly faces = [
    face({ cx: 70, cy: 55, s: 1 }),
    face({ cx: 160, cy: 69, s: 0.9 }),
    face({ cx: 245, cy: 133, s: 0.8 }),
    face({ cx: 325, cy: 79, s: 0.85 }),
  ];
}
