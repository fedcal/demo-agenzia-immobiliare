import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface ValoreAgenzia {
  readonly titolo: string;
  readonly icona: string;
  readonly testo: string;
}

interface PartnerCategoria {
  readonly nome: string;
  readonly lista: readonly string[];
}

const VALORI: readonly ValoreAgenzia[] = [
  {
    titolo: 'Professionalità',
    icona: '🏛️',
    testo: 'FIAIP certificati, agenti abilitati con polizza RC professionale e aggiornamento costante sulle normative del settore.'
  },
  {
    titolo: 'Trasparenza',
    icona: '📋',
    testo: 'Nessun costo nascosto: provvigioni chiare, contratti leggibili, due diligence documentata prima di ogni firma.'
  },
  {
    titolo: 'Territorio',
    icona: '📍',
    testo: "22 anni di presenza a Roma ci hanno dato una conoscenza profonda di ogni quartiere, ogni micro-mercato, ogni dinamica di prezzo."
  },
  {
    titolo: 'Discrezione',
    icona: '🤝',
    testo: 'Trattiamo patrimoni immobiliari importanti con la massima riservatezza. I nostri clienti ci scelgono per il rapporto di fiducia.'
  }
];

const PARTNER: readonly PartnerCategoria[] = [
  {
    nome: 'Banche e mutui',
    lista: ['Unicredit', 'Intesa Sanpaolo', 'Mediobanca', 'Credem']
  },
  {
    nome: 'Studi notarili',
    lista: ['Studio Notarile Rossi & Associati', 'Notaio Bianchi Roma', 'Studio Cecchi Notai']
  },
  {
    nome: 'Tecnici e perizie',
    lista: ['Geometra Ferri', 'Studio Ing. Moretti', 'APE Certificazioni Lazio']
  }
];

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Domus Roma — Real Estate boutique nel cuore di Roma dal 2002.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>La nostra storia</h2>
        <p>
          Domus Roma nasce nel 2002 dalla visione di Marco Ferretti, agente immobiliare con una convinzione ferma: il
          mercato romano meritava un'agenzia capace di unire la conoscenza profonda del territorio alla professionalità
          dei grandi studi internazionali. In via Cola di Rienzo 88, nel cuore del quartiere Prati, ha aperto i battenti
          quella che sarebbe diventata una realtà di riferimento per acquirenti e venditori upper-middle a Roma.
        </p>
        <p>
          Negli anni abbiamo gestito oltre 1.200 compravendite e avviato più di 850 famiglie verso la casa dei loro
          sogni. Il nostro portafoglio spazia dal trilocale luminoso in zona Prati all'attico di lusso ai Parioli,
          dall'ufficio direzionale all'EUR agli immobili di carattere nel Centro Storico e a Trastevere.
        </p>
        <p>
          Siamo iscritti a FIAIP — Federazione Italiana Agenti Immobiliari Professionali — e aderiamo al codice
          deontologico della categoria. Ogni agente del team è abilitato, assicurato e aggiornato annualmente sulle
          normative urbanistiche, fiscali e contrattuali del settore.
        </p>
      </section>

      <section class="valori">
        <h2>I nostri valori</h2>
        <ul class="valori-grid">
          <li *ngFor="let v of valori" class="valore-card">
            <span class="valore-icon" aria-hidden="true">{{ v.icona }}</span>
            <h3>{{ v.titolo }}</h3>
            <p>{{ v.testo }}</p>
          </li>
        </ul>
      </section>

      <section class="partner">
        <h2>Le nostre partnership</h2>
        <p class="partner-intro">
          Collaboriamo con un network selezionato di professionisti per offrire un servizio completo al cliente:
          banche per la consulenza mutuo, studi notarili partner, geometri e ingegneri per perizie e conformità.
        </p>
        <div class="partner-grid">
          <div *ngFor="let cat of partner" class="partner-group">
            <h3>{{ cat.nome }}</h3>
            <ul>
              <li *ngFor="let p of cat.lista">{{ p }}</li>
            </ul>
          </div>
        </div>
        <p class="partner-note">
          I nomi sopra sono a scopo illustrativo per il demo. In un sito reale verrebbero inseriti i partner effettivi
          dell'agenzia.
        </p>
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
      .story {
        max-width: 740px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1.25rem;
        font-size: 1.5rem;
      }
      .story p {
        line-height: 1.75;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .valori {
        margin-bottom: 4rem;
      }
      .valori h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.5rem;
      }
      .valori-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.25rem;
      }
      .valore-card {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .valore-icon {
        font-size: 1.8rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .valore-card h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
        font-size: 1rem;
      }
      .valore-card p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.55;
      }
      .partner {
        margin-bottom: 2rem;
      }
      .partner h2 {
        font-size: 1.5rem;
        margin-bottom: 0.75rem;
      }
      .partner-intro {
        color: var(--color-fg-muted);
        max-width: 680px;
        margin-bottom: 2rem;
        line-height: 1.65;
      }
      .partner-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1rem;
      }
      .partner-group h3 {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 0.6rem;
      }
      .partner-group ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .partner-group li {
        font-size: 0.9rem;
        padding: 0.3rem 0;
        border-bottom: 1px dashed var(--color-border);
        color: var(--color-fg-default);
      }
      .partner-note {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 1.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  readonly valori = VALORI;
  readonly partner = PARTNER;
}
