import { NavLink } from 'react-router-dom'
const tabs = [
  ['/home', 'Home', '⌂'], ['/routine', 'Routine', '✦'], ['/tracker', 'Journal', '◔'],
  ['/products', 'Products', '❀'], ['/profile', 'Profile', '☺'],
]
export default function BottomNav() {
  return (
    <nav className="nav">
      {tabs.map(([to, label, icon]) => (
        <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'on' : '')}>
          <i>{icon}</i><span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
