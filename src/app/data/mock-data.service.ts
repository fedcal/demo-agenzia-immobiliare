import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoAgenzia, ImmobiliData, AgentiData, ServiziData, FaqData } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoAgenzia> = this.http
    .get<InfoAgenzia>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly immobili$: Observable<ImmobiliData> = this.http
    .get<ImmobiliData>('/assets/mock/immobili.json')
    .pipe(shareReplay(1));

  readonly agenti$: Observable<AgentiData> = this.http
    .get<AgentiData>('/assets/mock/agenti.json')
    .pipe(shareReplay(1));

  readonly servizi$: Observable<ServiziData> = this.http
    .get<ServiziData>('/assets/mock/servizi.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<FaqData> = this.http
    .get<FaqData>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
