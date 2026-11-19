import { useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore.jsx'
import { currentUser, progress, skinScore, streak } from '../lib/stats.js'
import { Card, ProgressBar } from '../components/ui.jsx'

export default function Home() {
  const { s } = useStore()
  const go = useNavigate()
  const u = currentUser(s)
  const h = new Date().getHours()
  const hello = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  const n = streak(s)
  const score = skinScore(s)
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const items = [['morning', 'Morning Routine', 'Scheduled for 7:00 AM'], ['evening', 'Evening Routine', 'Scheduled for 9:00 PM']]

  return (
    <div className="page">
      <header className="hello"><div><h1>{hello}, {u?.name} ♡</h1><small>{date}</small></div><i className="dot">{u?.name?.[0]}</i></header>
      <button className="streak" onClick={() => go('/routine')}>
        <b>{n} Day Streak</b>
        <small>{n ? 'You are glowing in rhythm' : 'Finish both routines today to start'}</small>
      </button>
      <h2>Today’s Routine</h2>
      {items.map(([k, t, sub]) => {
        const g = progress(s, k)
        const upcoming = k === 'evening' && h < 18 && g.done === 0
        return (
          <Card key={k} className="tap" onClick={() => go('/routine', { state: { tab: k } })}>
            <div className="split"><b>{t}</b><span className="pill">{upcoming ? 'Upcoming' : `${g.pct}%`}</span></div>
            <small>{upcoming ? sub : `${g.done} of ${g.total} steps completed`}</small>
            <ProgressBar pct={g.pct} />
          </Card>
        )
      })}
      <Card className="tap" onClick={() => go('/tracker')}>
        <b>Skin Health Score</b>
        <div className="score">{score ?? '--'}<small>/100</small></div>
        <small>{score ? (score >= 80 ? 'Hydrated and calm' : 'Keep going, be gentle') : 'Log your skin to see your score'}</small>
      </Card>
    </div>
  )
}
