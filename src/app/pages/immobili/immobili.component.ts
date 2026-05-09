import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { MockDataService } from '../../data/mock-data.service';
import type { FiltriImmobili, TipologiaImmobile, CategoriaImmobile, ZonaRoma, Immobile } from '../../data/types';

const FILTRI_INIZIALI: FiltriImmobili = {
  tipologia: 'tutti',
  categoria: 'tutti',
  zona: 'tutti'
};

@Component({
  selector: 'app-immobili',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, SlicePipe],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Immobili in portafoglio</h1>
        <p>{{ totale() }} immobili disponibili — vendita e affitto a Roma</p>
      </div>
    </section>

    <div class="demo-container">
      <section class="filtri" aria-label="Filtri di ricerca">
        <div class="filtri-group">
          <label for="filtro-tipologia" class="filtri-label">Tipologia</label>
          <select id="filtro-tipologia" class="filtri-select" (change)="setTipologia($event)">
            <option value="tutti">Tutte</option>
            <option value="vendita">Vendita</option>
            <option value="affitto">Affitto</option>
          </select>
        </div>
        <div class="filtri-group">
          <label for="filtro-categoria" class="filtri-label">Categoria</label>
          <select id="filtro-categoria" class="filtri-select" (change)="setCategoria($event)">
            <option value="tutti">Tutte</option>
            <option value="residenziale">Residenziale</option>
            <option value="commerciale">Commerciale</option>
          </select>
        </div>
        <div class="filtri-group">
          <label for="filtro-zona" class="filtri-label">Zona Roma</label>
          <select id="filtro-zona" class="filtri-select" (change)="setZona($event)">
            <option value="tutti">Tutte le zone</option>
            <option value="Prati">Prati</option>
            <option value="Centro Storico">Centro Storico</option>
            <option value="Trastevere">Trastevere</option>
            <option value="Parioli">Parioli</option>
            <option value="Appia">Appia Antica</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <button type="button" class="btn-reset" (click)="resetFiltri()" *ngIf="hasFiltriAttivi()">
          Rimuovi filtri
        </button>
      </section>

      <ul class="immobili-grid" *ngIf="immobiliFiltrati().length > 0; else nessunRisultato">
        <li *ngFor="let imm of immobiliFiltrati()" class="immobile-card">
          <div class="immobile-card__placeholder" aria-hidden="true">🏠</div>
          <div class="immobile-card__body">
            <div class="immobile-card__tags">
              <span class="badge" [class.badge--vendita]="imm.tipologia === 'vendita'" [class.badge--affitto]="imm.tipologia === 'affitto'">
                {{ imm.tipologia === 'vendita' ? 'Vendita' : 'Affitto' }}
              </span>
              <span class="badge badge--cat">{{ imm.categoria }}</span>
              <span class="badge badge--energia">Classe {{ imm.classeEnergetica }}</span>
            </div>
            <h2 class="immobile-card__title">{{ imm.titolo }}</h2>
            <p class="immobile-card__zona">📍 {{ imm.zona }} · {{ imm.annoCostruzione }}</p>
            <div class="immobile-card__details">
              <span>{{ imm.metriQuadri }} m²</span>
              <span>{{ imm.locali }} locali</span>
              <span>{{ imm.bagni }} bagno/i</span>
            </div>
            <p class="immobile-card__desc">{{ imm.descrizione | slice: 0:130 }}…</p>
            <ul class="immobile-card__features" aria-label="Caratteristiche">
              <li *ngFor="let f of imm.features">{{ f }}</li>
            </ul>
            <p class="immobile-card__price" *ngIf="imm.tipologia === 'vendita'">
              {{ imm.prezzo | currency: 'EUR' : 'symbol' : '1.0-0' }}
            </p>
            <p class="immobile-card__price" *ngIf="imm.tipologia === 'affitto'">
              {{ imm.prezzoMese | currency: 'EUR' : 'symbol' : '1.0-0' }}/mese
            </p>
          </div>
        </li>
      </ul>

      <ng-template #nessunRisultato>
        <div class="no-results">
          <p>Nessun immobile corrisponde ai filtri selezionati.</p>
          <button type="button" class="btn-reset-lg" (click)="resetFiltri()">Rimuovi filtri</button>
        </div>
      </ng-template>

      <p class="disclaimer">
        Demo non funzionale: i dati sono fittizi a scopo illustrativo. Per informazioni reali contattare l'agenzia.
      </p>
    </div>
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
      /* Filtri */
      .filtri {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: flex-end;
        padding: 1.5rem 0;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 2rem;
      }
      .filtri-group {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      .filtri-label {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .filtri-select {
        padding: 0.45rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-size: 0.9rem;
        font-family: inherit;
        background: #ffffff;
        color: var(--color-fg-default);
        min-width: 160px;
      }
      .filtri-select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
      }
      .btn-reset {
        padding: 0.45rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        background: #ffffff;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        cursor: pointer;
        align-self: flex-end;
        transition: all 0.12s ease;
      }
      .btn-reset:hover {
        border-color: var(--color-danger);
        color: var(--color-danger);
      }
      /* Grid */
      .immobili-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.25rem;
        margin-bottom: 2rem;
      }
      .immobile-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
        background: #ffffff;
        transition: box-shadow 0.15s ease;
      }
      .immobile-card:hover {
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      }
      .immobile-card__placeholder {
        aspect-ratio: 16 / 10;
        background: linear-gradient(135deg, #dbeafe, #eff6ff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3.5rem;
      }
      .immobile-card__body {
        padding: 1.1rem;
      }
      .immobile-card__tags {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
        margin-bottom: 0.6rem;
      }
      .badge {
        font-size: 0.68rem;
        padding: 0.12rem 0.45rem;
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
      .badge--energia {
        background: #fef3c7;
        color: var(--color-warning);
      }
      .immobile-card__title {
        margin: 0 0 0.2rem;
        font-size: 1rem;
        line-height: 1.35;
        font-weight: 700;
      }
      .immobile-card__zona {
        margin: 0 0 0.5rem;
        color: var(--color-fg-muted);
        font-size: 0.82rem;
      }
      .immobile-card__details {
        display: flex;
        gap: 0.75rem;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.6rem;
      }
      .immobile-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.87rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .immobile-card__features {
        list-style: none;
        padding: 0;
        margin: 0 0 0.75rem;
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
      }
      .immobile-card__features li {
        font-size: 0.72rem;
        background: var(--color-bg-subtle);
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .immobile-card__price {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--color-accent);
      }
      /* No results */
      .no-results {
        text-align: center;
        padding: 4rem 1rem;
        color: var(--color-fg-muted);
      }
      .btn-reset-lg {
        margin-top: 1rem;
        padding: 0.6rem 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
        font-size: 0.9rem;
        cursor: pointer;
      }
      .disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 2rem auto;
        padding: 1rem;
        border: 1px dashed var(--color-border);
        border-radius: var(--radius-md);
        max-width: 720px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImmobiliComponent {
  private readonly mockData = inject(MockDataService);

  private readonly tuttiImmobili = toSignal(
    this.mockData.immobili$.pipe(map((d) => d.immobili)),
    { initialValue: [] as readonly Immobile[] }
  );

  readonly filtri = signal<FiltriImmobili>(FILTRI_INIZIALI);

  readonly immobiliFiltrati = computed(() => {
    const { tipologia, categoria, zona } = this.filtri();
    return this.tuttiImmobili().filter((imm) => {
      const matchTipologia = tipologia === 'tutti' || imm.tipologia === tipologia;
      const matchCategoria = categoria === 'tutti' || imm.categoria === categoria;
      const matchZona = zona === 'tutti' || imm.zona === zona;
      return matchTipologia && matchCategoria && matchZona;
    });
  });

  readonly totale = computed(() => this.immobiliFiltrati().length);

  readonly hasFiltriAttivi = computed(() => {
    const { tipologia, categoria, zona } = this.filtri();
    return tipologia !== 'tutti' || categoria !== 'tutti' || zona !== 'tutti';
  });

  setTipologia(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as TipologiaImmobile | 'tutti';
    this.filtri.update((f) => ({ ...f, tipologia: value }));
  }

  setCategoria(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as CategoriaImmobile | 'tutti';
    this.filtri.update((f) => ({ ...f, categoria: value }));
  }

  setZona(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as ZonaRoma | 'tutti';
    this.filtri.update((f) => ({ ...f, zona: value }));
  }

  resetFiltri(): void {
    this.filtri.set(FILTRI_INIZIALI);
  }
}
