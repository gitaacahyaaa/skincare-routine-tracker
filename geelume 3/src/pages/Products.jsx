import { useState } from 'react'
import { useStore } from '../hooks/useStore.jsx'
import { CATEGORIES } from '../data/seed.js'
import { Button, Card, Chip, Header, ProductCard } from '../components/ui.jsx'

const blank = { name: '', brand: '', category: 'Cleanser', rating: 4 }

export default function Products() {
  const { s, up } = useStore()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(false)
  const [f, setF] = useState(blank)
  const list = s.products.filter((p) =>
    (cat === 'All' || p.category === cat) && `${p.name} ${p.brand}`.toLowerCase().includes(q.toLowerCase()))

  const add = (e) => {
    e.preventDefault()
    if (!f.name.trim()) return
    up((p) => ({ products: [...p.products, { ...f, name: f.name.trim(), brand: f.brand.trim() || 'My brand', rating: Number(f.rating), id: 'p' + Date.now() }] }))
    setF(blank); setOpen(false)
  }

  return (
    <div className="page">
      <Header title="My Cabinet" />
      <input className="search" placeholder="Search product or brand..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="chips scrollx">{['All', ...CATEGORIES].map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}</div>
      {list.length === 0 && <p className="empty">No products found. Tap + to add one.</p>}
      <div className="grid">
        {list.map((p) => <ProductCard key={p.id} p={p} onDelete={() => up({ products: s.products.filter((x) => x.id !== p.id) })} />)}
      </div>
      {open && (
        <form className="card form sheet" onSubmit={add}>
          <b>Add a product</b>
          <input placeholder="Product name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input placeholder="Brand" value={f.brand} onChange={(e) => setF({ ...f, brand: e.target.value })} />
          <select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          <select value={f.rating} onChange={(e) => setF({ ...f, rating: e.target.value })}>{[5, 4.5, 4, 3.5, 3].map((r) => <option key={r} value={r}>★ {r.toFixed(1)}</option>)}</select>
          <div className="two"><Button type="submit">Save product</Button><Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></div>
        </form>
      )}
      <button className="fab" onClick={() => setOpen(true)} aria-label="Add product">+</button>
    </div>
  )
}
