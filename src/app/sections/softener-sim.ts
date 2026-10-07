/**
 * A small ion-exchange picture, drawn on canvas.
 * Hard flecks (calcium / magnesium) enter at the top, stick to resin beads, and soft water leaves at the bottom.
 * `flow` (0..1) sets how much water runs; `regen` (0..1) rinses the beads clean with brine.
 */
interface Bead {
  x: number;
  y: number;
  r: number;
  load: number;
}
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hard: boolean;
  life: number;
  out: boolean;
}

const COLORS = {
  tank: '#24305a',
  tankEdge: '#8ea0d6',
  glass: 'rgba(191, 238, 243, 0.06)',
  bead: [232, 150, 40] as const,
  hard: '#efece2',
  soft: '#5cc8d8',
  brine: 'rgba(255, 243, 230, 0.5)',
  pipeIn: '#9aa4a9',
  pipeOut: '#5cc8d8',
};

export class SoftenerSim {
  flow = 0.15;
  regen = 0;

  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private beads: Bead[] = [];
  private particles: Particle[] = [];
  private tank = { x: 0, y: 0, w: 0, h: 0, bedTop: 0 };
  private pointer = { x: -999, y: -999 };
  private raf = 0;
  private running = false;
  private last = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    canvas.addEventListener('pointermove', this.onPointer);
    canvas.addEventListener('pointerleave', () => (this.pointer = { x: -999, y: -999 }));
  }

  resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const tw = Math.min(this.w * 0.46, this.h * 0.36);
    const th = this.h * 0.78;
    this.tank = { x: (this.w - tw) / 2, y: this.h * 0.12, w: tw, h: th, bedTop: this.h * 0.12 + th * 0.3 };
    this.layBeads();
    this.particles = [];
    this.draw();
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const loop = (t: number) => {
      if (!this.running) return;
      const dt = Math.min(0.05, (t - this.last) / 1000);
      this.last = t;
      this.step(dt);
      this.draw();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy(): void {
    this.stop();
    this.canvas.removeEventListener('pointermove', this.onPointer);
  }

  /** One still frame for reduced motion: a loaded bed, water mid-flow. */
  drawStill(): void {
    this.beads.forEach((b, i) => (b.load = b.y < this.tank.bedTop + this.tank.h * 0.25 ? 0.8 : (i % 5) / 10));
    for (let i = 0; i < 60; i++) this.spawn(true);
    this.particles.forEach((p) => {
      p.y = this.tank.y + Math.random() * this.tank.h;
      p.hard = p.y < this.tank.bedTop + 20;
    });
    this.draw();
  }

  private onPointer = (e: PointerEvent) => {
    const r = this.canvas.getBoundingClientRect();
    this.pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  private layBeads(): void {
    const { x, w, h, bedTop, y } = this.tank;
    const r = Math.max(4, w / 26);
    const beads: Bead[] = [];
    const bottom = y + h - r * 1.6;
    let row = 0;
    for (let by = bedTop + r; by < bottom; by += r * 1.75, row++) {
      for (let bx = x + r * 1.4 + (row % 2) * r; bx < x + w - r * 1.2; bx += r * 2.05) {
        beads.push({ x: bx + (Math.random() - 0.5) * r * 0.4, y: by + (Math.random() - 0.5) * r * 0.3, r: r * (0.85 + Math.random() * 0.2), load: 0 });
      }
    }
    this.beads = beads;
  }

  private spawn(hard: boolean): void {
    const { x, w, y } = this.tank;
    this.particles.push({
      x: x + w / 2 + (Math.random() - 0.5) * w * 0.5,
      y: y + 6,
      vx: (Math.random() - 0.5) * 20,
      vy: 40 + Math.random() * 40,
      hard,
      life: 0,
      out: false,
    });
  }

  private step(dt: number): void {
    const { x, w, y, h } = this.tank;
    const rate = 6 + this.flow * 90;
    if (this.regen < 0.5 && Math.random() < rate * dt) this.spawn(Math.random() < 0.85);
    if (this.particles.length > 420) this.particles.splice(0, this.particles.length - 420);

    const speed = 0.4 + this.flow * 1.2;
    for (const p of this.particles) {
      p.life += dt;
      // gentle wander + gravity of the flow
      p.vx += (Math.random() - 0.5) * 60 * dt;
      p.vy += (this.regen > 0.5 ? -70 : 50) * dt;
      p.vx *= 0.96;
      p.vy = Math.max(-140, Math.min(140, p.vy));

      const dx = p.x - this.pointer.x;
      const dy = p.y - this.pointer.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 3600) {
        const f = (1 - Math.sqrt(d2) / 60) * 900 * dt;
        p.vx += (dx / (Math.sqrt(d2) + 0.01)) * f;
        p.vy += (dy / (Math.sqrt(d2) + 0.01)) * f;
      }

      if (!p.hard && p.y > y + h * 0.82) p.vx += (x + w / 2 - p.x) * 4 * dt;
      p.x += p.vx * dt * speed;
      p.y += p.vy * dt * speed;

      if (!p.out) {
        if (p.x < x + 4) (p.x = x + 4), (p.vx *= -0.5);
        if (p.x > x + w - 4) (p.x = x + w - 4), (p.vx *= -0.5);
      }

      // capture: a hard fleck that touches a bead with room left gets held
      if (p.hard && this.regen < 0.3) {
        for (const b of this.beads) {
          const bx = p.x - b.x;
          const by = p.y - b.y;
          if (bx * bx + by * by < (b.r + 2) * (b.r + 2) && b.load < 1) {
            b.load = Math.min(1, b.load + 0.12);
            p.hard = false;
            p.vy = 30 + Math.random() * 30;
            break;
          }
        }
      }

      // leave through the outlet (bottom) or, while regenerating, the drain (top)
      if (p.y > y + h - 6) p.out = true;
      if (this.regen > 0.5 && p.y < y + 4) p.out = true;
    }
    this.particles = this.particles.filter((p) => p.y < this.h + 20 && p.y > -20 && p.life < 14 && !(p.out && (p.y > y + h + 40 || p.y < y - 40)));

    // regeneration: beads release their load as brine flecks rising out
    if (this.regen > 0.5) {
      for (const b of this.beads) {
        if (b.load > 0 && Math.random() < 1.6 * dt) {
          b.load = Math.max(0, b.load - 0.25);
          this.particles.push({ x: b.x, y: b.y, vx: (Math.random() - 0.5) * 20, vy: -60, hard: true, life: 0, out: false });
        }
      }
    }
  }

  private draw(): void {
    const c = this.ctx;
    const { x, y, w, h, bedTop } = this.tank;
    c.clearRect(0, 0, this.w, this.h);

    // pipes
    c.lineCap = 'round';
    c.lineWidth = 14;
    c.strokeStyle = COLORS.pipeIn;
    c.beginPath();
    c.moveTo(0, y - 18);
    c.lineTo(x + w / 2, y - 18);
    c.lineTo(x + w / 2, y + 4);
    c.stroke();
    c.strokeStyle = COLORS.pipeOut;
    c.globalAlpha = 0.35 + this.flow * 0.65;
    c.beginPath();
    c.moveTo(x + w / 2, y + h);
    c.lineTo(x + w / 2, y + h + 24);
    c.lineTo(this.w, y + h + 24);
    c.stroke();
    c.globalAlpha = 1;

    // tank body
    const r = w * 0.45;
    c.beginPath();
    c.roundRect(x, y, w, h, [r, r, r * 0.5, r * 0.5]);
    c.fillStyle = COLORS.tank;
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = COLORS.tankEdge;
    c.stroke();

    // resin bed
    c.save();
    c.clip();
    c.fillStyle = 'rgba(0,0,0,0.2)';
    c.fillRect(x, bedTop - 6, w, h);
    for (const b of this.beads) {
      const [br, bg, bb] = COLORS.bead;
      const k = b.load;
      c.fillStyle = `rgb(${br + (239 - br) * k}, ${bg + (236 - bg) * k}, ${bb + (226 - bb) * k})`;
      c.beginPath();
      c.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = 'rgba(255,255,255,0.45)';
      c.beginPath();
      c.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.28, 0, Math.PI * 2);
      c.fill();
    }
    c.restore();

    // particles
    for (const p of this.particles) {
      c.fillStyle = p.hard ? (this.regen > 0.5 ? COLORS.brine : COLORS.hard) : COLORS.soft;
      c.beginPath();
      c.arc(p.x, p.y, p.hard ? 2.6 : 2.2, 0, Math.PI * 2);
      c.fill();
    }

    // glass sheen
    c.fillStyle = COLORS.glass;
    c.fillRect(x + w * 0.12, y + 20, w * 0.08, h - 40);
  }
}
