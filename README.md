# diebold.zgraggen — Website-Redesign

Premium-Demo für Diebold & Zgraggen Gartenbau AG, Fislisbach.

## Lokal

```bash
npm install
npm run dev
```

## Netlify + GitHub

1. Dieses Repo auf GitHub verbinden (bereits gepusht, falls Remote `origin` gesetzt ist).
2. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → GitHub.
3. Build-Settings (stehen auch in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. SPA-Routen (`/angebot`, `/kontakt`, …) laufen über den Redirect in `netlify.toml`.

Bilder und Texte stammen von dzgartenbau.ch und gehören dem Betrieb.
