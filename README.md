# FinFlow – Frontend

Web aplikacija za upravljanje ličnim finansijama (korisnički interfejs). Komunicira sa REST API-jem iz repozitorijuma [finance-manager-backend](https://github.com/Pop295/finance-manager-backend).

## Funkcionalnosti

- Registracija i prijava korisnika (JWT, token se čuva u `localStorage`), zaštićene rute i odjava
- **Dashboard**: bilans, prihodi, rashodi, preostali budžet, poslednje transakcije, grafikon rashoda po kategorijama i mesečne potrošnje
- **Transakcije**: tabela sa pretragom, filterima (datum, kategorija, tip) i paginacijom, dodavanje, izmena i brisanje
- **Kategorije**: dodavanje, izmena i brisanje (naziv, boja, ikonica)
- **Budžeti**: mesečni budžet i budžeti po kategorijama, progres barovi i upozorenja o prekoračenju
- **Izveštaji**: mesečni prihodi i rashodi, rashodi po kategorijama, najveće kategorije potrošnje
- **Profil**: avatar, ime, email i promena lozinke
- Responzivan raspored sa bočnom navigacijom, toast obaveštenja i stanja učitavanja, praznog i greške
- Automatska odjava kada token istekne (401)

## Tehnologije

- Vue 3, Vite
- Vue Router, Pinia
- Axios
- Tailwind CSS
- Chart.js (vue-chartjs)

## Pokretanje

### Preduslovi

- [Node.js](https://nodejs.org/) 18+
- Pokrenut backend (uputstvo u [backend repozitorijumu](https://github.com/Pop295/finance-manager-backend)), ako ne koristiš demo režim

### Koraci

1. Kloniraj repozitorijum:
   ```bash
   git clone https://github.com/Pop295/finance-manager-frontend.git
   cd finance-manager-frontend
   ```
2. Instaliraj zavisnosti:
   ```bash
   npm install
   ```
3. Napravi `.env` fajl na osnovu primera:
   ```bash
   cp .env.example .env
   ```
   (na Windowsu: `copy .env.example .env`)
4. Pokreni razvojni server:
   ```bash
   npm run dev
   ```
5. Aplikacija je dostupna na `http://localhost:5173`.

### Dostupne komande

| Komanda | Opis |
|---------|------|
| `npm run dev` | Razvojni server |
| `npm run build` | Produkcijski build u folderu `dist/` |
| `npm run preview` | Lokalni pregled produkcijskog builda |

## Demo režim (bez backenda)

Podrazumevano je uključen demo režim (`VITE_USE_MOCK=true`): aplikacija radi sa lažnim podacima i nije potreban backend. U ovom režimu bilo koji email i lozinka vode do prijave.

Za rad sa pravim backendom podesi u `.env`:

```
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend mora da radi na toj adresi, a njegova promenljiva `FRONTEND_URL` mora da bude `http://localhost:5173` (CORS).

## Struktura projekta

```
src/
  assets/       Globalni stilovi (Tailwind)
  components/   ui/ (osnovne komponente), charts/, layout/, transactions/
  layouts/      AuthLayout, DashboardLayout
  pages/        Dashboard, Transactions, Categories, Budgets, Reports, Profile, auth/
  router/       Rute i zaštita (auth guard)
  services/     API servisi (Axios) i mock podaci
  stores/       Pinia store-ovi
```

## Autori

- [@Pop295](https://github.com/Pop295): frontend
- [@ISSAmaci](https://github.com/ISSAmaci): backend
