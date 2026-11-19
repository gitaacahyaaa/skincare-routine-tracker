import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui.jsx'
export default function Splash() {
  const go = useNavigate()
  return (
    <div className="splash">
      <div className="orbs"><i className="o1" /><i className="o2" /></div>
      <div className="brand"><h1 className="logo">Geelume</h1><p>Glow in your own rhythm.</p></div>
      <Button onClick={() => go('/signup')}>Begin your ritual</Button>
    </div>
  )
}
