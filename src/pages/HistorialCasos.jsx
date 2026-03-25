import { useNavigate } from 'react-router-dom'
import { getCases, getUserByCode } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import OrangeButton from '../components/OrangeButton'

export default function HistorialCasos() {
  const navigate = useNavigate()

  const closedCases = getCases()
    .filter((c) => c.estado === 'CERRADO')
    .map((c) => {
      const user = getUserByCode(c.userCode)
      return {
        ...c,
        userName: user ? `${user.nombres} ${user.apellidos}` : c.nombreUsuario || 'Desconocido',
      }
    })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel>
          <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">
            Historial de casos
          </h2>

          {closedCases.length === 0 ? (
            <p className="text-center text-usb-text-gray py-8">
              No hay casos cerrados
            </p>
          ) : (
            <>
              <div className="hidden md:grid md:grid-cols-[110px_180px_1fr_1fr_160px] gap-4 mb-4">
                <span className="font-bold text-usb-dark">Código</span>
                <span className="font-bold text-usb-dark">Número del caso</span>
                <span className="font-bold text-usb-dark">Usuario</span>
                <span className="font-bold text-usb-dark">Tipo</span>
                <span className="font-bold text-usb-dark">Fecha cierre</span>
              </div>

              {closedCases.map((caso) => (
                <div
                  key={caso.codigo}
                  className="grid grid-cols-1 md:grid-cols-[110px_180px_1fr_1fr_160px] gap-4 items-center py-3 border-b border-gray-100"
                >
                  <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block">
                    {caso.codigo}
                  </span>

                  <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full">
                    {caso.numeroCaso}
                  </span>

                  <span
                    title={caso.userName}
                    className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full truncate"
                  >
                    {caso.userName}
                  </span>

                  <span
                    title={caso.tipo}
                    className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full truncate"
                  >
                    {caso.tipo}
                  </span>

                  <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full">
                    {caso.fechaCierre || ''}
                  </span>
                </div>
              ))}
            </>
          )}

          <div className="mt-8">
            <OrangeButton variant="primary" onClick={() => navigate('/casos')}>
              Atrás
            </OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}