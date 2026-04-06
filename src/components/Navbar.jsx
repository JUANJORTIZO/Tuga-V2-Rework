import { useNavigate } from 'react-router-dom'
import { logout } from '../services/storage'
import { Link, useLocation } from 'react-router-dom'
import { Bell, HelpCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { isAuthenticated } from '../services/storage'

export default function Navbar({ variant = 'default' }) {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isLogin = variant === 'login'
  const authed = isAuthenticated()

  const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Asignar', to: '/asignar' },
    { label: 'Turnos', to: '/turnos' },
    { label: 'Casos', to: '/casos' },
    { label: 'Usuarios', to: '/usuarios' },
  ]

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-sm px-4 md:px-8 h-[70px] shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/images/logousb.png"
            className="hidden sm:block h-18 md:h-20 lg:h-22 w-auto object-contain"
          />
          <div className="hidden sm:block w-px h-10 bg-usb-dark/30" />
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-usb-dark">CONSULTORIO</p>
            <p className="text-sm font-bold leading-tight text-usb-dark">JURIDICO</p>
          </div>
        </div>
      </div>

      {authed && !isLogin && (
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg font-semibold transition-colors hover:text-usb-orange ${
                location.pathname === link.to || location.pathname.startsWith(link.to + '/')
                  ? 'text-usb-orange'
                  : 'text-usb-dark'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        {isLogin ? (
          <button className="w-11 h-11 rounded-full bg-usb-tan/80 flex items-center justify-center text-white hover:bg-usb-tan transition-colors">
            <HelpCircle size={22} />
          </button>
        ) : (
          <button className="w-11 h-11 rounded-full bg-usb-tan/80 flex items-center justify-center text-white hover:bg-usb-tan transition-colors">
            <Bell size={22} />
          </button>
        )}

        {authed && !isLogin && (
          <button
            onClick={handleLogout}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-usb-orange text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Cerrar sesión
          </button>
        )}

        {authed && !isLogin && (
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {mobileOpen && authed && !isLogin && (
        <div className="absolute top-[70px] left-0 right-0 bg-white shadow-lg md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-lg font-semibold text-usb-dark hover:bg-usb-gray-bg border-b border-gray-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}