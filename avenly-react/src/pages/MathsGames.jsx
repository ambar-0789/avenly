import { Blocks, Crosshair, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styles from './LearningPath.module.css'

const games = [
  {
    title: 'Fraction Blaster',
    note: 'Shoot the matching fractions in space.',
    icon: Crosshair,
    path: '/games/star-quest/play/blaster',
  },
  {
    title: 'Fraction Builder',
    note: 'Build the target fraction piece by piece.',
    icon: Blocks,
    path: '/games/star-quest/play/builder',
  },
]

export default function MathsGames() {
  const navigate = useNavigate()

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <button type="button" className={styles.backButton} onClick={() => navigate('/student/subjects')}>
          <ArrowLeft size={18} />
          Subjects
        </button>

        <div className={styles.header}>
          <p className={styles.kicker}>Maths missions</p>
          <h1>Pick a fractions game</h1>
        </div>

        <div className={styles.gameGrid}>
          {games.map((game) => {
            const Icon = game.icon

            return (
              <button
                key={game.title}
                type="button"
                className={styles.gameCard}
                onClick={() => navigate(game.path)}
              >
                <span className={styles.iconWrap}>
                  <Icon size={38} strokeWidth={2.4} />
                </span>
                <span className={styles.cardTitle}>{game.title}</span>
                <span className={styles.cardNote}>{game.note}</span>
                <span className={styles.playLabel}>Start Star Quest</span>
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}
