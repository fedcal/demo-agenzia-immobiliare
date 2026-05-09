import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti e valutazione gratuita</h1>
        <p>Richiedete una valutazione senza impegno o contattateci per informazioni sugli immobili.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Domus Roma S.r.l.</h2>
          <p class="info-address">
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            P.IVA {{ info.partitaIva }}
          </p>

          <h3>Contatti diretti</h3>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h3>Orari di apertura</h3>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>Chiuso</span></li>
          </ul>

          <div class="membership-badge">
            <span aria-hidden="true">🏛️</span>
            <span>{{ info.membership }}</span>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiesta valutazione gratuita</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome *</label>
              <input
                id="nome"
                type="text"
                formControlName="nome"
                required
                [class.field--error]="isInvalid('nome')"
              />
              <span class="error-msg" *ngIf="isInvalid('nome')">Campo obbligatorio (min. 2 caratteri)</span>
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                required
                [class.field--error]="isInvalid('email')"
              />
              <span class="error-msg" *ngIf="isInvalid('email')">Email non valida</span>
            </div>
            <div class="field">
              <label for="telefono">Telefono *</label>
              <input
                id="telefono"
                type="tel"
                formControlName="telefono"
                required
                [class.field--error]="isInvalid('telefono')"
              />
              <span class="error-msg" *ngIf="isInvalid('telefono')">Numero non valido</span>
            </div>
            <div class="field">
              <label for="indirizzo">Indirizzo immobile *</label>
              <input
                id="indirizzo"
                type="text"
                formControlName="indirizzo"
                placeholder="es. Via Roma 12, Prati"
                required
                [class.field--error]="isInvalid('indirizzo')"
              />
              <span class="error-msg" *ngIf="isInvalid('indirizzo')">Campo obbligatorio</span>
            </div>
            <div class="row-two">
              <div class="field">
                <label for="tipologia">Tipologia *</label>
                <select id="tipologia" formControlName="tipologia">
                  <option value="">Seleziona…</option>
                  <option value="vendita">Voglio vendere</option>
                  <option value="affitto">Voglio affittare</option>
                  <option value="valutazione">Solo valutazione</option>
                </select>
              </div>
              <div class="field">
                <label for="mq">Superficie (m²)</label>
                <input id="mq" type="number" formControlName="mq" min="10" max="5000" />
              </div>
            </div>
            <div class="field">
              <label for="note">Note aggiuntive</label>
              <textarea id="note" formControlName="note" rows="3" placeholder="Informazioni aggiuntive sull'immobile…"></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto il trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679) e della
                privacy policy di Domus Roma S.r.l. *
              </label>
            </div>
            <div class="field field--checkbox">
              <input id="marketing" type="checkbox" formControlName="marketing" />
              <label for="marketing">
                Acconsento a ricevere comunicazioni commerciali e offerte personalizzate da Domus Roma (facoltativo).
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta valutazione
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene trasmesso. In un sito reale ricevereste conferma entro 24 ore.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou__icon" aria-hidden="true">✅</span>
              <h3>Grazie {{ firstName() }}!</h3>
              <p>
                La vostra richiesta di valutazione per l'immobile in
                <strong>{{ form.value['indirizzo'] }}</strong> è stata ricevuta.
              </p>
              <p>
                Un agente Domus Roma vi contatterà entro 24 ore lavorative al numero indicato.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>

      <section class="faq-section" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of faqData.faq" class="faq-item">
            <h3 class="faq-item__q">{{ item.domanda }}</h3>
            <p class="faq-item__a">{{ item.risposta }}</p>
          </li>
        </ul>
      </section>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
        font-size: 2rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
        margin-bottom: 4rem;
      }
      /* Info block */
      .info-block h2 {
        margin: 0 0 0.5rem;
        font-size: 1.3rem;
        font-weight: 800;
        color: var(--color-accent);
      }
      .info-address {
        color: var(--color-fg-muted);
        line-height: 1.7;
        margin: 0 0 1.5rem;
        font-size: 0.95rem;
      }
      .info-block h3 {
        margin: 1.5rem 0 0.6rem;
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-fg-default);
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.4rem;
        font-size: 0.92rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.38rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.88rem;
      }
      .membership-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1.5rem;
        padding: 0.75rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        font-weight: 500;
      }
      /* Form block */
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
        font-size: 1.15rem;
        font-weight: 700;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.82rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-fg-default);
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.9rem;
        background: #ffffff;
        color: var(--color-fg-default);
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--error {
        border-color: var(--color-danger) !important;
      }
      .error-msg {
        font-size: 0.75rem;
        color: var(--color-danger);
        margin-top: 0.2rem;
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input {
        margin-top: 0.15rem;
        flex-shrink: 0;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .row-two {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.12s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
        width: 100%;
      }
      .btn-primary:hover:not(:disabled) {
        background: var(--color-accent-hover);
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        margin-bottom: 0;
      }
      /* Thank you */
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou__icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin: 0 0 1rem;
        font-size: 1.3rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 0.75rem;
        font-size: 0.92rem;
      }
      /* FAQ */
      .faq-section {
        border-top: 1px solid var(--color-border);
        padding-top: 3rem;
        margin-top: 1rem;
      }
      .faq-section h2 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1.25rem;
      }
      .faq-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .faq-item__q {
        margin: 0 0 0.6rem;
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--color-fg-default);
        line-height: 1.4;
      }
      .faq-item__a {
        margin: 0;
        font-size: 0.87rem;
        color: var(--color-fg-muted);
        line-height: 1.65;
      }
      @media (max-width: 480px) {
        .row-two {
          grid-template-columns: 1fr;
        }
        .faq-list {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly faq$ = this.mockData.faq$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,20}$/)]],
    indirizzo: ['', [Validators.required, Validators.minLength(5)]],
    tipologia: ['', Validators.required],
    mq: [null as number | null],
    note: [''],
    privacy: [false, Validators.requiredTrue],
    marketing: [false]
  });

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return ctrl !== null && ctrl.invalid && ctrl.touched;
  }

  firstName(): string {
    const nome = this.form.value['nome'] as string | undefined;
    return nome?.split(' ')[0] ?? '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    } else {
      this.form.markAllAsTouched();
    }
  }

  reset(): void {
    this.form.reset({ privacy: false, marketing: false });
    this.submitted.set(false);
  }
}
