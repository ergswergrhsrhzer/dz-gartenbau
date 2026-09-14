import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { company } from '../data'
import Effects from './Effects'

const links = [
  { to: '/', label: 'Start' },
  { to: '/angebot', label: 'Angebot' },
  { to: '/inspirationen', label: 'Inspirationen' },
  { to: '/unternehmen', label: 'Unternehmen' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/kontakt', label: 'Kontakt' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [wipe, setWipe] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    setWipe(true)
    const t = setTimeout(() => setWipe(false), 620)
    return () => clearTimeout(t)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <Effects routeKey={location.pathname} />
      <div className={`page-wipe ${wipe ? 'on' : ''}`} />
      <a className="skip" href="#main">
        Zum Inhalt
      </a>
      <header className="nav">
        <NavLink to="/" end className="brand" onClick={() => setOpen(false)}>
          <img src="/media/logo.svg" alt={company.short} />
        </NavLink>
        <nav className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
          <a className="nav-cta" href={company.phoneHref}>
            Anrufen
          </a>
        </nav>
        <button
          className={`burger ${open ? 'open' : ''}`}
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <div className={`mobile-panel ${open ? 'open' : ''}`}>
        {links.map((l, i) => (
          <NavLink key={l.to} to={l.to} style={{ '--i': i }} onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}
        <a className="btn btn-primary" href={company.phoneHref}>
          Jetzt anrufen
        </a>
      </div>
      <main id="main" className="page-enter">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <img src="/media/logo.svg" alt="" style={{ height: 42, background: 'white', borderRadius: 8, padding: 6 }} />
            <p>
              {company.name}
              <br />
              {company.street}, {company.zip}
            </p>
            <p>
              <a href={company.phoneHref}>{company.phone}</a>
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
          <div>
            <h3 className="serif">Angebot</h3>
            <p>
              <Link to="/angebot#planung">Planung</Link>
              <br />
              <Link to="/angebot#bau">Bau</Link>
              <br />
              <Link to="/angebot#unterhalt">Unterhalt</Link>
              <br />
              <Link to="/angebot#service">Service</Link>
              <br />
              <Link to="/angebot#expertisen">Expertisen</Link>
            </p>
          </div>
          <div>
            <h3 className="serif">Mehr</h3>
            <p>
              <a href={company.instagram} target="_blank" rel="noreferrer">
                Instagram Skygardens
              </a>
              <br />
              <a href={company.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
              <br />
              <a href={company.login} target="_blank" rel="noreferrer">
                Kunden-Login
              </a>
            </p>
          </div>
        </div>
        <div className="wrap legal">
          <span>© {new Date().getFullYear()} {company.short}</span>
          <span>Bilder: {company.name} · Redesign-Demo</span>
        </div>
      </footer>
    </>
  )
}
