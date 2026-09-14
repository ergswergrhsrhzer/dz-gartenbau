import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { services } from '../data'

export default function Angebot() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <>
      <header className="page-hero" style={{ '--hero': 'url(/media/hero-2.jpg)' }}>
        <div className="wrap">
          <div className="kicker">Angebot</div>
          <h1>Planung. Bau. Pflege.</h1>
          <p style={{ maxWidth: 560 }}>Alles aus einer Hand – sorgfältig geplant, harmonisch gestaltet, nachhaltig umgesetzt.</p>
        </div>
      </header>
      {services.map((s, idx) => (
        <section id={s.slug} className="section" key={s.slug} style={{ background: idx % 2 ? '#efe8da' : '#faf7f1' }}>
          <div className="wrap split">
            <div>
              <div className="kicker">{s.kicker}</div>
              <h2>{s.title}</h2>
              <p className="lede">{s.lead}</p>
              <ul className="list">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {s.slug === 'expertisen' && (
                <p>
                  Auftrag via JardinSuisse. Fragen an{' '}
                  <a href="mailto:a.diebold@dzgartenbau.ch">a.diebold@dzgartenbau.ch</a>.
                </p>
              )}
            </div>
            <img src={s.image} alt={s.title} />
          </div>
        </section>
      ))}
    </>
  )
}
