import { useState } from 'react'
import styles from './StudentProfile.module.css'
import teacherAvatar from '/assets/teacher_female.png'

function toggle(current, value) { return current === value ? null : value }
function multiToggle(arr, value) { return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }

const SUBJECTS = [
  { id: 'biology', icon: 'Bio', label: 'BIOLOGY' },
  { id: 'geography', icon: 'Geo', label: 'GEOGRAPHY' },
  { id: 'history', icon: 'His', label: 'HISTORY' },
  { id: 'maths', icon: 'Math', label: 'MATHS' },
  { id: 'physics', icon: 'Phy', label: 'PHYSICS' },
  { id: 'chemistry', icon: 'Chem', label: 'CHEMISTRY' },
  { id: 'english', icon: 'Eng', label: 'ENGLISH' },
]

const GRADES = ['1-3', '4-6', '7-9', '10-12']

export default function TeacherProfile() {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [experience, setExperience] = useState('')
  const [role, setRole] = useState(null)
  const [classSize, setClassSize] = useState(null)
  const [teachingStyle, setTeachingStyle] = useState(null)
  const [supportNeed, setSupportNeed] = useState(null)
  const [contentDepth, setContentDepth] = useState(null)
  const [visual, setVisual] = useState(null)
  const [font, setFont] = useState(null)
  const [grades, setGrades] = useState([])
  const [subjects, setSubjects] = useState([])

  function startJourney() {
    const data = { name, school, experience, role, classSize, teachingStyle, supportNeed, contentDepth, visual, font, grades, subjects }
    sessionStorage.setItem('av_teacher_profile', JSON.stringify(data))
    alert("Teacher profile saved!")
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
          <h1 className={styles.pageTitle}>Create your Teacher Profile</h1>
        </div>

        <div className={styles.grid}>
          <div className={styles.avatarCol}>
            <div className={styles.avatarCard}>
              <img src={teacherAvatar} alt="Teacher" className={styles.avatarImg} />
            </div>
            <span className={styles.avatarLabel}>Teacher</span>
          </div>

          <div className={`${styles.panel} ${styles.aboutPanel}`}>
            <div className={styles.panelTitle}>Tell us about you!</div>
            <input className={styles.inputField} type="text" placeholder="My name is..." value={name} onChange={e => setName(e.target.value)} />
            <input className={styles.inputField} type="text" placeholder="My school or organization is..." value={school} onChange={e => setSchool(e.target.value)} />
            <div className={styles.gradeRow}>
              <span className={styles.gradeLabel}>I have</span>
              <input className={styles.gradeInput} type="number" min="0" max="60" placeholder="0" value={experience} onChange={e => setExperience(e.target.value)} />
              <span className={styles.gradeLabel}>years of experience</span>
            </div>
            <div className={styles.genderSection}>
              <div className={styles.genderLabel}>I usually teach as a...</div>
              <div className={styles.genderOptions}>
                {['class teacher', 'subject teacher'].map(item => (
                  <div key={item} className={`${styles.genderCard} ${role === item ? styles.selected : ''}`} onClick={() => setRole(toggle(role, item))}>
                    <span className={styles.aaIcon}>{item === 'class teacher' ? 'CT' : 'ST'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.learnPanel}`}>
            <div className={styles.panelTitle}>How do you teach?</div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>My classroom is usually...</div>
                <div className={styles.learnOptions}>
                  {['small', 'medium', 'large'].map(item => (
                    <div key={item} className={`${styles.learnOpt} ${classSize === item ? styles.selected : ''}`} onClick={() => setClassSize(toggle(classSize, item))}>
                      <span className={styles.aaIcon}>{item[0].toUpperCase()}</span>
                      <span className={styles.optLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>I prefer teaching with...</div>
                <div className={styles.learnOptions}>
                  {['text', 'audio', 'visuals'].map(item => (
                    <div key={item} className={`${styles.learnOpt} ${teachingStyle === item ? styles.selected : ''}`} onClick={() => setTeachingStyle(toggle(teachingStyle, item))}>
                      <span className={styles.aaIcon}>{item === 'text' ? 'Aa' : item === 'audio' ? 'Au' : 'Vi'}</span>
                      <span className={styles.optLabel}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>I want help with...</div>
                <div className={styles.learnOptions}>
                  {['plans', 'quizzes', 'support'].map(item => (
                    <div key={item} className={`${styles.learnOpt} ${supportNeed === item ? styles.selected : ''}`} onClick={() => setSupportNeed(toggle(supportNeed, item))}>
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
                <div className={styles.prefSectionLabel}>Content depth should be...</div>
                <div className={styles.prefOptions}>
                  {['simple', 'balanced', 'advanced'].map(item => (
                    <div key={item} className={`${styles.prefOpt} ${contentDepth === item ? styles.selected : ''}`} onClick={() => setContentDepth(toggle(contentDepth, item))}>
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
            <div className={styles.panelTitle}>What do you teach?</div>
            <div className={styles.prefSectionBg}>
              <div className={styles.prefSectionLabel}>Grade groups</div>
              <div className={styles.prefOptions}>
                {GRADES.map(item => (
                  <div key={item} className={`${styles.prefOpt} ${grades.includes(item) ? styles.selected : ''}`} onClick={() => setGrades(multiToggle(grades, item))}>
                    <span className={styles.prefIcon}>{item}</span>
                    <span className={styles.prefLabel}>grades</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.subjectsGrid}>
              {SUBJECTS.map(subject => (
                <div key={subject.id} className={`${styles.subjectOpt} ${subjects.includes(subject.id) ? styles.selected : ''}`} onClick={() => setSubjects(multiToggle(subjects, subject.id))}>
                  <span className={styles.sIcon}>{subject.icon}</span>
                  <span className={styles.sLabel}>{subject.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.ctaBar} onClick={startJourney}>
          <span>Lets start your teaching journey!</span>
        </div>
      </div>
    </div>
  )
}
