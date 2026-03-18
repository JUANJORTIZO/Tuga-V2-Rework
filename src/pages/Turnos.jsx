import { useNavigate } from 'react-router-dom'
import { getTurns, getUserByCode } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import OrangeButton from '../components/OrangeButton'
import { Pencil } from 'lucide-react'

export default function Turnos() {
  const navigate = useNavigate()

  // Traer todos los turnos
  const turns = getTurns()

  // Mostrar solo los turnos pendientes
  const activeTurns = turns.filter((t) => t.estado !== 'ATENDIDO')

  const turnsWithUsers = activeTurns.map((t) => {
    const user = getUserByCode(t.userCode)
    return {
      ...t,
      userName: user ? `${user.nombres} ${user.apellidos}` : t.userName || 'Desconocido',
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-serif-title text-center md:text-left">
              Turnos
            </h2>

            <div className="flex justify-center md:justify-end">
              <OrangeButton onClick={() => navigate('/historial-turnos')}>
                Historial de turnos
              </OrangeButton>
            </div>
          </div>

          {turnsWithUsers.length === 0 ? (
            <p className="text-center text-usb-text-gray py-8">No hay turnos pendientes</p>
          ) : (
            <>
              {/* Header */}
              <div className="hidden md:grid grid-cols-[80px_1fr_1fr_80px] gap-4 mb-4">
                <span className="font-bold text-usb-dark">Turno</span>
                <span className="font-bold text-usb-dark">Sede</span>
                <span className="font-bold text-usb-dark">Usuario</span>
                <span className="font-bold text-usb-dark">Caso</span>
              </div>

              {/* Rows */}
              {turnsWithUsers.map((turn) => (
                <div
                  key={turn.id}
                  className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_80px] gap-4 items-center py-3 border-b border-gray-100"
                >
                  <div className="flex items-center gap-2 md:block">
                    <span className="md:hidden font-bold text-usb-dark text-sm">Turno:</span>
                    <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block">
                      {turn.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 md:block">
                    <span className="md:hidden font-bold text-usb-dark text-sm">Sede:</span>
                    <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full">
                      {turn.sede}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 md:block">
                    <span className="md:hidden font-bold text-usb-dark text-sm">Usuario:</span>
                    <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full">
                      {turn.userName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 md:justify-center">
                    <span className="md:hidden font-bold text-usb-dark text-sm">Caso:</span>
                    <button
                      onClick={() => navigate(`/turnos/${turn.id}`)}
                      className="bg-usb-gray-input rounded-lg px-4 py-2 hover:bg-usb-orange/10 transition-colors cursor-pointer"
                    >
                      <Pencil size={18} className="text-usb-text-gray" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="mt-8">
            <OrangeButton variant="primary" onClick={() => navigate('/')}>
              {'Atrás'}
            </OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
} 