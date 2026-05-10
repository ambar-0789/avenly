import { useState } from 'react'
import styles from './StudentProfile.module.css'
import guardianAvatar from '/assets/confused_parent.png'

function toggle(current, value) { return current === value ? null : value }
function multiToggle(arr, value) { return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }

const SUPPORT_AREAS = [
  { id: 'homework', icon: 'HW', label: 'HOMEWORK' },
  { id: 'progress', icon: 'PR', label: 'PROGRESS' },
  { id: 'routine', icon: 'RT', label: 'ROUTINE' },
  { id: 'confidence', icon: 'CF', label: 'CONFIDENCE' },
  { id: 'focus', icon: 'FC', label: 'FOCUS' },
  { id: 'communication', icon: 'CM', label: 'COMMUNICATION' },
]

export default function GuardianProfile() {
  const [name, setName] = useState('')
  const [relationship, setRelationship] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [studentGrade, setStudentGrade] = useState('')
  const [learningTime, setLearningTime] = useState(null)
  const [updates, setUpdates] = useState(null)
  const [supportStyle, setSupportStyle] = useState(null)
  const [tone, setTone] = useState(null)
  const [visual, setVisual] = useState(null)
  const [font, setFont] = useState(null)
  const [sensitive, setSensitive] = useState([])
  const [supportAreas, setSupportAreas] = useState([])

  function startJourney() {
    const data = { name, relationship, studentName, studentGrade, learningTime, updates, supportStyle, tone, visual, font, sensitive, supportAreas }
    sessionStorage.setItem('av_guardian_profile', JSON.stringify(data))
    alert("Guardian profile saved!")
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.scallop}></div>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.blob}>
            <div className={`${styles.eye} ${styles.eyeLeft}`}></div>
            <div className={`${styles.eye} ${styles.eyeRight}`}></div>
          </div>
          <h1 className={styles.pageTitle}>Create your Guardian Profile</h1>
        </div>

        <div className={styles.grid}>
          <div className={styles.avatarCol}>
            <div className={styles.avatarCard}>
              <img src={guardianAvatar} alt="Guardian" className={styles.avatarImg} />
            </div>
            <span className={styles.avatarLabel}>Guardian</span>
          </div>

          <div className={`${styles.panel} ${styles.aboutPanel}`}>
            <div className={styles.panelTitle}>Tell us about you!</div>
            <input className={styles.inputField} type="text" placeholder="My name is..." value={name} onChange={e => setName(e.target.value)} />
            <input className={styles.inputField} type="text" placeholder="The learner's name is..." value={studentName} onChange={e => setStudentName(e.target.value)} />
            <div className={styles.gradeRow}>
              <span className={styles.gradeLabel}>They are in</span>
              <input className={styles.gradeInput} type="number" min="1" max="12" placeholder="0" value={studentGrade} onChange={e => setStudentGrade(e.target.value)} />
              <span className={styles.gradeLabel}>grade</span>
            </div>
            <div className={styles.genderSection}>
              <div className={styles.genderLabel}>I am their...</div>
              <div className={styles.genderOptions}>
                {['parent', 'guardian'].map(item => (
                  <div key={item} className={`${styles.genderCard} ${relationship === item ? styles.selected : ''}`} onClick={() => setRelationship(toggle(relationship, item))}>
                    <span className={styles.aaIcon}>{item === 'parent' ? 'P' : 'G'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.learnPanel}`}>
            <div className={styles.panelTitle}>How should we help?</div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>Best learning time is...</div>
                <div className={styles.learnOptions}>
                  {['morning', 'afternoon', 'evening'].map(item => (
                    <div key={item} className={`${styles.learnOpt} ${learningTime === item ? styles.selected : ''}`} onClick={() => setLearningTime(toggle(learningTime, item))}>
                      <span className={styles.aaIcon}>{item[0].toUpperCase()}</span>
                      <span className={styles.optLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>I want updates...</div>
                <div className={styles.learnOptions}>
                  {['daily', 'weekly', 'monthly'].map(item => (
                    <div key={item} className={`${styles.learnOpt} ${updates === item ? styles.selected : ''}`} onClick={() => setUpdates(toggle(updates, item))}>
                      <span className={styles.aaIcon}>{item[0].toUpperCase()}</span>
                      <span className={styles.optLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>Support should feel...</div>
                <div className={styles.learnOptions}>
                  {['gentle', 'structured', 'challenging'].map(item => (
                    <div key={item} className={`${styles.learnOpt} ${supportStyle === item ? styles.selected : ''}`} onClick={() => setSupportStyle(toggle(supportStyle, item))}>
                      <span className={styles.aaIcon}>{item[0].toUpperCase()}</span>
                      <span className={styles.optLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.prefPanel}`}>
            <div className={styles.panelTitle}>Tell us your preferences.</div>

            <div className={styles.prefSection}>
              <div className={styles.prefSectionBg}>
                <div className={styles.prefSectionLabel}>Feedback tone should be...</div>
                <div className={styles.prefOptions}>
                  {['calm', 'encouraging', 'direct'].map(item => (
                    <div key={item} className={`${styles.prefOpt} ${tone === item ? styles.selected : ''}`} onClick={() => setTone(toggle(tone, item))}>
                      <span className={styles.prefIcon}>{item[0].toUpperCase()}</span>
                      <span className={styles.prefLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.prefSection}>
              <div className={styles.prefSectionBg}>
                <div className={styles.prefSectionLabel}>Visually, I like...</div>
                <div className={styles.prefOptions}>
                  {['high contrast', 'soft colors', 'dark mode'].map(item => (
                    <div key={item} className={`${styles.prefOpt} ${visual === item ? styles.selected : ''}`} onClick={() => setVisual(toggle(visual, item))}>
                      <span className={styles.prefIcon}>{item[0].toUpperCase()}</span>
                      <span className={styles.prefLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.prefSection}>
              <div className={styles.prefSectionBg}>
                <div className={styles.prefSectionLabel}>I should know about...</div>
                <div className={styles.prefOptions}>
                  {['sound', 'light', 'reading'].map(item => (
                    <div key={item} className={`${styles.prefOpt} ${sensitive.includes(item) ? styles.selected : ''}`} onClick={() => setSensitive(multiToggle(sensitive, item))}>
                      <span className={styles.prefIcon}>{item[0].toUpperCase()}</span>
                      <span className={styles.prefLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.prefSection}>
              <div className={styles.prefSectionBg}>
                <div className={styles.prefSectionLabel}>Font...</div>
                <div className={styles.prefOptions}>
                  {['standard', 'dyslexia-friendly'].map(item => (
                    <div key={item} className={`${styles.prefOpt} ${font === item ? styles.selected : ''}`} onClick={() => setFont(toggle(font, item))}>
                      <span className={`${styles.fontAa} ${item.includes('dyslexia') ? styles.dyslexic : ''}`}>Aa</span>
                      <span className={styles.prefLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.subjectsPanel}`}>
            <div className={styles.panelTitle}>What should we focus on?</div>
            <div className={styles.subjectsGrid}>
              {SUPPORT_AREAS.map(area => (
                <div key={area.id} className={`${styles.subjectOpt} ${supportAreas.includes(area.id) ? styles.selected : ''}`} onClick={() => setSupportAreas(multiToggle(supportAreas, area.id))}>
                  <span className={styles.sIcon}>{area.icon}</span>
                  <span className={styles.sLabel}>{area.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.ctaBar} onClick={startJourney}>
          <span>Lets start supporting learning!</span>
        </div>
      </div>
    </div>
  )
}
