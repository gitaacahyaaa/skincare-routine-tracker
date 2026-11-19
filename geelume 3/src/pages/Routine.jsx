import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore.jsx'
import { dayKey, doneIds, progress } from '../lib/stats.js'
import { Button, Card, Header, ProgressBar } from '../components/ui.jsx'

export default function Routine() {
  const { s, up } = useStore()
  const nav = useNavigate()
  const loc = useLocation()
  const [tab, setTab] = useState(loc.state?.tab || (new Date().getHours() < 17 ? 'morning' : 'evening'))
  const [adding, setAdding] = useState(false)
  const [n, setN] = useState({ name: '', brand: '', min: 1 })
  const key = dayKey()
  const steps = s.routine[tab]
  const ids = doneIds(s, tab)
  const g = progress(s, tab)

  const setDone = (list) => up((p) => ({ done: { ...p.done, [key]: { ...p.done[key], [tab]: list } } }))
  const toggle = (id) => setDone(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])
  const next = steps.find((x) => !ids.includes(x.id))
  const setSteps = (list) => up((p) => ({ routine: { ...p.routine, [tab]: list } }))
  const add = (e) => {
    e.preventDefault()
    if (!n.name.trim()) return
    setSteps([...steps, { id: 'u' + Date.now(), name: n.name.trim(), brand: n.brand.trim() || 'My product', min: Number(n.min) || 1 }])
    setN({ name: '', brand: '', min: 1 }); setAdding(false)
  }

  return (
    <div className="page">
      <Header title="Today’s Routine" onBack={() => nav('/home')} />
      <div className="tabs">
        {['morning', 'evening'].map((t) => (
          <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t === 'morning' ? 'Morning' : 'Evening'}</button>
        ))}
      </div>
      <div className="split"><small>{tab === 'morning' ? 'Morning' : 'Evening'} Progress</small><small className="rose">{g.pct}% ({g.done}/{g.total})</small></div>
      <ProgressBar pct={g.pct} />
      {steps.length === 0 && <p className="empty">No steps yet. Add your first step below.</p>}
      {steps.map((x) => (
        <Card key={x.id} className="step">
          <button className={`check ${ids.includes(x.id) ? 'on' : ''}`} onClick={() => toggle(x.id)} aria-label={`Complete ${x.name}`}>✓</button>
          <div><b>{x.name}</b><small>{x.brand}</small></div>
          <small>{x.min} min</small>
          <button className="x" onClick={() => setSteps(steps.filter((y) => y.id !== x.id))} aria-label={`Delete ${x.name}`}>×</button>
        </Card>
      ))}
      {adding ? (
        <form className="card form" onSubmit={add}>
          <input placeholder="Step name (e.g. Retinol serum)" value={n.name} onChange={(e) => setN({ ...n, name: e.target.value })} />
          <input placeholder="Brand" value={n.brand} onChange={(e) => setN({ ...n, brand: e.target.value })} />
          <input type="number" min="1" max="30" value={n.min} onChange={(e) => setN({ ...n, min: e.target.value })} />
          <div className="two"><Button type="submit">Add step</Button><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button></div>
        </form>
      ) : <Button variant="ghost" onClick={() => setAdding(true)}>+ Add a step</Button>}
      <Button className="mt" disabled={!next} onClick={() => next && toggle(next.id)}>{next ? 'Mark step complete' : 'All steps complete ♡'}</Button>
    </div>
  )
}
