import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Domus Roma — Agenzia Immobiliare Roma Prati dal 2002'
  },
  {
    path: 'immobili',
    loadComponent: () => import('./pages/immobili/immobili.component').then((m) => m.ImmobiliComponent),
    title: 'Immobili in vendita e affitto a Roma — Domus Roma'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Domus Roma Real Estate'
  },
  {
    path: 'agenti',
    loadComponent: () => import('./pages/agenti/agenti.component').then((m) => m.AgentiComponent),
    title: 'Il nostro team — Domus Roma'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti e valutazione gratuita — Domus Roma'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
