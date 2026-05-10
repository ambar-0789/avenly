import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ProfileCreate.module.css'

const roles = [
  {
    id: 'student',
    label: 'Student',
    svg: (
      <svg viewBox="0 0 196 196" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="98" cy="136" rx="76" ry="62" fill="#f08080" opacity="0.35"/>
        <rect x="36" y="150" width="124" height="60" rx="20" fill="#d4a870"/>
        <rect x="36" y="157" width="124" height="8" rx="3" fill="#c49060" opacity="0.5"/>
        <rect x="36" y="169" width="124" height="8" rx="3" fill="#c49060" opacity="0.5"/>
        <rect x="36" y="181" width="124" height="8" rx="3" fill="#c49060" opacity="0.5"/>
        <ellipse cx="98" cy="149" rx="14" ry="3" fill="#b8916a" opacity="0.5"/>
        <rect x="80" y="134" width="36" height="20" rx="12" fill="#f5c8a0"/>
        <ellipse cx="98" cy="108" rx="42" ry="44" fill="#f5c8a0"/>
        <ellipse cx="98" cy="70" rx="44" ry="24" fill="#1a1a1a"/>
        <circle cx="62" cy="90" r="16" fill="#1a1a1a"/>
        <circle cx="134" cy="90" r="16" fill="#1a1a1a"/>
        <circle cx="74" cy="76" r="15" fill="#1a1a1a"/>
        <circle cx="122" cy="76" r="15" fill="#1a1a1a"/>
        <circle cx="98" cy="66" r="18" fill="#1a1a1a"/>
        <ellipse cx="72" cy="118" rx="11" ry="8" fill="#e86868" opacity="0.35"/>
        <ellipse cx="124" cy="118" rx="11" ry="8" fill="#e86868" opacity="0.35"/>
        <ellipse cx="85" cy="108" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="111" cy="108" rx="6" ry="6.5" fill="#1a1a1a"/>
        <circle cx="87" cy="106" r="2.2" fill="white"/>
        <circle cx="113" cy="106" r="2.2" fill="white"/>
        <path d="M86 124 Q98 135 110 124" stroke="#1a1a1a" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'teacher',
    label: 'Teacher',
    svg: (
      <svg viewBox="0 0 196 196" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="148" width="136" height="60" rx="20" fill="#1a1a1a"/>
        <polygon points="76,148 98,180 120,148" fill="#f5f5f5"/>
        <rect x="80" y="132" width="36" height="20" rx="12" fill="#f5c8a0"/>
        <ellipse cx="98" cy="104" rx="40" ry="42" fill="#f5c8a0"/>
        <ellipse cx="98" cy="66" rx="40" ry="20" fill="#d4a870"/>
        <ellipse cx="98" cy="62" rx="30" ry="15" fill="#c49060"/>
        <circle cx="98" cy="50" r="16" fill="#d4a870"/>
        <circle cx="98" cy="48" r="11" fill="#c49060"/>
        <ellipse cx="86" cy="102" rx="5.5" ry="6" fill="#1a1a1a"/>
        <ellipse cx="110" cy="102" rx="5.5" ry="6" fill="#1a1a1a"/>
        <circle cx="88" cy="100" r="2" fill="white"/>
        <circle cx="112" cy="100" r="2" fill="white"/>
        <path d="M88 118 Q98 127 108 118" stroke="#1a1a1a" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <path d="M30 178 Q18 155 34 136 Q46 122 66 128" stroke="#1a1a1a" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="66" cy="127" rx="13" ry="11" fill="#f5c8a0"/>
        <circle cx="57" cy="118" r="7" fill="#f5c8a0"/>
        <circle cx="66" cy="114" r="7" fill="#f5c8a0"/>
        <circle cx="76" cy="116" r="6" fill="#f5c8a0"/>
      </svg>
    ),
  },
  {
    id: 'guardian',
    label: 'Guardian',
    svg: (
      <svg viewBox="0 0 196 196" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="148" cy="118" rx="56" ry="72" fill="#f08080" opacity="0.28"/>
        <rect x="32" y="148" width="132" height="60" rx="20" fill="#f5f5f5"/>
        <circle cx="98" cy="152" r="9" fill="#e86868"/>
        <rect x="80" y="132" width="36" height="20" rx="12" fill="#c8956a"/>
        <ellipse cx="98" cy="104" rx="38" ry="40" fill="#c8956a"/>
        <ellipse cx="98" cy="68" rx="38" ry="20" fill="#1a1a1a"/>
        <rect x="60" y="68" width="76" height="18" rx="6" fill="#1a1a1a"/>
        <circle cx="84" cy="104" r="15" fill="none" stroke="#1a1a1a" strokeWidth="2.8"/>
        <circle cx="112" cy="104" r="15" fill="none" stroke="#1a1a1a" strokeWidth="2.8"/>
        <path d="M99 104 L101 104" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M58 100 L69 102" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M127 102 L138 100" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round"/>
        <ellipse cx="84" cy="104" rx="4.5" ry="5" fill="#1a1a1a"/>
        <ellipse cx="112" cy="104" rx="4.5" ry="5" fill="#1a1a1a"/>
        <circle cx="86" cy="102" r="1.8" fill="white"/>
        <circle cx="114" cy="102" r="1.8" fill="white"/>
        <path d="M90 119 Q98 127 106 119" stroke="#1a1a1a" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <path d="M166 178 Q178 156 164 136 Q153 120 134 127" stroke="#f5f5f5" strokeWidth="18" fill="none" strokeLinecap="round"/>
        <ellipse cx="133" cy="126" rx="12" ry="11" fill="#c8956a"/>
        <circle cx="142" cy="118" r="7" fill="#c8956a"/>
        <circle cx="134" cy="114" r="7" fill="#c8956a"/>
        <circle cx="125" cy="117" r="6.5" fill="#c8956a"/>
      </svg>
    ),
  },
]

export default function ProfileCreate() {
  const navigate = useNavigate()
  const [active, setActive] = useState(null)

  function pick(id) { setActive(id) }

  function handleContinue() {
    if (!active) return
    sessionStorage.setItem('av_role', active)
    if (active === 'student') navigate('/profile/student')
        else if (active === 'teacher') navigate('/profile/teacher')
    else if (active === 'guardian') navigate('/profile/guardian')

      else alert('Role saved: ' + active)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.scallop}></div>

      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.blob}>
            <div className={`${styles.eye} ${styles['eye-left']}`}></div>
            <div className={`${styles.eye} ${styles['eye-right']}`}></div>
          </div>
          <h1 className={styles.title}>Create your Profile</h1>
        </div>

        <p className={styles.sub}>Who are you?</p>

        <div className={styles.cards}>
          {roles.map(r => (
            <div
              key={r.id}
              className={`${styles.card} ${active === r.id ? styles.selected : ''}`}
              onClick={() => pick(r.id)}
            >
              <div className={styles.avatar}>{r.svg}</div>
              <div className={styles.label}>{r.label}</div>
            </div>
          ))}
        </div>

        <button
          className={styles['btn-continue']}
          disabled={!active}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
