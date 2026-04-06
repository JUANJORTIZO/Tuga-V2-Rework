import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye } from 'lucide-react'
import { getUsers } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import OrangeButton from '../components/OrangeButton'

export default function Usuarios() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const users = getUsers()

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return users

    return users.filter((user) => {
      const nombreCompleto = `${user.nombres || ''} ${user.apellidos || ''}`.toLowerCase()
      const documento = String(user.numeroDocumento || '').toLowerCase()

      return nombreCompleto.includes(term) || documento.includes(term)
    })
  }, [search, users])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel>
          <div className="relative mb-8">
            <h2 className="text-2xl md:text-3xl font-serif-title text-center">
              Usuarios
            </h2>

            <div className="w-full md:w-[320px] md:absolute md:right-0 md:top-0 mt-4 md:mt-0">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por cédula o nombre..."
                className="w-full px-4 py-2 rounded-lg bg-usb-gray-input text-sm text-usb-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-usb-orange/40"
              />
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <p className="text-center text-usb-text-gray py-8">
              No se encontraron usuarios
            </p>
          ) : (
            <>
              <div className="hidden md:grid md:grid-cols-[100px_180px_1fr_180px_80px] gap-4 mb-4">
                <span className="font-bold text-usb-dark">Código</span>
                <span className="font-bold text-usb-dark">Documento</span>
                <span className="font-bold text-usb-dark">Nombre</span>
                <span className="font-bold text-usb-dark">Correo</span>
                <span className="font-bold text-usb-dark">Acción</span>
              </div>

              {filteredUsers.map((user) => {
                const nombreCompleto = `${user.nombres || ''} ${user.apellidos || ''}`.trim()

                return (
                  <div
                    key={user.code}
                    className="grid grid-cols-1 md:grid-cols-[100px_180px_1fr_180px_80px] gap-4 items-center py-3 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-2 md:block">
                      <span className="md:hidden font-bold text-usb-dark text-sm">Código:</span>
                      <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block">
                        {user.code}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 md:block">
                      <span className="md:hidden font-bold text-usb-dark text-sm">Documento:</span>
                      <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full">
                        {user.numeroDocumento}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 md:block">
                      <span className="md:hidden font-bold text-usb-dark text-sm">Nombre:</span>
                      <span
                        title={nombreCompleto}
                        className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full"
                      >
                        <span className="truncate block">{nombreCompleto}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 md:block">
                      <span className="md:hidden font-bold text-usb-dark text-sm">Correo:</span>
                      <span
                        title={user.correo || ''}
                        className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full"
                      >
                        <span className="truncate block">{user.correo || ''}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 md:justify-center">
                      <span className="md:hidden font-bold text-usb-dark text-sm">Acción:</span>
                      <button
                        onClick={() => navigate(`/usuarios/${user.code}`)}
                        className="bg-usb-gray-input rounded-lg px-4 py-2 hover:bg-usb-orange/10 transition-colors cursor-pointer"
                      >
                        <Eye size={18} className="text-usb-text-gray" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </>
          )}

          <div className="flex justify-between items-center mt-8">
            <OrangeButton variant="primary" onClick={() => navigate('/')}>
              Atrás
            </OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}