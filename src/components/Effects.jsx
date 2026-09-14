import { useEffect } from 'react'

function isTouch() {
  return window.matchMedia('(pointer: coarse)').matches
}

export default function Effects({ routeKey }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const cursor = document.createElement('div')
    cursor.className = 'fx-cursor'
    const cursorDot = document.createElement('div')
    cursorDot.className = 'fx-cursor-dot'
    const bar = document.querySelector('.fx-progress')
    document.body.append(cursor, cursorDot)

    let x = 0
    let y = 0
    let cx = 0
    let cy = 0
    let raf = 0

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      cursorDot.style.transform = `translate(${x}px, ${y}px)`
      const mag = e.target.closest?.('a, button, figure, .card, .stat')
      cursor.classList.toggle('hot', Boolean(mag))
    }

    const loop = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      cursor.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(loop)
    }

    const burst = (e) => {
      const n = 12
      for (let i = 0; i < n; i += 1) {
        const p = document.createElement('span')
        p.className = 'fx-petal'
        const angle = (Math.PI * 2 * i) / n + Math.random() * 0.35
        const dist = 48 + Math.random() * 80
        p.style.left = `${e.clientX}px`
        p.style.top = `${e.clientY}px`
        p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`)
        p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`)
        p.style.background = i % 2 ? '#8db33a' : '#c4a574'
        document.body.appendChild(p)
        setTimeout(() => p.remove(), 720)
      }
      const ring = document.createElement('span')
      ring.className = 'fx-ring'
      ring.style.left = `${e.clientX}px`
      ring.style.top = `${e.clientY}px`
      document.body.appendChild(ring)
      setTimeout(() => ring.remove(), 650)
    }

    const tilt = (e) => {
      const card = e.currentTarget
      const r = card.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 14}deg) rotateY(${(px - 0.5) * 16}deg) translateZ(10px)`
    }
    const untilt = (e) => {
      e.currentTarget.style.transform = ''
    }

    const onScroll = () => {
      if (!bar) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const t = max > 0 ? window.scrollY / max : 0
      bar.style.transform = `scaleX(${t})`
    }

    if (!isTouch()) {
      document.body.classList.add('has-cursor')
      window.addEventListener('pointermove', move)
      raf = requestAnimationFrame(loop)
      document.querySelectorAll('.card, .value, .stat, .split img').forEach((el) => {
        el.addEventListener('pointermove', tilt)
        el.addEventListener('pointerleave', untilt)
      })
    }

    window.addEventListener('pointerdown', burst)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add('in')
        })
      },
      { threshold: 0.14 },
    )
    document.querySelectorAll('.reveal, .card, .stat, .quote, .split, .value, .page-hero').forEach((el) => {
      el.classList.add('reveal')
      io.observe(el)
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', burst)
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
      cursor.remove()
      cursorDot.remove()
      document.body.classList.remove('has-cursor')
    }
  }, [routeKey])

  return <div className="fx-progress" aria-hidden="true" />
}
