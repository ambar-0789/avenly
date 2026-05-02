import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlobMini from '../components/BlobMini'
import styles from './auth.module.css'

export default function SignIn() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  function handleSend() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all fields.')
      return
    }
    sessionStorage.setItem('av_name', name.trim())
    sessionStorage.setItem('av_email', email.trim())
    sessionStorage.setItem('av_phone', phone.trim())
    navigate('/signin/otp')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <BlobMini />
          <span className={styles['brand-name']}>Avenly</span>
        </div>
        <Link to="/login" className={styles['nav-link']}>Login</Link>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles['card-left']}>
            <h1 className={styles.heading}>Sign in!</h1>
            <p className={styles.sub}>Join the community today!</p>
          </div>
          <div className={styles['card-right']}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <button className={styles.btn} onClick={handleSend}>
              Send Verification
            </button>
            <p className={styles.error}>{error}</p>
          </div>
        </div>
      </main>

      <div className={styles.scallop} aria-hidden="true"></div>
    </div>
  )
}
