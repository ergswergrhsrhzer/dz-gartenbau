import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { company, heroes, services } from '../data'

const GardenScene = lazy(() => import('../components/GardenScene'))

export default function Home() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroes.length), 7000)
    return () => clearInterval(t)
  }, [])

  const hero = heroes[i]

  return (
    <>
      <section className="hero">
        <Suspense fallback={null}>
          <GardenScene />
        </Suspense>
        <div className="hero-photo" style={{ backgroundImage: `url(${hero.src})` }} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <div className="kicker">{company.claim}</div>
          <h1>{hero.title}</h1>
          <p>
            Willkommen bei {company.name}. Als Partner für Gartenplanung, Gartenbau und Pflege stimmen wir uns genau auf
            Ihre Wünsche ein. Gärten, denen man die Passion für hochwertige Gestaltung ansieht.
          </p>
          <div className="row">
            <Link className="btn btn-primary" to="/kontakt">
              Gartenbesuch vereinbaren
            </Link>
            <Link className="btn btn-ghost" to="/inspirationen">
              Arbeiten ansehen
            </Link>
          </div>
          <div className="hero-dots" role="tablist" aria-label="Stimmungen">
            {heroes.map((h, idx) => (
              <button
                key={h.src}
                className={idx === i ? 'on' : ''}
                aria-label={h.title}
                onClick={() => setI(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="kicker">Unsere Leidenschaft</div>
          <h2>Besondere Gärten</h2>
          <p className="lede">
            Wir hören genau hin, verstehen Ihre Bedürfnisse und entwickeln die Pläne zu Ihrem neuen Garten. Hochwertiger,
            ökologischer Gartenbau ist uns wichtig. Auf Pflanzenvielfalt und saisongerechte Pflanzensysteme legen wir Wert.
          </p>
          <div className="stat-row">
            <div className="stat">
              <strong>30+</strong>
              Jahre Planung, Bau und Pflege
            </div>
            <div className="stat">
              <strong>60</strong>
              Menschen im Team
            </div>
            <div className="stat">
              <strong>1</strong>
              Partner – alles aus einer Hand
            </div>
          </div>
          <blockquote className="quote">
            «Die Gartenplanung begeistert durch ein überzeugendes Konzept, Kreativität, ästhetische Formen sowie
            fantasiereiche Licht- und Schattenverhältnisse. Wir fühlten uns bestens betreut, sowohl in der Planung wie bei
            der Umsetzung.»
            <cite>Rahel und Philippe Bucher</cite>
          </blockquote>
        </div>
      </section>

      <section className="section" style={{ background: '#efe8da' }}>
        <div className="wrap">
          <div className="kicker">Qualität – ein Versprechen</div>
          <h2>Vom Plan bis zur Pflege</h2>
          <div className="grid-3">
            {services.slice(0, 3).map((s) => (
              <article key={s.slug} className="card">
                <img src={s.image} alt="" />
                <div className="card-body">
                  <h3>{s.title}</h3>
                  <p>{s.lead}</p>
                  <Link to={`/angebot#${s.slug}`}>Mehr erfahren →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <div className="kicker">Dachgarten-Leben</div>
            <h2>Auf Dächern entstehen Gartenräume</h2>
            <p className="lede">
              Selbst bei geringer Aufbauhöhe entsteht erstaunlich viel Grün. Entsiegelung, abwechslungsreiche Bepflanzung
              und Höhenunterschiede schaffen Atmosphäre. Gründach, Retention und Solar: eine Kombination, die sich lohnt.
            </p>
            <div className="row">
              <Link className="btn btn-primary" to="/angebot#bau" style={{ color: '#14110f' }}>
                Dach- und Fassadenbegrünung
              </Link>
            </div>
          </div>
          <img src="/media/hero-6.jpg" alt="Dachgarten von diebold.zgraggen" />
        </div>
      </section>
    </>
  )
}
