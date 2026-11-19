import { useRef, useState } from 'react'
import { useStore } from '../hooks/useStore.jsx'
import { dayKey, weekKeys } from '../lib/stats.js'
import { MOODS } from '../data/seed.js'
import { Button, Card, Chip, Header } from '../components/ui.jsx'

// Perkecil foto agar muat di localStorage
const shrink = (file) => new Promise((res) => {
  const r = new FileReader()
  r.onload = () => {
    const img = new Image()
    img.onload = () => {
      const k = Math.min(1, 240 / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = img.width * k; c.height = img.height * k
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      res(c.toDataURL('image/jpeg', 0.7))
    }
    img.src = r.result
  }
  r.readAsDataURL(file)
})

export default function Tracker() {
  const { s, up } = useStore()
  const [open, setOpen] = useState(false)
  const [mood, setMood] = useState(s.logs[dayKey()] || 3)
  const [photo, setPhoto] = useState(s.photos[dayKey()] || '')
  const [concern, setConcern] = useState('')
  const file = useRef(null)
  const today = dayKey()

  const save = () => {
    up((p) => ({ logs: { ...p.logs, [today]: mood }, photos: photo ? { ...p.photos, [today]: photo } : p.photos }))
    setOpen(false)
  }
  const addConcern = (e) => {
    e.preventDefault()
    const c = concern.trim()
    if (c && !s.concerns.includes(c)) up({ concerns: [...s.concerns, c] })
    setConcern('')
  }
  const tones = ['green', 'orange', 'green']
  const photoDays = Object.keys(s.photos).sort().reverse().slice(0, 5)

  return (
    <div className="page">
      <Header title="Skin Progress" />
      <Card>
        <b className="serif">Weekly Skin Health</b>
        <div className="chart">
          {weekKeys().map((k, i) => (
            <div key={k} className={k === today ? 'col today' : 'col'}>
              <div className="track"><div style={{ height: `${(s.logs[k] || 0) * 20}%` }} /></div>
              <small>{'MTWTFSS'[i]}</small>
            </div>
          ))}
        </div>
      </Card>
      <b className="serif">Tracked Concerns</b>
      <div className="chips">
        {s.concerns.map((c, i) => (
          <Chip key={c} tone={tones[i % 3]} onClick={() => up({ concerns: s.concerns.filter((x) => x !== c) })} title="Tap to remove">{c} ×</Chip>
        ))}
      </div>
      <form className="inline" onSubmit={addConcern}>
        <input placeholder="Add a concern (e.g. Redness)" value={concern} onChange={(e) => setConcern(e.target.value)} />
        <Button type="submit" variant="ghost">Add</Button>
      </form>
      <div className="split"><b className="serif">Photo Log</b><small className="rose">{Object.keys(s.photos).length} photos</small></div>
      <div className="photos">
        {photoDays.map((k) => (
          <div key={k} className="ph"><img src={s.photos[k]} alt={`Skin on ${k}`} /><small>{k.slice(5)}</small></div>
        ))}
        <button className="ph add" onClick={() => setOpen(true)}>+<small>Log Today</small></button>
      </div>
      {open && (
        <Card className="form">
          <b>How does your skin feel today?</b>
          <div className="chips">{MOODS.map((m, i) => <Chip key={m} active={mood === i + 1} onClick={() => setMood(i + 1)}>{m}</Chip>)}</div>
          <input ref={file} type="file" accept="image/*" hidden onChange={async (e) => e.target.files[0] && setPhoto(await shrink(e.target.files[0]))} />
          <Button variant="ghost" onClick={() => file.current.click()}>{photo ? 'Change photo' : 'Add a photo (optional)'}</Button>
          {photo && <img className="preview" src={photo} alt="Preview" />}
          <div className="two"><Button onClick={save}>Save today’s log</Button><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></div>
        </Card>
      )}
    </div>
  )
}
