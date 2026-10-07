import { Component, input } from '@angular/core';

/** Mango-leaf thoranam with marigold strands. Each `.sway` group hangs from its own top point so scenes can swing it. */
@Component({
  selector: 'app-thoranam',
  template: `
    <svg [attr.viewBox]="'0 0 ' + width + ' 130'" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path [attr.d]="'M0 14 Q' + width / 2 + ' 30 ' + width + ' 14'" stroke="#c99a3a" stroke-width="3" fill="none" />
      @for (x of items; track x; let i = $index) {
        <g class="sway" [attr.transform]="'translate(' + x + ' ' + sag(x) + ')'">
          @if (i % 3 === 1) {
            <g class="marigold">
              <path d="M0 0 V92" stroke="#c99a3a" stroke-width="1.5" />
              @for (y of strand; track y) {
                <circle cx="0" [attr.cy]="y" r="7.5" fill="#f2a516" />
                <circle cx="-2" [attr.cy]="y - 2" r="3.5" fill="#ffc94d" />
              }
            </g>
          } @else {
            <path d="M0 0 Q15 34 0 78 Q-15 34 0 0 Z" [attr.fill]="i % 2 ? '#2f6b2a' : '#3c8034'" />
            <path d="M0 4 V74" stroke="#1f4d1c" stroke-width="1.4" />
          }
        </g>
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
      pointer-events: none;
    }
    svg {
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .sway {
      transform-box: fill-box;
      transform-origin: 50% 0;
    }
  `,
})
export class Thoranam {
  readonly density = input(30);
  readonly span = input(1200);
  protected get width(): number {
    return this.span();
  }
  protected readonly strand = [14, 28, 42, 56, 70, 84];
  protected get items(): number[] {
    const n = this.density();
    return Array.from({ length: n }, (_, i) => Math.round(((i + 0.5) * this.width) / n));
  }
  protected sag(x: number): number {
    const t = x / this.width;
    return 14 + 32 * t * (1 - t);
  }
}
