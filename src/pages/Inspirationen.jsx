import { useMemo, useState } from 'react'
import { gallery } from '../data'

export default function Inspirationen() {
  const cats = useMemo(() => ['Alle', ...new Set(gallery.map((g) => g.cat))], [])
  const [cat, setCat] = useState('Alle')
  const [open, setOpen] = useState(null)
  const items = cat === 'Alle' ? gallery : gallery.filter((g) => g.cat === cat)

  return (
    <>
      <header className="page-hero" style={{ '--hero': 'url(/media/hero-5.jpg)' }}>
        <div className="wrap">
          <div className="kicker">Inspirationen</div>
          <h1>Bilder, die Räume erzählen</h1>
          <p style={{ maxWidth: 640 }}>«Vorstellungskraft ist wichtiger als Wissen.» — Albert Einstein</p>
        </div>
      </header>
      <section className="section">
        <div className="wrap">
          <div className="filters">
            {cats.map((c) => (
              <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="masonry">
            {items.map((g) => (
              <figure key={g.src} className="shot" onClick={() => setOpen(g.src)}>
                <img src={g.src} alt={g.cat} />
                <figcaption>{g.cat}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      {open && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog">
          <img src={open} alt="" />
        </div>
      )}
    </>
  )
}
