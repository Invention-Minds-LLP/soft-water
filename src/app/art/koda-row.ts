import { Component, input } from '@angular/core';

let nextId = 0;

/**
 * The water corner: two steel kodas, a copper kalasha and a steel chombu on a red-oxide ledge.
 * Scenes animate `.crust` (hard-water scale), `.shine` (polish sweep) and `.water-in` (fill).
 * `crusted` sets the static state used without animation.
 */
@Component({
  selector: 'app-koda-row',
  template: `
    <svg viewBox="0 0 640 300" role="img" [attr.aria-label]="label()" class="koda-row" [class.is-crusted]="crusted()">
      <defs>
        <linearGradient [attr.id]="id + 'steel'" x1="0" x2="1">
          <stop offset="0" stop-color="#5d686e" />
          <stop offset="0.18" stop-color="#b9c2c7" />
          <stop offset="0.34" stop-color="#ffffff" />
          <stop offset="0.46" stop-color="#d7dde0" />
          <stop offset="0.72" stop-color="#8f9aa0" />
          <stop offset="0.9" stop-color="#c3cbcf" />
          <stop offset="1" stop-color="#4b555b" />
        </linearGradient>
        <linearGradient [attr.id]="id + 'copper'" x1="0" x2="1">
          <stop offset="0" stop-color="#6b2f16" />
          <stop offset="0.25" stop-color="#c7743f" />
          <stop offset="0.38" stop-color="#ffd0a6" />
          <stop offset="0.55" stop-color="#d07c46" />
          <stop offset="0.85" stop-color="#8a3d1c" />
          <stop offset="1" stop-color="#5a240f" />
        </linearGradient>
        <linearGradient [attr.id]="id + 'ledge'" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#a33b25" />
          <stop offset="0.12" stop-color="#7a2418" />
          <stop offset="1" stop-color="#4a150e" />
        </linearGradient>
        <filter [attr.id]="id + 'chalk'" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feComposite in="d" in2="n" operator="arithmetic" k1="0" k2="1" k3="-0.25" k4="0" />
        </filter>
        <path [attr.id]="id + 'koda'" d="M-21 -172 L21 -172 L25 -164 L15 -152 Q13 -141 31 -128 Q72 -101 72 -56 Q72 -10 40 -2 L-40 -2 Q-72 -10 -72 -56 Q-72 -101 -31 -128 Q-13 -141 -15 -152 L-25 -164 Z" />
        <path [attr.id]="id + 'chombu'" d="M-17 -88 L17 -88 L20 -82 L12 -74 Q11 -68 24 -60 Q44 -46 44 -26 Q44 -4 24 -1 L-24 -1 Q-44 -4 -44 -26 Q-44 -46 -24 -60 Q-11 -68 -12 -74 L-20 -82 Z" />
        <clipPath [attr.id]="id + 'clipA'"><use [attr.href]="'#' + id + 'koda'" /></clipPath>
        <clipPath [attr.id]="id + 'clipC'"><use [attr.href]="'#' + id + 'chombu'" /></clipPath>
      </defs>

      <!-- ledge -->
      <rect x="0" y="252" width="640" height="48" [attr.fill]="'url(#' + id + 'ledge)'" />
      <rect x="0" y="252" width="640" height="3" fill="#c2573c" opacity="0.6" />
      <ellipse cx="320" cy="256" rx="300" ry="6" fill="rgb(0 0 0 / 0.25)" />

      <!-- big steel koda -->
      <g class="vessel vessel-a" transform="translate(150 254) scale(1.12)">
        <use [attr.href]="'#' + id + 'koda'" [attr.fill]="'url(#' + id + 'steel)'" />
        <g [attr.clip-path]="'url(#' + id + 'clipA)'">
          <rect class="shine" x="-120" y="-180" width="26" height="190" fill="#fff" opacity="0.55" transform="skewX(-18)" />
          <g class="crust" [attr.filter]="'url(#' + id + 'chalk)'" [attr.opacity]="crusted() ? 1 : 0">
            <path d="M-72 -40 Q0 -26 72 -40" stroke="#f1eee3" stroke-width="7" fill="none" />
            <path d="M-72 -70 Q0 -56 72 -70" stroke="#ebe7da" stroke-width="5" fill="none" />
            <path d="M-60 -98 Q0 -86 60 -98" stroke="#f1eee3" stroke-width="4" fill="none" />
            <path d="M-72 -18 Q0 -6 72 -18 L72 0 L-72 0 Z" fill="#e6e2d3" />
            <g fill="#f4f1e8">
              <circle cx="-40" cy="-50" r="4" /><circle cx="-12" cy="-30" r="3" /><circle cx="22" cy="-58" r="5" />
              <circle cx="46" cy="-28" r="3.5" /><circle cx="-52" cy="-84" r="3" /><circle cx="8" cy="-80" r="2.5" />
              <circle cx="38" cy="-90" r="3" /><circle cx="-26" cy="-110" r="2.5" />
            </g>
          </g>
        </g>
      </g>

      <!-- copper kalasha with mango leaves and coconut -->
      <g class="vessel vessel-k" transform="translate(330 254) scale(0.9)">
        <g class="leaves">
          @for (a of leafAngles; track a) {
            <path [attr.transform]="'translate(0 -176) rotate(' + a + ')'" d="M0 0 Q12 -30 0 -66 Q-12 -30 0 0 Z" fill="#2f6b2a" stroke="#1f4d1c" stroke-width="1.5" />
          }
        </g>
        <ellipse cx="0" cy="-196" rx="24" ry="30" fill="#7a4a24" />
        <path d="M-14 -214 Q0 -230 14 -214" stroke="#5a3418" stroke-width="3" fill="none" />
        <path d="M-20 -200 Q0 -210 20 -200 M-22 -186 Q0 -196 22 -186" stroke="#94643a" stroke-width="1.5" fill="none" />
        <use [attr.href]="'#' + id + 'koda'" [attr.fill]="'url(#' + id + 'copper)'" />
        <path d="M-60 -60 Q0 -48 60 -60" stroke="#f2a516" stroke-width="3" fill="none" opacity="0.8" />
        <circle cx="-16" cy="-86" r="5" fill="#f2c218" />
        <circle cx="0" cy="-90" r="5" fill="#b3122e" />
        <circle cx="16" cy="-86" r="5" fill="#f2c218" />
      </g>

      <!-- medium steel koda -->
      <g class="vessel vessel-b" transform="translate(480 254) scale(0.86)">
        <use [attr.href]="'#' + id + 'koda'" [attr.fill]="'url(#' + id + 'steel)'" />
        <g [attr.clip-path]="'url(#' + id + 'clipA)'">
          <rect class="shine" x="-120" y="-180" width="26" height="190" fill="#fff" opacity="0.55" transform="skewX(-18)" />
          <g class="crust" [attr.filter]="'url(#' + id + 'chalk)'" [attr.opacity]="crusted() ? 1 : 0">
            <path d="M-72 -46 Q0 -32 72 -46" stroke="#f1eee3" stroke-width="7" fill="none" />
            <path d="M-72 -78 Q0 -64 72 -78" stroke="#ebe7da" stroke-width="5" fill="none" />
            <path d="M-72 -16 Q0 -4 72 -16 L72 0 L-72 0 Z" fill="#e6e2d3" />
            <g fill="#f4f1e8">
              <circle cx="-30" cy="-60" r="4" /><circle cx="18" cy="-36" r="3" /><circle cx="40" cy="-70" r="3.5" /><circle cx="-48" cy="-30" r="3" />
            </g>
          </g>
        </g>
      </g>

      <!-- chombu -->
      <g class="vessel vessel-c" transform="translate(588 254)">
        <use [attr.href]="'#' + id + 'chombu'" [attr.fill]="'url(#' + id + 'steel)'" />
        <g [attr.clip-path]="'url(#' + id + 'clipC)'">
          <rect class="shine" x="-80" y="-100" width="16" height="110" fill="#fff" opacity="0.55" transform="skewX(-18)" />
          <g class="crust" [attr.filter]="'url(#' + id + 'chalk)'" [attr.opacity]="crusted() ? 1 : 0">
            <path d="M-44 -24 Q0 -14 44 -24" stroke="#f1eee3" stroke-width="5" fill="none" />
            <path d="M-44 -10 Q0 0 44 -10 L44 0 L-44 0 Z" fill="#e6e2d3" />
            <circle cx="-14" cy="-40" r="3" fill="#f4f1e8" /><circle cx="18" cy="-46" r="2.5" fill="#f4f1e8" />
          </g>
        </g>
      </g>

      @if (tap()) {
      <g class="tap" transform="translate(104 10)">
        <rect x="-104" y="-10" width="116" height="16" rx="4" fill="#9aa4a9" />
        <path d="M10 -2 H36 Q46 -2 46 8 V18" stroke="#c9d0d4" stroke-width="12" fill="none" stroke-linecap="round" />
        <rect x="18" y="-22" width="12" height="14" rx="3" fill="#8a959b" />
        <g class="crust" [attr.filter]="'url(#' + id + 'chalk)'" [attr.opacity]="crusted() ? 1 : 0">
          <path d="M40 10 Q46 22 52 12" stroke="#f1eee3" stroke-width="5" fill="none" />
          <circle cx="46" cy="22" r="4" fill="#f1eee3" />
        </g>
        <path class="water-in" d="M46 24 V54" stroke="#bfeef3" stroke-width="5" stroke-linecap="round" opacity="0" />
      </g>
      }
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
export class KodaRow {
  readonly crusted = input(false);
  readonly tap = input(true);
  readonly label = input('Steel kodas, a copper kalasha and a chombu on a red-oxide ledge');
  protected readonly id = `kr${nextId++}-`;
  protected readonly leafAngles = [-62, -40, -18, 0, 18, 40, 62];
}
