import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

const SPECIALIZZAZIONE_LABEL: Record<string, string> = {
  vendita: 'Vendita',
  affitti: 'Affitti',
  lusso: 'Lusso',
  commerciale: 'Commerciale'
};

@Component({
  selector: 'app-agenti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Il nostro team</h1>
        <p>5 professionisti FIAIP con oltre 63 anni di esperienza combinata nel mercato romano.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="agenti$ | async as data">
      <ul class="agenti-grid">
        <li *ngFor="let agente of data.agenti" class="agente-card">
          <div class="agente-card__avatar" aria-hidden="true">
            {{ agente.nome.charAt(0) }}
          </div>
          <div class="agente-card__body">
            <div class="agente-card__header">
              <div>
                <h2 class="agente-card__nome">{{ agente.nome }}</h2>
                <p class="agente-card__ruolo">{{ agente.ruolo }}</p>
              </div>
              <span class="badge-spec badge-spec--{{ agente.specializzazione }}">
                {{ labelSpec(agente.specializzazione) }}
              </span>
            </div>
            <p class="agente-card__bio">{{ agente.bio }}</p>
            <div class="agente-card__meta">
              <div class="meta-row">
                <span class="meta-label">Esperienza</span>
                <span class="meta-value">{{ agente.anniEsperienza }} anni</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Lingue</span>
                <span class="meta-value">{{ agente.lingue.join(', ') }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Certificazioni</span>
                <span class="meta-value">{{ agente.certificazioni.join(' · ') }}</span>
              </div>
            </div>
            <a [href]="'mailto:' + agente.contatto" class="agente-card__cta">
              Contatta {{ agente.nome.split(' ')[0] }} →
            </a>
          </div>
        </li>
      </ul>
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
      .agenti-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 1.5rem;
      }
      .agente-card {
        display: flex;
        gap: 1.25rem;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: #ffffff;
        align-items: flex-start;
        transition: box-shadow 0.15s ease;
      }
      .agente-card:hover {
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
      }
      .agente-card__avatar {
        width: 64px;
        height: 64px;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        font-weight: 800;
      }
      .agente-card__body {
        flex: 1;
        min-width: 0;
      }
      .agente-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        flex-wrap: wrap;
      }
      .agente-card__nome {
        margin: 0 0 0.1rem;
        font-size: 1.05rem;
        font-weight: 700;
      }
      .agente-card__ruolo {
        margin: 0;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        font-weight: 500;
      }
      .badge-spec {
        font-size: 0.68rem;
        padding: 0.15rem 0.55rem;
        border-radius: 9999px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .badge-spec--vendita {
        background: #dbeafe;
        color: var(--color-accent);
      }
      .badge-spec--affitti {
        background: #dcfce7;
        color: var(--color-success);
      }
      .badge-spec--lusso {
        background: #fef3c7;
        color: var(--color-warning);
      }
      .badge-spec--commerciale {
        background: #f3e8ff;
        color: #7c3aed;
      }
      .agente-card__bio {
        font-size: 0.87rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
        margin: 0 0 1rem;
      }
      .agente-card__meta {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        margin-bottom: 1rem;
      }
      .meta-row {
        display: flex;
        gap: 0.5rem;
        font-size: 0.82rem;
      }
      .meta-label {
        color: var(--color-fg-muted);
        min-width: 90px;
        font-weight: 500;
      }
      .meta-value {
        color: var(--color-fg-default);
        font-weight: 600;
      }
      .agente-card__cta {
        display: inline-block;
        font-size: 0.87rem;
        font-weight: 600;
        color: var(--color-accent);
        text-decoration: none;
        border: 1px solid var(--color-accent);
        padding: 0.35rem 0.85rem;
        border-radius: var(--radius-sm);
        transition: all 0.12s ease;
      }
      .agente-card__cta:hover {
        background: var(--color-accent);
        color: #ffffff;
        text-decoration: none;
      }
      @media (max-width: 480px) {
        .agente-card {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .agente-card__header {
          justify-content: center;
        }
        .meta-row {
          justify-content: center;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentiComponent {
  private readonly mockData = inject(MockDataService);

  readonly agenti$ = this.mockData.agenti$;

  labelSpec(spec: string): string {
    return SPECIALIZZAZIONE_LABEL[spec] ?? spec;
  }
}
