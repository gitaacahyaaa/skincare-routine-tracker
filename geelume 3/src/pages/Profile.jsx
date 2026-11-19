import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore.jsx'
import { currentUser, skinScore, streak } from '../lib/stats.js'
import { Button, Card, Header } from '../components/ui.jsx'

export default function Profile() {
  const { s, up } = useStore()
  const go = useNavigate()
  const u = currentUser(s)
  const [name, setName] = useState(u.name)
  const [saved, setSaved] = useState(false)
  const rename = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    up((p) => ({ accounts: p.accounts.map((a) => (a.email === u.email ? { ...a, name: name.trim() } : a)) }))
    setSaved(true); setTimeout(() => setSaved(false), 1500)
  }
  const stats = [[streak(s), 'Day streak'], [s.products.length, 'Products'], [Object.keys(s.logs).length, 'Skin logs'], [skinScore(s) ?? '--', 'Skin score']]
  return (
    <div className="page">
      <Header title="Profile" />
      <div className="who"><i className="dot big">{u.name[0]}</i><b className="serif">{u.name}</b><small>{u.email}</small></div>
      <div className="stats">{stats.map(([v, l]) => <Card key={l}><b className="rose">{v}</b><small>{l}</small></Card>)}</div>
      <form className="card form" onSubmit={rename}>
        <b>Display name</b>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <Button type="submit">{saved ? 'Saved ♡' : 'Save name'}</Button>
      </form>
      <Button variant="ghost" onClick={() => { up({ session: null }); go('/') }}>Log out</Button>
      <Button variant="ghost" onClick={() => { if (confirm('Delete all your routine, product and skin data on this device?')) { localStorage.removeItem('geelume-v1'); location.href = '/' } }}>Reset all data</Button>
    </div>
  )
}
