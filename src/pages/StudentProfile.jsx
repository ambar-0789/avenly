import { useState } from 'react'
import styles from './StudentProfile.module.css'
import studentBoy from "/assets/student_boy.png";
function toggle(current, value) { return current === value ? null : value }
function multiToggle(arr, value) { return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }

const SUBJECTS = [
  { id: 'biology', icon: '🔬', label: 'BIOLOGY' },
  { id: 'geography', icon: '🌍', label: 'GEOGRAPHY' },
  { id: 'history', icon: '🏛️', label: 'HISTORY' },
  { id: 'maths', icon: '📐', label: 'MATHS' },
  { id: 'physics', icon: '⚛️', label: 'PHYSICS' },
  { id: 'chemistry', icon: '🧪', label: 'CHEMISTRY' },
  { id: 'english', icon: '📖', label: 'ENGLISH' },
]

export default function StudentProfile() {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [birthday, setBirthday] = useState('')
  const [grade, setGrade] = useState('')
  const [gender, setGender] = useState(null)
  const [learnStyle, setLearnStyle] = useState(null)
  const [attention, setAttention] = useState(null)
  const [pace, setPace] = useState(null)
  const [visual, setVisual] = useState(null)
  const [font, setFont] = useState(null)
  const [sensitive, setSensitive] = useState([])
  const [subjects, setSubjects] = useState([])

  function startJourney() {
    const data = { name, nickname, birthday, grade, gender, learnStyle, attention, pace, visual, font, sensitive, subjects }
    sessionStorage.setItem('av_student_profile', JSON.stringify(data))
    alert("Let's go! 🚀")
  }

  const opt = (cur, val, setter, label, iconNode) => (
    <div key={val} className={`${styles.learnOpt} ${cur === val ? styles.selected : ''}`} onClick={() => setter(toggle(cur, val))}>
      {iconNode}
      <span className={styles.optLabel}>{label}</span>
    </div>
  )

  const popt = (cur, val, setter, label, iconNode) => (
    <div key={val} className={`${styles.prefOpt} ${cur === val ? styles.selected : ''}`} onClick={() => setter(toggle(cur, val))}>
      <span className={styles.prefIcon}>{iconNode}</span>
      <span className={styles.prefLabel}>{label}</span>
    </div>
  )

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.scallop}></div>
      <div className={styles.page}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.blob}>
            <div className={`${styles.eye} ${styles.eyeLeft}`}></div>
            <div className={`${styles.eye} ${styles.eyeRight}`}></div>
          </div>
          <h1 className={styles.pageTitle}>Create your Profile</h1>
        </div>

        <div className={styles.grid}>

          {/* Avatar col */}
          <div className={styles.avatarCol}>
            <div className={styles.avatarCard}>
              {/* <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="100" cy="180" rx="90" ry="80" fill="#f08080" opacity="0.38"/>
                <rect x="28" y="200" width="144" height="70" rx="22" fill="#d4a870"/>
                <rect x="28" y="208" width="144" height="9" rx="3" fill="#c49060" opacity="0.5"/>
                <rect x="28" y="221" width="144" height="9" rx="3" fill="#c49060" opacity="0.5"/>
                <rect x="28" y="234" width="144" height="9" rx="3" fill="#c49060" opacity="0.5"/>
                <ellipse cx="100" cy="200" rx="16" ry="4" fill="#b8916a" opacity="0.5"/>
                <rect x="82" y="184" width="36" height="20" rx="12" fill="#f5c8a0"/>
                <ellipse cx="100" cy="154" rx="44" ry="46" fill="#f5c8a0"/>
                <ellipse cx="100" cy="114" rx="46" ry="26" fill="#1a1a1a"/>
                <circle cx="62" cy="136" r="18" fill="#1a1a1a"/>
                <circle cx="138" cy="136" r="18" fill="#1a1a1a"/>
                <circle cx="76" cy="120" r="16" fill="#1a1a1a"/>
                <circle cx="124" cy="120" r="16" fill="#1a1a1a"/>
                <circle cx="100" cy="110" r="20" fill="#1a1a1a"/>
                <ellipse cx="72" cy="166" rx="13" ry="9" fill="#e86868" opacity="0.38"/>
                <ellipse cx="128" cy="166" rx="13" ry="9" fill="#e86868" opacity="0.38"/>
                <ellipse cx="88" cy="154" rx="6.5" ry="7" fill="#1a1a1a"/>
                <ellipse cx="112" cy="154" rx="6.5" ry="7" fill="#1a1a1a"/>
                <circle cx="90" cy="152" r="2.4" fill="white"/>
                <circle cx="114" cy="152" r="2.4" fill="white"/>
                <path d="M88 170 Q100 181 112 170" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg> */}
              <img 
  src={studentBoy} 
  alt="Student" 
  className={styles.avatarImg}
