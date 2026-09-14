export default function Unternehmen() {
  return (
    <>
      <header className="page-hero" style={{ '--hero': 'url(/media/hero-1.jpg)' }}>
        <div className="wrap">
          <div className="kicker">Unternehmen</div>
          <h1>Grünes Potenzial entfalten</h1>
        </div>
      </header>
      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Gärten, die zu ihren Menschen passen</h2>
            <p className="lede">
              Wir sind Ihr Partner für den Aussenraum – mit Fachkompetenz, Kreativität und einem offenen Ohr. Eine klare
              Identität und gelebte Werte bilden das Fundament für ein starkes Team mit vielfältigen Talenten.
            </p>
            <p>
              Nachhaltiger Gartenbau mit höchster Qualität ist für uns mehr als ein Anspruch. Wir setzen auf Pflanzenvielfalt
              und standortgerechte Gestaltung, die Ihren Garten lebendig macht.
            </p>
          </div>
          <img src="/media/showgarden.webp" alt="Schaugarten Fislisbach" />
        </div>
      </section>
      <section className="section" style={{ background: '#efe8da' }}>
        <div className="wrap">
          <h2>Unsere Werte</h2>
          <div className="values">
            <article className="value">
              <h3>Freude</h3>
              <p>Wir lieben unsere Arbeit und identifizieren uns mit Dienstleistungen und Produkten.</p>
            </article>
            <article className="value">
              <h3>Miteinander</h3>
              <p>Offenheit und Wertschätzung prägen den Alltag. Stärken jedes Teammitglieds zählen.</p>
            </article>
            <article className="value">
              <h3>Mitgestaltung</h3>
              <p>Menschen, die Zukunft mitgestalten wollen, sind bei uns richtig.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>Nachhaltigkeit und Leitbild</h2>
          <div className="grid-3">
            <article className="card">
              <div className="card-body">
                <h3>Wirtschaft</h3>
                <ul className="list">
                  <li>Starke Stellung in der Region</li>
                  <li>Visionäre Investitionspolitik</li>
                  <li>Moderne Maschinen und Fahrzeuge</li>
                  <li>Attraktive Teilzeitstellen</li>
                </ul>
              </div>
            </article>
            <article className="card">
              <div className="card-body">
                <h3>Umwelt</h3>
                <ul className="list">
                  <li>Biodiversität in Staudenpflanzungen</li>
                  <li>Biothermische Unkrautbekämpfung</li>
                  <li>Recycling-Baustoffe und Abfalltrennung</li>
                  <li>Dach- und Fassadenbegrünung, Bienen auf dem Dach</li>
                </ul>
              </div>
            </article>
            <article className="card">
              <div className="card-body">
                <h3>Gesellschaft</h3>
                <ul className="list">
                  <li>Lehrlingsausbildung über 10%</li>
                  <li>Integration und Lohngleichheit</li>
                  <li>Vorlehre, Praktika, Erwachsenenbildung</li>
                  <li>Unterstützung auch in privaten Situationen</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
