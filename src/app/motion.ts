import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export function reducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let lenis: Lenis | null = null;

/** Smooth scroll, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock. */
export function startSmoothScroll(): void {
  if (lenis || !window.matchMedia(MOTION_OK).matches) return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target: string | HTMLElement): void {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  else (typeof target === 'string' ? document.querySelector(target) : target)?.scrollIntoView();
}

/** Tween every `.mouth` / `.brow` / `.tear` inside root to a mood, as part of a timeline. */
export function moodTo(tl: gsap.core.Timeline, root: Element, mood: 'happy' | 'sad', at: gsap.Position, duration = 0.6): void {
  root.querySelectorAll<SVGPathElement>('.mouth, .brow').forEach((p) => {
    tl.to(p, { attr: { d: p.dataset[mood] ?? '' }, duration, ease: 'power2.inOut' }, at);
  });
  tl.to(root.querySelectorAll('.tear'), { opacity: mood === 'sad' ? 1 : 0, duration: duration * 0.6 }, at);
}