/>
            </div>
            <span className={styles.avatarLabel}>Student</span>
          </div>

          {/* About panel */}
          <div className={`${styles.panel} ${styles.aboutPanel}`}>
            <div className={styles.panelTitle}>Tell us about you!</div>
            <input className={styles.inputField} type="text" placeholder="My name is..." value={name} onChange={e => setName(e.target.value)} />
            <input className={styles.inputField} type="text" placeholder="My nickname is..." value={nickname} onChange={e => setNickname(e.target.value)} />
            <input className={styles.inputField} type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            <div className={styles.gradeRow}>
              <span className={styles.gradeLabel}>I am in</span>
              <input className={styles.gradeInput} type="number" min="1" max="12" placeholder="—" value={grade} onChange={e => setGrade(e.target.value)} />
              <span className={styles.gradeLabel}>grade</span>
            </div>
            <div className={styles.genderSection}>
              <div className={styles.genderLabel}>I am a...</div>
              <div className={styles.genderOptions}>
                <div className={`${styles.genderCard} ${gender === 'girl' ? styles.selected : ''}`} onClick={() => setGender(toggle(gender, 'girl'))}>
                  <svg viewBox="0 0 56 72" xmlns="http://www.w3.org/2000/svg">
                    <rect x="14" y="42" width="28" height="30" rx="8" fill="#e86868"/>
                    <path d="M14 52 Q4 40 10 28 Q14 20 20 24" stroke="#e86868" strokeWidth="9" fill="none" strokeLinecap="round"/>
                    <circle cx="20" cy="24" r="6" fill="#f5c8a0"/>
                    <rect x="22" y="36" width="12" height="10" rx="5" fill="#f5c8a0"/>
                    <ellipse cx="28" cy="24" rx="16" ry="17" fill="#f5c8a0"/>
                    <ellipse cx="28" cy="10" rx="16" ry="10" fill="#d4a870"/>
                    <circle cx="14" cy="20" r="7" fill="#d4a870"/>
                    <circle cx="42" cy="20" r="7" fill="#d4a870"/>
                    <ellipse cx="22" cy="23" rx="3" ry="3.5" fill="#1a1a1a"/>
                    <ellipse cx="34" cy="23" rx="3" ry="3.5" fill="#1a1a1a"/>
                    <path d="M23 30 Q28 35 33 30" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={`${styles.genderCard} ${gender === 'boy' ? styles.selected : ''}`} onClick={() => setGender(toggle(gender, 'boy'))}>
                  <svg viewBox="0 0 56 72" xmlns="http://www.w3.org/2000/svg">
                    <rect x="14" y="42" width="28" height="30" rx="8" fill="#7ab0d4"/>
                    <rect x="22" y="36" width="12" height="10" rx="5" fill="#f5c8a0"/>
                    <ellipse cx="28" cy="24" rx="16" ry="17" fill="#f5c8a0"/>
                    <ellipse cx="28" cy="10" rx="16" ry="9" fill="#1a1a1a"/>
                    <rect x="12" y="10" width="32" height="10" rx="4" fill="#1a1a1a"/>
                    <ellipse cx="22" cy="23" rx="3" ry="3.5" fill="#1a1a1a"/>
                    <ellipse cx="34" cy="23" rx="3" ry="3.5" fill="#1a1a1a"/>
                    <path d="M23 30 Q28 35 33 30" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Learn panel */}
          <div className={`${styles.panel} ${styles.learnPanel}`}>
            <div className={styles.panelTitle}>How do you like to learn?</div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>I find it easier to learn with...</div>
                <div className={styles.learnOptions}>
                  <div className={`${styles.learnOpt} ${learnStyle === 'text' ? styles.selected : ''}`} onClick={() => setLearnStyle(toggle(learnStyle, 'text'))}>
                    <span className={styles.aaIcon}>Aa</span><span className={styles.optLabel}>Text</span>
                  </div>
                  <div className={`${styles.learnOpt} ${learnStyle === 'audio' ? styles.selected : ''}`} onClick={() => setLearnStyle(toggle(learnStyle, 'audio'))}>
                    <svg className={styles.iconSvg} viewBox="0 0 32 32" fill="none"><path d="M6 18v-4a10 10 0 0120 0v4" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"/><rect x="4" y="17" width="5" height="8" rx="2.5" fill="#1a1a1a"/><rect x="23" y="17" width="5" height="8" rx="2.5" fill="#1a1a1a"/></svg>
                    <span className={styles.optLabel}>Audio</span>
                  </div>
                  <div className={`${styles.learnOpt} ${learnStyle === 'visuals' ? styles.selected : ''}`} onClick={() => setLearnStyle(toggle(learnStyle, 'visuals'))}>
                    <svg className={styles.iconSvg} viewBox="0 0 32 32" fill="none"><rect x="3" y="5" width="26" height="18" rx="3" stroke="#1a1a1a" strokeWidth="2.2"/><path d="M12 27h8M16 23v4" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"/></svg>
                    <span className={styles.optLabel}>Visuals</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>My attention span is...</div>
                <div className={styles.learnOptions}>
                  {['short','medium','long'].map(v => (
                    <div key={v} className={`${styles.learnOpt} ${attention === v ? styles.selected : ''}`} onClick={() => setAttention(toggle(attention, v))}>
                      <span className={styles.aaIcon} style={{fontSize: v==='short'?'1.1rem':'1.5rem'}}>Aa</span>
                      <span className={styles.optLabel}>{v.charAt(0).toUpperCase()+v.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.learnGroup}>
              <div className={styles.learnGroupBg}>
                <div className={styles.learnGroupLabel}>My learning pace is...</div>
                <div className={styles.learnOptions}>
                  <div className={`${styles.learnOpt} ${pace === 'slow' ? styles.selected : ''}`} onClick={() => setPace(toggle(pace,'slow'))}>
                    <svg className={styles.iconSvg} viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="17" rx="9" ry="7" fill="#1a1a1a"/><ellipse cx="16" cy="16" rx="7" ry="5.5" fill="#555"/><circle cx="16" cy="16" r="4" fill="#1a1a1a"/><path d="M8 22 Q6 26 5 24M24 22 Q26 26 27 24M12 23 Q11 27 10 26M20 23 Q21 27 22 26" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/><circle cx="22" cy="12" r="3" fill="#1a1a1a"/><path d="M22 12 Q26 8 24 6" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className={styles.optLabel}>Slow</span>
                  </div>
                  <div className={`${styles.learnOpt} ${pace === 'medium' ? styles.selected : ''}`} onClick={() => setPace(toggle(pace,'medium'))}>
                    <svg className={styles.iconSvg} viewBox="0 0 32 32" fill="none"><circle cx="19" cy="6" r="3.5" fill="#1a1a1a"/><path d="M19 10 L16 20 L12 28M19 10 L22 20 L26 27" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 14 L22 16" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span className={styles.optLabel}>Medium</span>
                  </div>
                  <div className={`${styles.learnOpt} ${pace === 'fast' ? styles.selected : ''}`} onClick={() => setPace(toggle(pace,'fast'))}>
                    <svg className={styles.iconSvg} viewBox="0 0 32 32" fill="none"><ellipse cx="18" cy="20" rx="7" ry="6" fill="#1a1a1a"/><path d="M14 6 Q13 2 15 4M22 6 Q23 2 21 4" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/><ellipse cx="14" cy="7" rx="2.5" ry="5" fill="#1a1a1a"/><ellipse cx="22" cy="7" rx="2.5" ry="5" fill="#1a1a1a"/><circle cx="18" cy="16" r="5" fill="#1a1a1a"/><path d="M12 24 Q9 28 8 26M18 26 Q18 30 16 29" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    <span className={styles.optLabel}>Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences panel */}
          <div className={`${styles.panel} ${styles.prefPanel}`}>
            <div className={styles.panelTitle}>Tell us your preferences.</div>

            <div className={styles.prefSection}>
              <div className={styles.prefSectionBg}>
                <div className={styles.prefSectionLabel}>Visually, I like...</div>
                <div className={styles.prefOptions}>
                  {[
                    {id:'high-contrast', icon:'☀️', label:'High Contrast'},
                    {id:'soft', icon:<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4 Q24 8 22 20 Q16 26 6 22 Q2 14 14 4Z" fill="#1a1a1a"/><path d="M14 4 Q14 14 10 22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>, label:'Soft Colors'},
                    {id:'dark', icon:'🌙', label:'Dark Mode'},
                  ].map(o => (
                    <div key={o.id} className={`${styles.prefOpt} ${visual===o.id?styles.selected:''}`} onClick={()=>setVisual(toggle(visual,o.id))}>
                      <span className={styles.prefIcon}>{o.icon}</span>
                      <span className={styles.prefLabel}>{o.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.prefSection}>
              <div className={styles.prefSectionBg}>
                <div className={styles.prefSectionLabel}>Font..</div>
                <div className={styles.prefOptions}>
                  <div className={`${styles.prefOpt} ${font==='standard'?styles.selected:''}`} onClick={()=>setFont(toggle(font,'standard'))}>
                    <span className={styles.fontAa}>Aa</span><span className={styles.prefLabel}>Standard</span>
                  </div>
                  <div className={`${styles.prefOpt} ${font==='dyslexic'?styles.selected:''}`} onClick={()=>setFont(toggle(font,'dyslexic'))}>
                    <span className={`${styles.fontAa} ${styles.dyslexic}`}>Aa</span><span className={styles.prefLabel}>Dyslexia-friendly</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.prefSection}>
              <div className={styles.prefSectionBg}>
                <div className={styles.prefSectionLabel}>I am sensitive to..</div>
                <div className={styles.prefOptions}>
                  <div className={`${styles.prefOpt} ${sensitive.includes('sound')?styles.selected:''}`} onClick={()=>setSensitive(multiToggle(sensitive,'sound'))}>
                    <span className={styles.prefIcon}>🔊</span><span className={styles.prefLabel}>Sound</span>
                  </div>
                  <div className={`${styles.prefOpt} ${sensitive.includes('light')?styles.selected:''}`} onClick={()=>setSensitive(multiToggle(sensitive,'light'))}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="10" y="4" width="8" height="6" rx="2" fill="#1a1a1a"/><path d="M8 10 L6 24 Q14 27 22 24 L20 10Z" fill="#1a1a1a"/><ellipse cx="14" cy="10" rx="6" ry="2" fill="#555"/></svg>
                    <span className={styles.prefLabel}>Light</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects panel */}
          <div className={`${styles.panel} ${styles.subjectsPanel}`}>
            <div className={styles.panelTitle}>Which subjects do you like?</div>
            <div className={styles.subjectsGrid}>
              {SUBJECTS.map(s => (
                <div key={s.id} className={`${styles.subjectOpt} ${subjects.includes(s.id)?styles.selected:''}`} onClick={()=>setSubjects(multiToggle(subjects,s.id))}>
                  <span className={styles.sIcon}>{s.icon}</span>
                  <span className={styles.sLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className={styles.ctaBar} onClick={startJourney}>
          <span>Lets start your journey!</span>
        </div>

      </div>
    </div>
  )
}
