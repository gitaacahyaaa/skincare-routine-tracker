export const dayKey = (d = new Date()) => {
  const z = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`
}
export const doneIds = (s, period, key = dayKey()) => s.done[key]?.[period] || []
export const progress = (s, period, key = dayKey()) => {
  const steps = s.routine[period]
  const done = steps.filter((x) => doneIds(s, period, key).includes(x.id)).length
  return { done, total: steps.length, pct: steps.length ? Math.round((done / steps.length) * 100) : 0 }
}
// Hari dihitung streak jika rutinitas pagi DAN malam selesai
const full = (s, key) => ['morning', 'evening'].every((p) => { const g = progress(s, p, key); return g.total > 0 && g.done === g.total })
export const streak = (s) => {
  const d = new Date()
  if (!full(s, dayKey(d))) d.setDate(d.getDate() - 1)
  let n = 0
  while (full(s, dayKey(d))) { n++; d.setDate(d.getDate() - 1) }
  return n
}
export const skinScore = (s) => {
  const v = Object.keys(s.logs).sort().slice(-7).map((k) => s.logs[k])
  return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 20) : null
}
export const weekKeys = () => {
  const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => { const x = new Date(d); x.setDate(d.getDate() + i); return dayKey(x) })
}
export const currentUser = (s) => s.accounts.find((a) => a.email === s.session)
