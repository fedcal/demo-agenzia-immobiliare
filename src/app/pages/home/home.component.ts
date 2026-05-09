import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <p class="hero-eyebrow">FIAIP · Dal 2002 · Roma Prati</p>
        <h1>Trovare casa a Roma è la nostra missione dal 2002</h1>
        <p class="hero-tagline">
          Domus Roma — agenzia boutique specializzata nel residenziale e commerciale upper-middle.
          Professionalità, trasparenza e 22 anni di mercato romano.
        </p>
        <div class="hero-actions">
          <a routerLink="/immobili" class="btn btn-primary">Vedi gli immobili</a>
          <a routerLink="/contatti" class="btn btn-secondary">Valutazione gratuita</a>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="demo-container">
        <ul class="stats-grid" aria-label="Numeri chiave Domus Roma">
          <li class="stat-item">
            <span class="stat-number">1.200+</span>
            <span class="stat-label">Immobili venduti</span>
          </li>
          <li class="stat-item">
            <span class="stat-number">850</span>
            <span class="stat-label">Famiglie soddisfatte</span>
          </li>
          <li class="stat-item">
            <span class="stat-number">22</span>
            <span class="stat-label">Anni di esperienza</span>
          </li>
          <li class="stat-item">
            <span class="stat-number">4.9 ★</span>
            <span class="stat-label">Rating Google</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Domus Roma</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🏛️</span>
          <h3>22 anni di mercato romano</h3>
          <p>Conosciamo ogni quartiere, ogni palazzo, ogni dinamica di prezzo nel mercato romano.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📋</span>
          <h3>FIAIP certificata</h3>
          <p>Tutti i nostri agenti sono abilitati e iscritti alla Camera di Commercio con polizza RC professionale.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📊</span>
          <h3>Valutazione gratuita 24h</h3>
          <p>Analisi comparativa di mercato gratuita e senza impegno entro 24 ore dalla richiesta.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🤝</span>
          <h3>Assistenza notarile</h3>
          <p>Vi accompagniamo dal sopralluogo al rogito con notai partner e due diligence completa.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredImmobili$ | async as immobili">
      <div class="section-header">
        <h2>Immobili in evidenza</h2>
        <a routerLink="/immobili" class="link-more">Vedi tutti gli immobili →</a>
      </div>
      <ul class="immobili-grid">
        <li *ngFor="let imm of immobili" class="immobile-card">
          <div class="immobile-card__placeholder" aria-hidden="true">🏠</div>
          <div class="immobile-card__body">
            <div class="immobile-card__header">
              <span class="badge" [class.badge--vendita]="imm.tipologia === 'vendita'" [class.badge--affitto]="imm.tipologia === 'affitto'">
                {{ imm.tipologia === 'vendita' ? 'Vendita' : 'Affitto' }}
              </span>
              <span class="badge badge--cat">{{ imm.categoria }}</span>
            </div>
            <h3>{{ imm.titolo }}</h3>
            <p class="immobile-card__zona">📍 {{ imm.zona }}</p>
            <div class="immobile-card__details">
              <span>{{ imm.metriQuadri }} m²</span>
              <span>{{ imm.locali }} locali</span>
              <span>{{ imm.bagni }} bagno/i</span>
            </div>
            <p class="immobile-card__price" *ngIf="imm.tipologia === 'vendita'">
              {{ imm.prezzo | currency: 'EUR' : 'symbol' : '1.0-0' }}
            </p>
            <p class="immobile-card__price" *ngIf="imm.tipologia === 'affitto'">
              {{ imm.prezzoMese | currency: 'EUR' : 'symbol' : '1.0-0' }}/mese
            </p>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Vuoi conoscere il valore del tuo immobile?</h2>
        <p>Valutiamo gratuitamente e senza impegno entro 24 ore. Nessun costo, nessun vincolo.</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Richiedi valutazione</a>
          <a routerLink="/agenti" class="btn btn-secondary-inv">Conosci il team</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero-eyebrow {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: var(--color-accent);
        text-transform: uppercase;
        margin: 0 0 1rem;
      }
      .hero h1 {
        font-size: clamp(1.8rem, 4.5vw, 3rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
        font-weight: 800;
        line-height: 1.2;
        max-width: 700px;
        margin-inline: auto;
        margin-bottom: 1rem;
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 auto 2rem;
        max-width: 600px;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: var(--color-accent-hover);
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .btn-secondary-inv {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.4);
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-secondary-inv:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }
      /* Stats */
      .stats {
        background: var(--color-accent);
        color: #ffffff;
      }
      .stats-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1rem;
        text-align: center;
      }
      .stat-item {
        padding: 1.5rem 1rem;
      }
      .stat-number {
        display: block;
        font-size: 2.2rem;
        font-weight: 800;
        line-height: 1;
        margin-bottom: 0.35rem;
        color: #ffffff;
      }
      .stat-label {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.82);
        font-weight: 500;
      }
      /* Features */
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.6rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: var(--color-bg-default);
      }
      .feature-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      /* Featured immobili */
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
        font-size: 1.4rem;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
      }
      .link-more:hover {
        text-decoration: underline;
      }
      .immobili-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .immobile-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .immobile-card__placeholder {
        aspect-ratio: 16 / 9;
        background: linear-gradient(135deg, #dbeafe, #eff6ff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        color: var(--color-accent);
      }
      .immobile-card__body {
        padding: 1rem;
      }
      .immobile-card__header {
        display: flex;
        gap: 0.4rem;
        margin-bottom: 0.6rem;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .badge--vendita {
        background: #dbeafe;
        color: var(--color-accent);
      }
      .badge--affitto {
        background: #dcfce7;
        color: var(--color-success);
      }
      .badge--cat {
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
      }
      .immobile-card h3 {
        margin: 0 0 0.25rem;
        font-size: 1rem;
        line-height: 1.3;
      }
      .immobile-card__zona {
        margin: 0 0 0.5rem;
        color: var(--color-fg-muted);
        font-size: 0.85rem;
      }
      .immobile-card__details {
        display: flex;
        gap: 0.75rem;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.75rem;
      }
      .immobile-card__price {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-accent);
      }
      /* CTA band */
      .cta-band {
        padding: 5rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
        font-size: 1.8rem;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.82);
        margin: 0 0 2rem;
        max-width: 540px;
        margin-inline: auto;
        margin-bottom: 2rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredImmobili$ = this.mockData.immobili$.pipe(
    map((data) => data.immobili.slice(0, 3))
  );
}
