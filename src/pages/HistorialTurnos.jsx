import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTurns } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import OrangeButton from '../components/OrangeButton'

export default function HistorialTurnos() {
  const navigate = useNavigate()
  const [turns, setTurns] = useState([])

  useEffect(() => {
    const allTurns = getTurns()
    const completedTurns = allTurns.filter((turn) => turn.estado === 'ATENDIDO')
    setTurns(completedTurns)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel maxWidth="max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-serif-title text-center mb-10">
            Historial de Turnos
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Turno</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Sede</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Usuario</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Código del caso</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Número del caso</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Estado</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {turns.map((turn) => (
                  <tr key={turn.id} className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">{turn.id}</td>
                    <td className="border border-gray-300 px-4 py-3">{turn.sede || ''}</td>
                    <td className="border border-gray-300 px-4 py-3">{turn.userName || turn.usuario || ''}</td>
                    <td className="border border-gray-300 px-4 py-3">{turn.caseCode || ''}</td>
                    <td className="border border-gray-300 px-4 py-3">{turn.caseNumber || ''}</td>
                    <td className="border border-gray-300 px-4 py-3">{turn.estado || ''}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <button
                        onClick={() => navigate(`/casos/${turn.caseCode}`)}
                        className="text-usb-blue-link hover:underline"
                      >
                        Ver caso
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-start mt-8">
            <OrangeButton variant="primary" onClick={() => navigate('/')}>
              Atrás
            </OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}