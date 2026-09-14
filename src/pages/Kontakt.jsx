import { useState } from 'react'
import { company } from '../data'

export default function Kontakt() {
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nTelefon: ${data.get('phone')}\nThema: ${data.get('topic')}\n\n${data.get('message')}`,
    )
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Anfrage Website')}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <header className="page-hero" style={{ '--hero': 'url(/media/wide-4.jpg)' }}>
        <div className="wrap">
          <div className="kicker">Kontakt</div>
          <h1>Wir hören genau hin.</h1>
        </div>
      </header>
      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Gartenbesuch oder Offerte</h2>
            {sent ? (
              <p>Ihr E-Mail-Programm öffnet sich. Wir antworten persönlich.</p>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <input name="name" required placeholder="Name" />
                <input name="phone" placeholder="Telefon" />
                <select name="topic" defaultValue="Planung">
                  <option>Planung</option>
                  <option>Bau / Umgestaltung</option>
                  <option>Unterhalt</option>
                  <option>Service</option>
                  <option>Jobs</option>
                </select>
                <textarea name="message" rows="5" required placeholder="Ihr Anliegen" />
                <button className="btn btn-primary" type="submit">
                  Nachricht senden
                </button>
              </form>
            )}
          </div>
          <div>
            <p>
              <strong>{company.name}</strong>
              <br />
              {company.street}
              <br />
              {company.zip}
            </p>
            <p className="hours">
              <span>Tel. {company.phone}</span>
              <span>{company.email}</span>
              {company.hours.map((h) => (
                <span key={h.label}>
                  {h.label}: {h.value}
                </span>
              ))}
            </p>
            <p>{company.note}</p>
            <iframe
              className="map"
              title="Karte Fislisbach"
              src="https://maps.google.com/maps?q=Bernardastrasse%2040%205442%20Fislisbach&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  )
}
