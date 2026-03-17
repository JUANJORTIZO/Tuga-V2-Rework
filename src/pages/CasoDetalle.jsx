import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCaseByCode, getUserByCode, addCaseHistory, getSession } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import OrangeButton from '../components/OrangeButton'

export default function CasoDetalle() {
  const navigate = useNavigate()
  const { codigo } = useParams()
  const [caso, setCaso] = useState(null)
  const [user, setUser] = useState(null)
  const [historyForm, setHistoryForm] = useState({ verInforme: false, detalle: '', adjunto: null })

  useEffect(() => {
    loadCase()
  }, [codigo])

  function loadCase() {
    const c = getCaseByCode(codigo)
    if (c) {
      setCaso(c)
      const u = getUserByCode(c.userCode)
      setUser(u)
    }
  }

  function handleAddHistory(e) {
    e.preventDefault()
    if (!historyForm.detalle.trim()) {
      alert('El campo Detalle es obligatorio')
      return
    }
    const session = getSession()
    const now = new Date()
    const fecha = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    addCaseHistory(codigo, {
      fecha,
      estado: 'EN PROCESO',
      abogado: session?.name || 'Desconocido',
      detalle: historyForm.detalle,
      remitidoA: '',
    })
    setHistoryForm({ verInforme: false, detalle: '', adjunto: null })
    loadCase()
  }

  if (!caso) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BackgroundLayout>
          <Panel maxWidth="max-w-lg">
            <p className="text-center text-usb-text-gray py-8">Caso no encontrado</p>
            <OrangeButton variant="primary" onClick={() => navigate('/casos')}>{'Atr\u00e1s'}</OrangeButton>
          </Panel>
        </BackgroundLayout>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel maxWidth="max-w-6xl">
          {/* Case Info Table */}
          <div className="border border-gray-300 text-sm mb-8">
            <InfoRow label="CODIGO" value={caso.codigo} gray />
            <InfoRow
              label="NOMBRE DEL USUARIO"
              value={user ? `${user.nombres} ${user.apellidos}` : caso.nombreUsuario || ''}
            />
            <InfoRow label="DOCUMENTO" value={user?.numeroDocumento || caso.userCode || ''} gray />
            <InfoRow label="FECHA DE REGISTRO" value={caso.fechaRegistro} />
            <InfoRow label="CASO" value={caso.numeroCaso} gray />
            <InfoRow label="TIPO" value={caso.tipo} />
            <InfoRow label="ESTUDIANTE QUE REGISTRA" value={caso.estudianteRegistra} gray />
            <InfoRow label="RELATO DE LOS HECHOS" value={caso.relatoHechos || caso.relato || ''} />
          </div>

          {/* Archivos Adjuntos */}
          <h3 className="text-xl font-bold text-center text-usb-dark mb-4">Archivos Adjuntos</h3>
          <div className="overflow-x-auto mb-8">
            <table className="mx-auto border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 font-bold text-usb-dark">ID ARCHIVO</th>
                  <th className="border border-gray-300 px-4 py-2 font-bold text-usb-dark">FECHA</th>
                  <th className="border border-gray-300 px-4 py-2 font-bold text-usb-dark">NOMBRE DEL ARCHIVO</th>
                </tr>
              </thead>
              <tbody>
                {(caso.attachments || []).map((att) => (
                  <tr key={att.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">{att.id.toLocaleString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{att.fecha}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button className="text-usb-blue-link hover:underline cursor-pointer">{att.nombre}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Historia */}
          <h3 className="text-xl font-bold text-center text-usb-dark mb-4">Historia</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-3 py-2 font-bold text-usb-dark text-left">FECHA</th>
                  <th className="border border-gray-300 px-3 py-2 font-bold text-usb-dark text-left">ESTADO</th>
                  <th className="border border-gray-300 px-3 py-2 font-bold text-usb-dark text-left">ABOGADO</th>
                  <th className="border border-gray-300 px-3 py-2 font-bold text-usb-dark text-left">DETALLE</th>
                  <th className="border border-gray-300 px-3 py-2 font-bold text-usb-dark text-left">REMITIDO A</th>
                </tr>
              </thead>
              <tbody>
                {(caso.history || []).map((h, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">{h.fecha}</td>
                    <td className="border border-gray-300 px-3 py-2">{h.estado}</td>
                    <td className="border border-gray-300 px-3 py-2">{h.abogado}</td>
                    <td className="border border-gray-300 px-3 py-2">{h.detalle}</td>
                    <td className="border border-gray-300 px-3 py-2">{h.remitidoA}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add History Form */}
          <div className="border border-gray-300 rounded-lg p-6 max-w-xl mx-auto mb-8">
            <h4 className="text-base font-bold text-center text-usb-dark mb-4">{'Agregar Informaci\u00f3n a la Historia'}</h4>
            <form onSubmit={handleAddHistory} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-usb-dark">Ver Informe:</label>
                <input
                  type="checkbox"
                  checked={historyForm.verInforme}
                  onChange={(e) => setHistoryForm((p) => ({ ...p, verInforme: e.target.checked }))}
                  className="w-4 h-4 accent-usb-orange cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-usb-dark">{'Detalle:(*)'}</label>
                <textarea
                  value={historyForm.detalle}
                  onChange={(e) => setHistoryForm((p) => ({ ...p, detalle: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-usb-orange/40 resize-vertical"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-usb-dark">Adjuntos:</label>
                <input
                  type="file"
                  onChange={(e) => setHistoryForm((p) => ({ ...p, adjunto: e.target.files[0] }))}
                  className="text-sm text-usb-dark file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-gray-300 file:text-sm file:bg-white file:text-usb-dark hover:file:bg-gray-50 cursor-pointer"
                />
              </div>
              <button
                type="submit"
                className="self-center px-6 py-2 border border-gray-400 rounded text-sm font-semibold text-usb-dark hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Crear Historia
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <OrangeButton variant="primary" onClick={() => navigate('/casos')}>{'Atr\u00e1s'}</OrangeButton>
            <OrangeButton onClick={() => navigate('/')}>Siguiente</OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}

function InfoRow({ label, value, gray = false }) {
  return (
    <div className={`flex border-b border-gray-300 last:border-b-0 ${gray ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="w-1/4 md:w-1/5 p-2 font-bold text-usb-dark text-xs md:text-sm border-r border-gray-300 uppercase">{label}</div>
      <div className="flex-1 p-2 text-usb-dark text-xs md:text-sm break-words">{value}</div>
    </div>
  )
}
