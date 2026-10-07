import { Component, input } from '@angular/core';
import type { face } from './family';

/** One face, drawn into the parent SVG. Paths carry data-happy / data-sad so scenes can tween the mood. */
@Component({
  selector: 'g[appFace]',
  host: { class: 'face' },
  template: `
    <svg:circle class="cheek" [attr.cx]="f().cheekL.x" [attr.cy]="f().cheekL.y" [attr.r]="f().cheekR_r" fill="#c4553f" opacity="0.35" />
    <svg:circle class="cheek" [attr.cx]="f().cheekR.x" [attr.cy]="f().cheekR.y" [attr.r]="f().cheekR_r" fill="#c4553f" opacity="0.35" />
    <svg:circle [attr.cx]="f().eyeL.x" [attr.cy]="f().eyeL.y" [attr.r]="f().r" fill="#1d120d" />
    <svg:circle [attr.cx]="f().eyeR.x" [attr.cy]="f().eyeR.y" [attr.r]="f().r" fill="#1d120d" />
    <svg:path class="brow" [attr.d]="sad() ? f().browL.sad : f().browL.happy" [attr.data-happy]="f().browL.happy" [attr.data-sad]="f().browL.sad" stroke="#1d120d" stroke-width="1.8" stroke-linecap="round" />
    <svg:path class="brow" [attr.d]="sad() ? f().browR.sad : f().browR.happy" [attr.data-happy]="f().browR.happy" [attr.data-sad]="f().browR.sad" stroke="#1d120d" stroke-width="1.8" stroke-linecap="round" />
    <svg:path class="mouth" [attr.d]="sad() ? f().mouth.sad : f().mouth.happy" [attr.data-happy]="f().mouth.happy" [attr.data-sad]="f().mouth.sad" stroke="#4a1a10" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <svg:circle class="tear" [attr.cx]="f().tear.x" [attr.cy]="f().tear.y" [attr.r]="f().tear.r" fill="#9fdcea" [attr.opacity]="sad() ? 1 : 0" />
  `,
})
export class FaceArt {
  readonly f = input.required<ReturnType<typeof face>>();
  readonly sad = input(false);
}
