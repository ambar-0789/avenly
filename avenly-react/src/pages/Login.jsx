import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

const roles = [
  { id: 'student', label: 'Student' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'guardian', label: 'Guardian' },
]

export default function Login() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  function handleSelect(role) {
    setSelected(role)
  }

  function handleContinue() {
    if (!selected) return
    sessionStorage.setItem('av_role', selected)
    if (selected === 'student') navigate('/profile/student')
    else navigate('/profile/create')
  }

  return (
    <div className={styles.container}>
      <div className={styles.scallop}></div>

      <div className={styles.header}>
        <div className={styles.blob}>
          <div className={styles['eye']} style={{ left: 9 }}></div>
          <div className={styles['eye']} style={{ right: 9 }}></div>
        </div>
        <h1>Create your Profile</h1>
      </div>

      <p className={styles.sub}>Who are you?</p>

      <div className={styles.cards}>
        {roles.map(r => (
          <div
            key={r.id}
            className={`${styles.card} ${selected === r.id ? styles.selected : ''}`}
            onClick={() => handleSelect(r.id)}
          >
            <div className={styles.avatar}></div>
            <p>{r.label}</p>
          </div>
        ))}
      </div>

      <button
        className={styles['btn-continue']}
        disabled={!selected}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  )
}
