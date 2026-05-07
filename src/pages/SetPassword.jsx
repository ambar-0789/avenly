import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import BlobMini from '../components/BlobMini'
import styles from './auth.module.css'

export default function SetPassword() {
  const navigate = useNavigate()
  const [pw, setPw] = useState('')
  const [pwc, setPwc] = useState('')
  const [error, setError] = useState('')

  // Guard: must have come through step 1
  if (!sessionStorage.getItem('av_email')) {
    return <Navigate to="/signin" replace />
  }

  function handleConfirm() {
    setError('')
    if (!pw || !pwc) { setError('Please fill in both fields.'); return }
    if (pw.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (pw !== pwc) { setError('Passwords do not match.'); return }
    sessionStorage.setItem('av_authed', '1')
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <BlobMini />
          <span className={styles['brand-name']}>Avenly</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles['card-left']}>
            <h1 className={styles.heading}>Sign in!</h1>
            <p className={styles.sub}>Join the community today!</p>
          </div>
          <div className={styles['card-right']}>
            <p className={styles['field-label']}>Please set your password</p>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={pw}
              onChange={e => setPw(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={pwc}
              onChange={e => setPwc(e.target.value)}
            />
            <button className={styles.btn} onClick={handleConfirm}>
              Confirm
            </button>
            <p className={styles.error}>{error}</p>
          </div>
        </div>
      </main>

      <div className={styles.scallop} aria-hidden="true"></div>
    </div>
  )
}
