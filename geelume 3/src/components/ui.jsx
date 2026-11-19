export const Button = ({ variant = 'solid', className = '', ...p }) => (
  <button className={`btn btn-${variant} ${className}`} {...p} />
)
export const Card = ({ className = '', ...p }) => <div className={`card ${className}`} {...p} />
export const Chip = ({ active, tone, className = '', ...p }) => (
  <button type="button" className={`chip ${active ? 'on' : ''} ${tone || ''} ${className}`} {...p} />
)
export const ProgressBar = ({ pct }) => (
  <div className="bar"><div style={{ width: `${pct}%` }} /></div>
)
export const Field = ({ label, ...p }) => (
  <label className="field"><span>{label}</span><input {...p} /></label>
)
export const Header = ({ title, onBack }) => (
  <header className="head">
    {onBack ? <button className="back" onClick={onBack} aria-label="Back">‹</button> : <span />}
    <h1>{title}</h1><span />
  </header>
)
// Ilustrasi SVG per kategori (gambar sendiri, bebas copyright)
const S = { stroke: '#E8A5B8', strokeWidth: 2 }
const ART = {
  Cleanser: ( // tube
    <g><path d="M14 18h32l-4 38H18z" fill="#fff" {...S} /><rect x="18" y="8" width="24" height="10" rx="3" fill="#C9708A" />
    <rect x="21" y="30" width="18" height="12" rx="3" fill="#F6D4DE" /><circle cx="30" cy="36" r="3" fill="#E8A5B8" /></g>),
  Toner: ( // botol dengan leher
    <g><rect x="25" y="6" width="10" height="10" rx="2" fill="#C9708A" /><path d="M25 16h10v6c8 4 10 10 10 18v12a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V40c0-8 2-14 10-18z" fill="#fff" {...S} />
    <path d="M16 38h28v14a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3z" fill="#DDEFF3" /></g>),
  Serum: ( // botol pipet
    <g><ellipse cx="30" cy="9" rx="6" ry="7" fill="#C9708A" /><rect x="25" y="14" width="10" height="8" fill="#E8A5B8" /><rect x="16" y="22" width="28" height="34" rx="6" fill="#fff" {...S} />
    <rect x="16" y="34" width="28" height="22" rx="6" fill="#FBE3B8" /><rect x="28" y="22" width="4" height="22" fill="#fff" opacity=".7" /></g>),
  Moisturizer: ( // jar
    <g><rect x="10" y="18" width="40" height="10" rx="4" fill="#C9708A" /><path d="M12 28h36v20a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z" fill="#fff" {...S} />
    <rect x="20" y="36" width="20" height="8" rx="3" fill="#F6D4DE" /></g>),
  Sunscreen: ( // tube berdiri kuning
    <g><path d="M13 14h34l-2 42H15z" fill="#FFF1C9" {...S} /><rect x="13" y="6" width="34" height="8" rx="3" fill="#C9708A" />
    <circle cx="30" cy="34" r="7" fill="#F7C95C" /><path d="M30 22v-3M30 49v-3M18 34h-3M45 34h-3" stroke="#F7C95C" strokeWidth="2" strokeLinecap="round" /></g>),
  Hydrator: ( // pot lip mask / droplet
    <g><rect x="12" y="28" width="36" height="22" rx="8" fill="#fff" {...S} /><rect x="10" y="20" width="40" height="10" rx="5" fill="#C9708A" />
    <path d="M30 33c4 5 6 7 6 10a6 6 0 0 1-12 0c0-3 2-5 6-10z" fill="#F4B6C6" /></g>),
}
const Art = ({ category }) => (
  <svg viewBox="0 0 60 60" width="54" height="54" role="img" aria-label={category}>{ART[category] || ART.Serum}</svg>
)
export const ProductCard = ({ p, onDelete }) => (
  <Card className="pcard">
    <div className="pimg"><Art category={p.category} /></div>
    <b>{p.name}</b><small>{p.brand}</small>
    <div className="prow"><span className="pill">{p.category}</span><span className="star">★ {p.rating.toFixed(1)}</span></div>
    <button className="x" onClick={onDelete} aria-label={`Delete ${p.name}`}>×</button>
  </Card>
)
