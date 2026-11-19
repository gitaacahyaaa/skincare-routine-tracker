import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore.jsx'
import { Button, Field } from '../components/ui.jsx'

export default function SignUp() {
  const { s, up } = useStore()
  const go = useNavigate()
  const [login, setLogin] = useState(false)
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const email = f.email.trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('Enter a valid email address.')
    if (f.password.length < 6) return setErr('Password needs at least 6 characters.')
    if (login) {
      const a = s.accounts.find((x) => x.email === email && x.password === f.password)
      if (!a) return setErr('Email or password is incorrect.')
    } else {
      if (!f.name.trim()) return setErr('Enter your name.')
      if (s.accounts.some((x) => x.email === email)) return setErr('This email already has an account. Log in instead.')
      up((p) => ({ accounts: [...p.accounts, { email, name: f.name.trim(), password: f.password }] }))
    }
    up({ session: email })
    go('/home')
  }

  return (
    <form className="signup" onSubmit={submit}>
      <div>
        <span className="logo sm">Geelume</span>
        <h2>{login ? 'Welcome back' : 'Create your Geelume account'}</h2>
      </div>
      {!login && <Field label="Your name" placeholder="Gita" value={f.name} onChange={set('name')} />}
      <Field label="Email address" type="email" placeholder="gita@email.com" value={f.email} onChange={set('email')} />
      <Field label="Password" type="password" placeholder="Enter your password" value={f.password} onChange={set('password')} />
      {err && <p className="err" role="alert">{err}</p>}
      <Button type="submit">{login ? 'Log in' : 'Create account'}</Button>
      <p className="or">or continue with</p>
      <div className="two">
        <Button type="button" variant="ghost" disabled>Google</Button>
        <Button type="button" variant="ghost" disabled>Apple</Button>
      </div>
      <button type="button" className="link" onClick={() => { setLogin(!login); setErr('') }}>
        {login ? 'New here? Create an account' : 'Already have an account? Log in'}
      </button>
      <p className="terms">By continuing, you agree to Geelume’s Terms and Privacy Policy.</p>
    </form>
  )
}
