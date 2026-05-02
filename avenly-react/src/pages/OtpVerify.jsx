import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import BlobMini from '../components/BlobMini'
import styles from './auth.module.css'

export default function OtpVerify() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  // Guard: must have come through step 1
  if (!sessionStorage.getItem('av_email')) {
    return <Navigate to="/signin" replace />
  }

  function handleVerify() {
    if (!otp.trim()) {
      setError('Please enter the OTP.')
      return
    }
    navigate('/signin/password')
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
            <p className={styles['field-label']}>Enter the OTP sent to your email/SMS</p>
            <input
              className={styles.input}
              type="text"
              placeholder="OTP"
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <button className={styles.btn} onClick={handleVerify}>
              Verify!
            </button>
            <p className={styles.error}>{error}</p>
          </div>
        </div>
      </main>

      <div className={styles.scallop} aria-hidden="true"></div>
    </div>
  )
}
