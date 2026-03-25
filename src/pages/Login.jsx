import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const result = login(username, password)
    if (result.success) {
      navigate('/')
    } else {
      setError('Usuario o contrasena incorrectos')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="login" />
      <BackgroundLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-usb-dark font-serif-title mb-8">
              {'¡Inicio sesion!'}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-lg font-bold text-usb-dark">Usuario:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Escribir"
                  className="w-full px-4 py-3 bg-usb-gray-input rounded-lg text-base text-usb-dark placeholder:text-usb-text-gray focus:outline-none focus:ring-2 focus:ring-usb-orange/40"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-lg font-bold text-usb-dark">{'Contrase\u00f1a:'}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Escribir"
                  className="w-full px-4 py-3 bg-usb-gray-input rounded-lg text-base text-usb-dark placeholder:text-usb-text-gray focus:outline-none focus:ring-2 focus:ring-usb-orange/40"
                />

              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="mx-auto px-12 py-3 bg-usb-orange hover:bg-usb-orange-light text-white text-lg font-semibold rounded-full shadow-md transition-all duration-200 cursor-pointer"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </BackgroundLayout>
    </div>
  )
}
