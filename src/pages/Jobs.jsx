import { benefits, company, jobs } from '../data'

export default function Jobs() {
  return (
    <>
      <header className="page-hero" style={{ '--hero': 'url(/media/hero-3.jpg)' }}>
        <div className="wrap">
          <div className="kicker">Arbeiten bei uns</div>
          <h1>Anders denken. Am besten grün.</h1>
        </div>
      </header>
      <section className="section">
        <div className="wrap">
          <p className="lede">
            Seit 30 Jahren gestalten, bauen und pflegen wir besondere Gärten, überwiegend für Privatkunden in der Region.
            Unser Team aus rund 60 Mitarbeitenden ist unser Fundament. Wir suchen Menschen, die anpacken und ihr Handwerk
            mit Leidenschaft leben.
          </p>
          <h2>Offene Profile</h2>
          <ul className="list">
            {jobs.map((j) => (
              <li key={j}>{j}</li>
            ))}
          </ul>
          <h2>Benefits</h2>
          <div className="grid-3">
            {benefits.map((b) => (
              <article className="card" key={b}>
                <div className="card-body">
                  <p>{b}</p>
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 32 }}>
            Bewerbung an <a href={`mailto:${company.email}`}>{company.email}</a>. Wir arbeiten nicht mit Personalvermittlern
            zusammen.
          </p>
        </div>
      </section>
    </>
  )
}
