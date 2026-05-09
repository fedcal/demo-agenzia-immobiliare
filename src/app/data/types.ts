// Tipi TypeScript per i dati mock dell'agenzia immobiliare Domus Roma

export interface Indirizzo {
  readonly via: string;
  readonly citta: string;
  readonly provincia: string;
  readonly cap: string;
  readonly regione: string;
  readonly paese: string;
  readonly lat: number;
  readonly lng: number;
}

export interface ContattiAgenzia {
  readonly telefono: string;
  readonly email: string;
  readonly social: {
    readonly instagram?: string;
    readonly facebook?: string;
  };
}

export interface OrariApertura {
  readonly lunedi: string;
  readonly martedi: string;
  readonly mercoledi: string;
  readonly giovedi: string;
  readonly venerdi: string;
  readonly sabato: string;
  readonly domenica: string;
}

export interface MetaSeo {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
}

export interface InfoAgenzia {
  readonly ragioneSociale: string;
  readonly nomeCommerciale: string;
  readonly tagline: string;
  readonly indirizzo: Indirizzo;
  readonly contatti: ContattiAgenzia;
  readonly partitaIva: string;
  readonly orari: OrariApertura;
  readonly membership: string;
  readonly metaSeo: MetaSeo;
}

export type TipologiaImmobile = 'vendita' | 'affitto';
export type CategoriaImmobile = 'residenziale' | 'commerciale';
export type ZonaRoma = 'Prati' | 'Centro Storico' | 'Trastevere' | 'Parioli' | 'Appia' | 'EUR';
export type ClasseEnergetica = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface Immobile {
  readonly id: number;
  readonly titolo: string;
  readonly tipologia: TipologiaImmobile;
  readonly categoria: CategoriaImmobile;
  readonly zona: ZonaRoma;
  readonly metriQuadri: number;
  readonly locali: number;
  readonly bagni: number;
  readonly prezzo?: number;
  readonly prezzoMese?: number;
  readonly classeEnergetica: ClasseEnergetica;
  readonly annoCostruzione: number;
  readonly descrizione: string;
  readonly features: readonly string[];
  readonly foto: string;
}

export interface ImmobiliData {
  readonly immobili: readonly Immobile[];
}

export type SpecializzazioneAgente = 'vendita' | 'affitti' | 'lusso' | 'commerciale';

export interface Agente {
  readonly id: number;
  readonly nome: string;
  readonly ruolo: string;
  readonly specializzazione: SpecializzazioneAgente;
  readonly bio: string;
  readonly anniEsperienza: number;
  readonly lingue: readonly string[];
  readonly certificazioni: readonly string[];
  readonly contatto: string;
  readonly foto: string;
}

export interface AgentiData {
  readonly agenti: readonly Agente[];
}

export interface Servizio {
  readonly id: string;
  readonly titolo: string;
  readonly icona: string;
  readonly descrizione: string;
  readonly punti: readonly string[];
}

export interface ServiziData {
  readonly servizi: readonly Servizio[];
}

export interface FaqItem {
  readonly domanda: string;
  readonly risposta: string;
}

export interface FaqData {
  readonly faq: readonly FaqItem[];
}

export interface FiltriImmobili {
  readonly tipologia: TipologiaImmobile | 'tutti';
  readonly categoria: CategoriaImmobile | 'tutti';
  readonly zona: ZonaRoma | 'tutti';
}
