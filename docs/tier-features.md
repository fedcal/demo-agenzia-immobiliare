# Agenzia Immobiliare — Tier Features & Pricing 2026

## Panoramica

Sito professionale + portale proprietà + matchmaking intelligente per agenzie immobiliari. Mercato: ~25k agenzie, pain: listing sparsi, zero matchmaking automatico, virtual tour costoso.

---

## Tier Base — €500–800 (85 ore)

**Per chi**: Agenzia 1-2 agenti, primo sito digitale.

### Incluso
- Home hero + portfolio agenzia (brand, fondazione, area operativa)
- Ricerca base proprietà
  - Filtri semplici: città, tipo (appartamento/casa/commerciale)
  - Lista proprietà 20+ inserite
  - Mappa interattiva locate proprietà
- Listing proprietà dettagliato (per ogni immobile)
  - Foto principale + gallery (10+ foto alta qualità)
  - Dati: mq, camere, bagni, piano, anno costruzione, prezzo
  - Descrizione breve (luminoso, ristrutturato, terrazzo)
  - Geolocalizzazione Maps embed
- Form valutazione proprietà
  - Proprietario inserisce: indirizzo, mq, tipologia, anno → stima preliminare (formula basic)
  - Email risultato valutazione + contatto agente
- Team agenti
  - Foto, contatti, zone specializzate (es. "Luca esperto centro storico")
  - Linguaggi parlati
- Schema JSON-LD: RealEstateAgent + LocalBusiness
- Contact form + CTA "contatta agente"
- SEO base

### NON incluso
- Ricerca avanzata
- Virtual tour 3D
- Alert proprietà
- Mortgage calculator
- Analytics

### Manutenzione
**€50/mese**: foto, listing sync, backup.

### Add-on
- Foto professionali agenzia (€400 shooting)
- Foto drone proprietà (€150-300 per immobile)
- Video tour montato (€250/video)

---

## Tier Intermedio — €1.500–2.200 (270 ore)

**Per chi**: Agenzia 3-5 agenti, gestione listing centralizzata, buyer engagement avanzato.

### Incluso (Base + )
- Ricerca avanzata filtri
  - Prezzo (min/max range slider)
  - Mq (min/max)
  - Camere (0-4+)
  - Riscaldamento (gas/pompa calore/radiatori)
  - Ascensore (sì/no)
  - Balcone/terrazzo (sì/no)
  - Filtri multipli combinabili (es. 3 camere, €300k-500k, balcone, centro città)
  - Salva ricerca → futuri listing matching
- Listing proprietà esteso
  - Dati catastali (foglio, particella, categoria)
  - Classe antisismica, agibilità (dichiarazione)
  - Utilities: riscaldamento, acqua, gas, wi-fi disponibili
  - Spese condominiali/anno (se condominio)
  - Tasse/IMU anno
  - Anno ristrutturazione ultimo intervento principale
  - Parking (numero posti, prezzo se separato)
  - Amministratore contatto
- Virtual tour 3D Matterport
  - Embed 360° navigabile (ruota stanza, zoom dettagli)
  - Accesso illimitato pre-visita fisica
  - Playlist foto + audio guida agente
  - Mobile-friendly (VR cardboard support)
- Gallery foto organizzata
  - Sezioni: esterno, ingresso, cucina, camere, bagni, giardino, cantina
  - Lightbox fullscreen + zoom
  - Didascalia foto (es. "cucina vista terrazza")
- Alert proprietà ("avvisami")
  - Buyer registra: "mi interessa casa 3 camere <€500k Milano centro"
  - Sistema notifica SMS/Email nuovo listing matching in tempo reale
  - Salva preferenze buyer (riutilizza future ricerche)
- Comparabili zona
  - Mostra 3 proprietà simili in zona (stesso mq±20%, prezzo±10%)
  - Evidenzia price trend: "prezzo medio €5.000/mq, tua €4.800"
- Mortgage calculator EU
  - Form: prezzo immobile, tasso interesse, anni mutuo
  - Calcola rata mensile automatico
  - Conversione valute EUR/USD/GBP
  - Link a partner finanziari (FAP, BCC)
- Multi-lingua IT/EN
- Pagamenti online (opzionale)
  - Versamenti agenzia (preliminare, caparra)
  - Integrate Stripe per transazioni sicure
- SEO avanzato (hreflang, LocalBusiness, Property schema)

### NON incluso
- AI property valuation
- 3D floor plan nativo
- Matchmaker buy-property
- Advanced analytics
- Integrazione notai

### Manutenzione
**€100/mese**: gestione listing, Matterport sync, alert system.

### Add-on
- Matterport virtual tour per proprietà (€150-250/immobile)
- SMS/Email reminder premium (€30/mese + €0.04/SMS)
- Traduzioni extra (€200 lingua)
- Floor plan 2D creation (€100/immobile)

---

## Tier Avanzato — €4.000–6.000 (540 ore)

**Per chi**: Agenzia network multi-sedi, AI valuation, compliance legal, fleet gestione.

