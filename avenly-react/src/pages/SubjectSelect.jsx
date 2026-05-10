import { FlaskConical, Landmark, Calculator } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styles from './LearningPath.module.css'

const subjects = [
  {
    id: 'maths',
    title: 'Maths',
    note: 'Fractions, numbers, puzzles',
    icon: Calculator,
    path: '/student/subjects/maths',
    enabled: true,
  },
  {
    id: 'science',
    title: 'Science',
    note: 'Experiments and discoveries',
    icon: FlaskConical,
    enabled: false,
  },
  {
    id: 'history',
    title: 'History',
    note: 'Stories from the past',
    icon: Landmark,
    enabled: false,
  },
]

export default function SubjectSelect() {
  const navigate = useNavigate()
  const profile = JSON.parse(sessionStorage.getItem('av_student_profile') || '{}')
  const studentName = profile.nickname || profile.name || 'Explorer'

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.header}>
          <p className={styles.kicker}>Welcome, {studentName}</p>
          <h1>Choose a subject</h1>
        </div>

        <div className={styles.subjectGrid}>
          {subjects.map((subject) => {
            const Icon = subject.icon

            return (
              <button
                key={subject.id}
                type="button"
                className={`${styles.subjectCard} ${!subject.enabled ? styles.locked : ''}`}
                onClick={() => subject.enabled && navigate(subject.path)}
                disabled={!subject.enabled}
              >
                <span className={styles.iconWrap}>
                  <Icon size={36} strokeWidth={2.4} />
                </span>
                <span className={styles.cardTitle}>{subject.title}</span>
                <span className={styles.cardNote}>{subject.note}</span>
                {!subject.enabled && <span className={styles.badge}>Coming soon</span>}
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}
