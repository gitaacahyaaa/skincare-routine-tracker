import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useStore } from './hooks/useStore.jsx'
import BottomNav from './components/BottomNav.jsx'
import Splash from './pages/Splash.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import Routine from './pages/Routine.jsx'
import Tracker from './pages/Tracker.jsx'
import Products from './pages/Products.jsx'
import Profile from './pages/Profile.jsx'

function Protected() {
  const { s } = useStore()
  if (!s.session) return <Navigate to="/" replace />
  return (<><div className="scroll"><Outlet /></div><BottomNav /></>)
}

export default function App() {
  const { s } = useStore()
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={s.session ? <Navigate to="/home" replace /> : <Splash />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