### Incluso (Base + Intermedio + )
- AI Property Valuation RAG (Ollama local VPS)
  - Cliente inserisce indirizzo → AI estrae:
    - MLS storico immobili zona (prezzi passati, tempo vendita)
    - Comparabili automatici (30 proprietà simili)
    - Trend mercato (prezzo/mq trend 12 mesi)
    - Stima valutazione automatica con range confidence
  - Model llama3.1:8b trained su 10k+ transazioni locali
  - Privacy zero-cloud, dati su VPS agenzia
  - Expert override (agente può correggere AI)
- 3D Virtual Tour nativo Babylon.js
  - Non Matterport: nativo web (senza dipendenza cloud)
  - Modello 3D immobile caricabile (floor plan 3D)
  - Telecamera libera navigazione (fly-through)
  - Hotspot annotati ("qui cucina, qui balcone")
  - Mobile responsive (VR cardboard, Oculus)
  - Performance: 60fps su device standard
- Matchmaker buyer-property
  - Buyer profile: priorità (prezzo, zona, tipo), condizioni bonus
  - ML analizza storico buyer (chi ha cercato X, ha comprato Y)
  - Auto-ranking top 5 proprietà suggest settimanale
  - SMS/Email notifiche matching
  - Click-through tracking (buyer vede quale proprietà)
- Dashboard agente KPI avanzata
  - Proprietà vendute/anno
  - Tempo medio vendita (giorni sul mercato)
  - Margine/commissione (revenue per agente)
  - Buyer matching success rate (suggest → contratto)
  - Lead source (quali listing generano + contatti)
  - Pipeline forecast (proprietà prossima messa online, buyer acquisition)
- Integrazione notai (API)
  - Genera automaticamente: atto preliminare bozza
  - Cliente dati auto-precompilati da listing
  - Check compliance (catastale match, registri)
  - Notaio riceve brief automatico (dati immobile, parti)
  - Firma digitale preliminare (se entrambi disponibili)
- Contract template builder
  - Template locali conformi diritto civile IT
  - Clausole dinamiche (es. "se appartamento in condominio, clausola amministratore")
  - Genera automaticamente PDF precompilato buyer+seller
  - Export per firma notarile
- OCR catastale planimetria
  - Cliente carica visura catastale o foglio planimetria → AI legge:
    - Confini proprietà, mq reale, ubicazione
    - Extract dati: zona, categoria, note
  - Verifica coerenza con listing (es. "dichiari 120mq, catasto dice 115")
  - Flag discrepanze agente
- Wikidata LOD integration
  - Link immobile a Wikidata: (es. "Milano centro" Q490, scuola Q1122")
  - Auto-genera dati vicinanza (km a scuole, ospedali, metro, supermarket)
  - SEO knowledge graph (Google featured snippet "scuole Milano centro")
  - Buyer mobility score automatico
- SMS/WhatsApp nuove matching
  - Notifiche 2-way (buyer può rispondere SMS "vieni vedere?")
  - Template message conformi GDPR
  - Tracking letti/consegnati
  - Escalation automatica agente (se buyer non risponde 48h)
- Backup geo-redundato

### NON incluso
- Custom ML valuation per mercato specializzato (research)
- Integrazione agenzia nazionale (Immobiliare.it/Casa.it API)
- Smart home automation listing (domotica demo online)

### Manutenzione
**€200/mese**: AI training, Wikidata updates, legal compliance.

### Add-on
- AI custom-training storico transazioni (€1.500 una tantum)
- 3D Babylon.js per proprietà (€800 modello base)
- Branded native app (€2.000 setup)
- Advanced analytics DTC (€150/mese)
- Network multi-agenzia management (€250/mese)

---

## Confronto Tier

| Feature | Base | Intermedio | Avanzato |
|---------|------|-----------|----------|
| Portfolio agenzia | ✓ | ✓ | ✓ |
| Ricerca base | ✓ | ✓ | ✓ |
| Listing 20+ | ✓ | ✓ | ✓ |
| Valutazione property | ✓ | ✓ | ✓ |
| Team agenti | ✓ | ✓ | ✓ |
| Ricerca avanzata | – | ✓ | ✓ |
| Listing esteso (catasto) | – | ✓ | ✓ |
| Virtual tour 3D | – | ✓ | ✓ |
| Gallery organizzata | – | ✓ | ✓ |
| Alert buyer | – | ✓ | ✓ |
| Comparabili zona | – | ✓ | ✓ |
| Mortgage calculator | – | ✓ | ✓ |
| AI valuation | – | – | ✓ |
| 3D tour nativo | – | – | ✓ |
| Matchmaker | – | – | ✓ |
| Analytics KPI | – | – | ✓ |
| Integrazione notai | – | – | ✓ |
| Contract builder | – | – | ✓ |
| OCR catastale | – | – | ✓ |
| Wikidata LOD | – | – | ✓ |
| WhatsApp matching | – | – | ✓ |
| Manutenzione/mese | €50 | €100 | €200 |

---

## Implementation Timeline

- **Base**: 3-4 settimane
- **Intermedio**: 6-8 settimane (ricerca avanzata, Matterport, mortgage)
- **Avanzato**: 12-14 settimane (AI valuation, 3D nativo, notai API, matchmaker)

## Success Metrics

- Tier Base: local search visibility +30%
- Tier Intermedio: alert signup 35%+, time-on-site +150%, mortgage calculator usage 20%+
- Tier Avanzato: matchmaker click-rate 25%+, buyer conversion +40%, median sale time -15%
