import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const features = [
  {
    color: 'card-green',
    label: 'Adaptive Learning Engine',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M13.5 13.5l2.8 2.8M31.7 31.7l2.8 2.8M13.5 34.5l2.8-2.8M31.7 16.3l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity=".25"/>
      </svg>
    ),
  },
  {
    color: 'card-blue',
    label: 'Cognitive Load Control',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6C15.16 6 8 13.16 8 22c0 5.3 2.6 10 6.6 13H24h9.4c4-3 6.6-7.7 6.6-13 0-8.84-7.16-16-16-16z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M18 28c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 38h8v4h-8z" fill="currentColor" opacity=".3"/>
        <line x1="24" y1="22" x2="24" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    color: 'card-lavender',
    label: 'Attention-Aware UI',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 34l6-12 4 6 4-8 6 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="34" cy="14" r="6" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M34 11v3l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    color: 'card-pink',
    label: 'Emotion Detection',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="22" r="12" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="19" cy="20" r="2.5" fill="currentColor"/>
        <circle cx="29" cy="20" r="2.5" fill="currentColor"/>
        <path d="M18 27c1.3 2 3 3 6 3s4.7-1 6-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 10V7M14.3 13.3l-2.1-2.1M33.7 13.3l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    color: 'card-peach',
    label: 'Gamified Progress',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="32" height="24" rx="5" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M17 16v-4a7 7 0 0114 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="20" cy="28" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="28" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 28h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 22h4M28 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Landing() {
  const heroRef = useRef(null)
  const heroCenterRef = useRef(null)
  const eyeLRef = useRef(null)
  const eyeRRef = useRef(null)
  const socketLRef = useRef(null)
  const socketRRef = useRef(null)
  const cardRefs = useRef([])

  // Eye tracking
  useEffect(() => {
    const MAX_OFFSET = 7
    let targetLx = 0, targetLy = 0
    let targetRx = 0, targetRy = 0
    let curLx = 0, curLy = 0
    let curRx = 0, curRy = 0
    let rafId = null

    function getCenter(el) {
      const r = el.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    }
    function clamp(val, min, max) { return Math.min(max, Math.max(min, val)) }
    function lerp(a, b, t) { return a + (b - a) * t }

    function animate() {
      const SPEED = 0.18
      curLx = lerp(curLx, targetLx, SPEED)
      curLy = lerp(curLy, targetLy, SPEED)
      curRx = lerp(curRx, targetRx, SPEED)
      curRy = lerp(curRy, targetRy, SPEED)
      if (eyeLRef.current)
        eyeLRef.current.style.transform = `translate(calc(-50% + ${curLx}px), calc(-50% + ${curLy}px))`
      if (eyeRRef.current)
        eyeRRef.current.style.transform = `translate(calc(-50% + ${curRx}px), calc(-50% + ${curRy}px))`
      rafId = requestAnimationFrame(animate)
    }

    function onMouseMove(e) {
      if (!socketLRef.current || !socketRRef.current) return
      const cL = getCenter(socketLRef.current)
      const cR = getCenter(socketRRef.current)

      const dxL = e.clientX - cL.x, dyL = e.clientY - cL.y
      const distL = Math.sqrt(dxL * dxL + dyL * dyL) || 1
      const scaleL = Math.min(1, MAX_OFFSET / distL)
      targetLx = dxL * scaleL; targetLy = dyL * scaleL

      const dxR = e.clientX - cR.x, dyR = e.clientY - cR.y
      const distR = Math.sqrt(dxR * dxR + dyR * dyR) || 1
      const scaleR = Math.min(1, MAX_OFFSET / distR)
      targetRx = dxR * scaleR; targetRy = dyR * scaleR
    }

    function onTouchMove(e) {
      const t = e.touches[0]
      onMouseMove({ clientX: t.clientX, clientY: t.clientY })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onTouchMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('touchmove', onTouchMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Card stagger Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.idx, 10)
          setTimeout(() => {
            entry.target.classList.add(styles.visible)
          }, idx * 90)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    cardRefs.current.forEach((card, i) => {
      if (card) {
        card.dataset.idx = i
        observer.observe(card)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Hero parallax on scroll
  useEffect(() => {
    let ticking = false
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const hero = heroRef.current
          const center = heroCenterRef.current
          if (!hero || !center) { ticking = false; return }
          const y = window.scrollY
          const heroH = hero.offsetHeight
          const progress = Math.min(y / (heroH * 0.6), 1)
          center.style.transform = `translateY(${-progress * 40}px)`
          center.style.opacity = `${1 - progress * 0.7}`
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.body}>
      {/* ── HERO ── */}
      <section className={styles.hero} id="hero" ref={heroRef} aria-label="Hero">
        <nav className={styles.nav}>
          <span className={styles['nav-logo']}>Avenly</span>
          <div className={styles['nav-links']}>
            <Link to="/signin" className={styles['nav-link']}>Sign In</Link>
            <Link to="/login" className={`${styles['nav-link']} ${styles['nav-link-pill']}`}>Login</Link>
          </div>
        </nav>

        <div className={styles['hero-center']} ref={heroCenterRef}>
          <div className={styles.blob} id="blob" aria-hidden="true">
            <div className={styles['blob-body']}>
              <div className={styles['eye-socket']} ref={socketLRef}>
                <div className={styles.eye} ref={eyeLRef}>
                  <div className={styles.pupil}></div>
                </div>
              </div>
              <div className={styles['eye-socket']} ref={socketRRef}>
                <div className={styles.eye} ref={eyeRRef}>
                  <div className={styles.pupil}></div>
                </div>
              </div>
            </div>
            <div className={styles['blob-tentacles']} aria-hidden="true">
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
            </div>
          </div>
          <h1 className={styles['hero-logo']}>Avenly</h1>
        </div>

        <div className={styles['hero-scallop']} aria-hidden="true"></div>
      </section>

      {/* ── INTRO / FEATURES ── */}
      <section className={styles.intro} id="intro" aria-label="Features">
        <h2 className={styles['intro-heading']}>Start your special learning from home!</h2>

        <ul className={styles.cards} role="list">
          {features.map((f, i) => (
            <li
              key={f.label}
              ref={el => cardRefs.current[i] = el}
              className={`${styles.card} ${styles[f.color]}`}
              tabIndex={0}
            >
              <div className={styles['card-icon']} aria-hidden="true">
                {f.icon}
              </div>
              <span className={styles['card-label']}>{f.label}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
