import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Icon } from '../art/icon';
import { SITE, whatsappLink } from '../site.config';

@Component({
  selector: 'app-enquiry',
  imports: [ReactiveFormsModule, Icon],
  template: `
    <section class="enquiry" id="contact" aria-labelledby="enquiry-title">
      <div class="intro">
        <h2 id="enquiry-title">Is your water leaving <span>white marks?</span></h2>
        <p>Tell us a little about your home. Your message opens in WhatsApp, ready to send, and we'll reply to arrange a water test.</p>
        <dl class="contact">
          <div><dt>Call</dt><dd><a [href]="'tel:' + site.phoneDial">{{ site.phoneDisplay }}</a></dd></div>
          <div><dt>Email</dt><dd><a [href]="'mailto:' + site.email">{{ site.email }}</a></dd></div>
          <div><dt>Visit</dt><dd>{{ site.address }}</dd></div>
          <div><dt>Hours</dt><dd>{{ site.hours }}</dd></div>
        </dl>
      </div>

      <form [formGroup]="form" (ngSubmit)="send()" novalidate>
        <div class="field">
          <label for="f-name">Your name</label>
          <input id="f-name" formControlName="name" autocomplete="name" [attr.aria-invalid]="bad('name')" aria-describedby="e-name" />
          @if (bad('name')) {
            <p class="error" id="e-name">Please tell us your name.</p>
          }
        </div>
        <div class="field">
          <label for="f-phone">Phone number</label>
          <input id="f-phone" formControlName="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="10-digit mobile number" [attr.aria-invalid]="bad('phone')" aria-describedby="e-phone" />
          @if (bad('phone')) {
            <p class="error" id="e-phone">Enter a 10-digit mobile number so we can call you back.</p>
          }
        </div>
        <div class="field">
          <label for="f-area">Area or locality</label>
          <input id="f-area" formControlName="area" autocomplete="address-level2" placeholder="e.g. Jayanagar, Mysuru Road" />
        </div>
        <fieldset class="field">
          <legend>Where does your water come from?</legend>
          <div class="chips">
            @for (s of sources; track s) {
              <label class="chip">
                <input type="radio" formControlName="source" [value]="s" />
                <span>{{ s }}</span>
              </label>
            }
          </div>
        </fieldset>
        <div class="field">
          <label for="f-msg">What are you noticing? <span class="opt">(optional)</span></label>
          <textarea id="f-msg" formControlName="message" rows="3" placeholder="White marks on taps, salty taste, yellow water…"></textarea>
        </div>
        <button class="btn btn--whatsapp send" type="submit"><app-icon name="whatsapp" /> Send on WhatsApp</button>
        @if (sent()) {
          <p class="sent" role="status">WhatsApp should have opened with your message. If it didn't, call us on {{ site.phoneDisplay }}.</p>
        }
      </form>
    </section>
  `,
  styleUrl: './enquiry.css',
})
export class Enquiry {
  protected readonly site = SITE;
  protected readonly sources = ['Borewell', 'Corporation supply', 'Tanker', 'Not sure'];
  protected readonly sent = signal(false);
  private readonly submitted = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/)]],
    area: [''],
    source: ['Borewell'],
    message: [''],
  });

  protected bad(name: 'name' | 'phone'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted());
  }

  protected send(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      document.getElementById(this.form.controls.name.invalid ? 'f-name' : 'f-phone')?.focus();
      return;
    }
    const v = this.form.getRawValue();
    const lines = [
      'Namaskara! I would like a water test.',
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      v.area && `Area: ${v.area}`,
      `Water source: ${v.source}`,
      v.message && `Problem: ${v.message}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener');
    this.sent.set(true);
  }
}
