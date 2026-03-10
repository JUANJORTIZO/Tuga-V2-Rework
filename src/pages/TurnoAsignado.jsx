import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import OrangeButton from '../components/OrangeButton'

export default function TurnoAsignado() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state || {}

  const fields = [
    { label: 'Codigo:', value: data.code || '---' },
    { label: 'Turno:', value: data.turnId || '---' },
    { label: 'Tipo de documento:', value: data.tipoDocumento || '---' },
    { label: 'Numero de docuemnto:', value: data.numeroDocumento || '---' },
    { label: 'Nombre:', value: data.nombre || '---' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel maxWidth="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">Turno asignado</h2>
          <div className="bg-usb-gray-bg rounded-xl p-6 md:p-8">
            {fields.map((f) => (
              <div key={f.label} className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
                <span className="text-lg font-bold text-usb-dark w-1/2">{f.label}</span>
                <span className="text-lg text-usb-dark">{f.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <OrangeButton variant="primary" onClick={() => navigate('/asignar')}>{'Atr\u00e1s'}</OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}
