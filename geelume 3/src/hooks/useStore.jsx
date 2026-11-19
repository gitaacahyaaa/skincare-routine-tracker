import { createContext, useContext, useEffect, useState } from 'react'
import { seed } from '../data/seed'

const KEY = 'geelume-v1'
const Ctx = createContext(null)

export function StoreProvider({ children }) {
  const [s, setS] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || seed() } catch { return seed() }
  })
  // Simpan otomatis setiap data berubah, supaya tidak hilang saat reload
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* penyimpanan penuh */ }
  }, [s])
  const up = (patch) => setS((p) => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }))
  return <Ctx.Provider value={{ s, up }}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)
