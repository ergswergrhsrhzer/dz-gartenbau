import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
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
  const [wipe, setWipe] = useState('idle')
  const pending = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (!href || /^(https?:|mailto:|tel:|#)/i.test(href)) return
      const url = new URL(a.href, window.location.origin)
      if (url.origin !== window.location.origin) return
      const to = `${url.pathname}${url.search}${url.hash}`
      const here = `${location.pathname}${location.search}${location.hash}`
      if (to === here) return
      e.preventDefault()
      e.stopPropagation()
      pending.current = to
      setOpen(false)
      setWipe('cover')
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    if (wipe !== 'cover') return undefined
    const t = setTimeout(() => {
      if (pending.current) navigate(pending.current)
    }, 520)
    return () => clearTimeout(t)
  }, [wipe, navigate])

  useEffect(() => {
    if (wipe !== 'cover' || !pending.current) return undefined
    const to = pending.current
    const here = `${location.pathname}${location.search}${location.hash}`
    const pathOnly = `${location.pathname}${location.search}`
    if (here !== to && pathOnly !== to.split('#')[0]) return undefined
    window.scrollTo(0, 0)
    const t = window.setTimeout(() => setWipe('hold'), 40)
    return () => window.clearTimeout(t)
  }, [location, wipe])

  useEffect(() => {
    if (wipe !== 'hold') return undefined
    const t = setTimeout(() => setWipe('reveal'), 140)
    return () => clearTimeout(t)
  }, [wipe])

  useEffect(() => {
    if (wipe !== 'reveal') return undefined
    const t = setTimeout(() => setWipe('idle'), 560)
    return () => clearTimeout(t)
  }, [wipe])

  useEffect(() => {
    document.body.style.overflow = open || wipe === 'cover' || wipe === 'hold' ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, wipe])

  return (
    <>
      <Effects routeKey={location.pathname} />
      <div className={`page-wipe ${wipe}`} aria-hidden="true" />
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
      <main id="main">
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
          <a className="made-by" href="tel:+41772361220">
            Made by Mekkz
            <span>077 236 12 20</span>
          </a>
        </div>
      </footer>
    </>
  )
}
