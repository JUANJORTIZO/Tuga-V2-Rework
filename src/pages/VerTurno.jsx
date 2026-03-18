import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTurnById, getUserByCode, updateTurn, createCaseFromTurn, getSession, completeTurn } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import OrangeButton from '../components/OrangeButton'

const DOCUMENT_TYPES = [
  'Cedula de ciudadania',
  'Tarjeta de identidad',
  'Cedula de extranjeria',
  'Pasaporte',
  'NIT',
]

const PROFESORES = [
  'Seleccionar...',
  'ISABELLA RIOS',
  'NATHALIA FUENTES',
  'JUAN PEREZ',
]

const AREAS_DERECHO = [
  'Seleccionar...',
  'Derecho laboral',
  'Derecho civil',
  'Derecho penal',
  'Derecho de familia',
]

const TIPOS_NEGOCIO = [
  'Seleccionar...',
  'Consulta',
  'Demanda',
  'Asesoría',
  'Conciliación',
]

const ESTUDIANTES = [
  'Seleccionar...',
  'ISABELLA MOLINA SANCHEZ',
  'NATHALIA BURBANO DIAZ',
  'JUAN PEREZ',
]

export default function VerTurno() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [step, setStep] = useState(1)
  const [turn, setTurn] = useState(null)
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({})
  const [caseForm, setCaseForm] = useState({
    relato: '',
    profesorConsultor: 'Seleccionar...',
    sede: '',
    areaDerecho: 'Seleccionar...',
    tipoNegocio: 'Seleccionar...',
  })

  const [pretForm, setPretForm] = useState({
    pretensiones: '',
    observaciones: '',
    adjuntos: null,
    asignarA: 'Seleccionar...',
  })

  useEffect(() => {
    const t = getTurnById(id)
    if (t) {
      setTurn(t)
      const u = getUserByCode(t.userCode)
      if (u) {
        setUser(u)
        setForm({ ...u })
        setCaseForm((prev) => ({ ...prev, sede: t.sede }))
      }
    }
  }, [id])

  function updateField(field) {
    return (value) => setForm((prev) => ({ ...prev, [field]: value }))
  }

  function getNombreCompleto() {
    return `${form.nombres || ''} ${form.apellidos || ''}`.trim()
  }

  function handleCreateCase() {
    const session = getSession()

    const newCase = createCaseFromTurn({
      userCode: form.numeroDocumento || turn.userCode || '',
      tipo: caseForm.areaDerecho || caseForm.tipoNegocio || '',
      estudianteRegistra: session?.name || 'Desconocido',
      estudianteAsignado: pretForm.asignarA || '',
      fechaRegistro: turn.fecha || new Date().toLocaleString('es-CO'),
      nombreUsuario: getNombreCompleto(),
      relatoHechos: caseForm.relato || '',
      observaciones: pretForm.observaciones || '',
      pretensiones: pretForm.pretensiones || '',
      sede: caseForm.sede || turn.sede || '',
      attachments: pretForm.adjuntos
        ? [
          {
            id: Date.now(),
            fecha: new Date().toLocaleString('es-CO'),
            nombre: pretForm.adjuntos.name,
          },
        ]
        : [],
      history: [],
    })

    completeTurn(turn.id, newCase.codigo, newCase.numeroCaso, getNombreCompleto())

    navigate(`/casos/${newCase.codigo}`)
  }

  function handleStepTwoNext() {
    if (!caseForm.relato.trim()) {
      alert('Debes escribir el relato de los hechos')
      return
    }

    if (caseForm.profesorConsultor === 'Seleccionar...') {
      alert('Debes seleccionar un profesor consultor')
      return
    }

    if (caseForm.areaDerecho === 'Seleccionar...') {
      alert('Debes seleccionar un área del derecho')
      return
    }

    if (caseForm.tipoNegocio === 'Seleccionar...') {
      alert('Debes seleccionar un tipo de negocio')
      return
    }

    setStep(3)
  }

  function handleStepThreeNext() {
    if (pretForm.asignarA === 'Seleccionar...') {
      alert('Debes seleccionar a quién asignar el caso')
      return
    }

    setStep(4)
  }

  if (!turn || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BackgroundLayout>
          <Panel maxWidth="max-w-lg">
            <p className="text-center text-usb-text-gray py-8">Turno no encontrado</p>
            <OrangeButton variant="primary" onClick={() => navigate('/turnos')}>{'Atr\u00e1s'}</OrangeButton>
          </Panel>
        </BackgroundLayout>
      </div>
    )
  }

  // Step 1: Datos usuario
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BackgroundLayout>
          <Panel>
            <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">Datos usuario</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
              <FormSelect label="Tipo de documento:" value={form.tipoDocumento || ''} onChange={updateField('tipoDocumento')} options={DOCUMENT_TYPES} />
              <FormInput label="Numero de documento:" value={form.numeroDocumento || ''} onChange={updateField('numeroDocumento')} />
              <FormInput label="Lugar expedicion:" value={form.lugarExpedicion || ''} onChange={updateField('lugarExpedicion')} />
              <FormInput label="Nombres:" value={form.nombres || ''} onChange={updateField('nombres')} />
              <FormInput label="Apellidos:" value={form.apellidos || ''} onChange={updateField('apellidos')} />
              <FormInput label="Genero:" value={form.genero || ''} onChange={updateField('genero')} />
              <FormInput label="Correo Electronico:" value={form.correo || ''} onChange={updateField('correo')} className="md:col-span-2" />
              <FormInput label="Telefono:" value={form.telefono || ''} onChange={updateField('telefono')} />
              <FormInput label="Direccion:" value={form.direccion || ''} onChange={updateField('direccion')} />
              <FormInput label="Departamento:" value={form.departamento || ''} onChange={updateField('departamento')} />
              <FormInput label="Municipio:" value={form.municipio || ''} onChange={updateField('municipio')} />
              <FormInput label="Estrato:" value={form.estrato || ''} onChange={updateField('estrato')} />
              <FormInput label="Poblacion vulnerable:" value={form.poblacionVulnerable || ''} onChange={updateField('poblacionVulnerable')} />
              <FormInput label="Estado civil:" value={form.estadoCivil || ''} onChange={updateField('estadoCivil')} />
            </div>
            <div className="flex justify-between mt-8">
              <OrangeButton variant="primary" onClick={() => navigate('/turnos')}>{'Atr\u00e1s'}</OrangeButton>
              <OrangeButton onClick={() => setStep(2)}>Siguiente</OrangeButton>
            </div>
          </Panel>
        </BackgroundLayout>
      </div>
    )
  }

  // Step 2: Relato de los hechos
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BackgroundLayout>
          <Panel>
            <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">Relato de los hechos</h2>
            <FormTextarea
              value={caseForm.relato}
              onChange={(v) => setCaseForm((p) => ({ ...p, relato: v }))}
              rows={8}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-8">
              <FormSelect
                label="Profesor Consultor:"
                value={caseForm.profesorConsultor}
                onChange={(v) => setCaseForm((p) => ({ ...p, profesorConsultor: v }))}
                options={PROFESORES}
              />
              <FormSelect label="Sede:" value={caseForm.sede} onChange={(v) => setCaseForm((p) => ({ ...p, sede: v }))} options={['La Umbria - Parque tecnologico', 'Centro', 'Norte']} />
              <FormSelect
                label="Área del derecho:"
                value={caseForm.areaDerecho}
                onChange={(v) => setCaseForm((p) => ({ ...p, areaDerecho: v }))}
                options={AREAS_DERECHO}
              />
              <FormSelect
                label="Tipo de negocio:"
                value={caseForm.tipoNegocio}
                onChange={(v) => setCaseForm((p) => ({ ...p, tipoNegocio: v }))}
                options={TIPOS_NEGOCIO}
              />
            </div>
            <div className="flex justify-between mt-8">
              <OrangeButton variant="primary" onClick={() => setStep(1)}>{'Atr\u00e1s'}</OrangeButton>
              <OrangeButton onClick={handleStepTwoNext}>Siguiente</OrangeButton>
            </div>
          </Panel>
        </BackgroundLayout>
      </div>
    )
  }

  // Step 3: Pretensiones
  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BackgroundLayout>
          <Panel>
            <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">Pretensiones</h2>
            <FormTextarea
              value={pretForm.pretensiones}
              onChange={(v) => setPretForm((p) => ({ ...p, pretensiones: v }))}
              rows={6}
            />
            <div className="mt-6">
              <FormTextarea
                label="Observaciones:"
                value={pretForm.observaciones}
                onChange={(v) => setPretForm((p) => ({ ...p, observaciones: v }))}
                rows={6}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm md:text-base font-bold text-usb-dark">Adjuntos:</label>
                <input
                  type="file"
                  onChange={(e) => setPretForm((p) => ({ ...p, adjuntos: e.target.files[0] }))}
                  className="text-sm text-usb-dark file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-usb-gray-input file:text-usb-dark hover:file:bg-usb-orange/10 cursor-pointer"
                />
              </div>
              <FormSelect
                label="Asignar a:"
                value={pretForm.asignarA}
                onChange={(v) => setPretForm((p) => ({ ...p, asignarA: v }))}
                options={ESTUDIANTES}
              />
            </div>
            <div className="flex justify-between mt-8">
              <OrangeButton variant="primary" onClick={() => setStep(2)}>{'Atr\u00e1s'}</OrangeButton>
              <OrangeButton onClick={handleStepThreeNext}>Siguiente</OrangeButton>
            </div>
          </Panel>
        </BackgroundLayout>
      </div>
    )
  }

  // Step 4: Document / receipt view
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel maxWidth="max-w-6xl">
          {/* University header */}
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-usb-dark">UNIVERSIDAD DE SAN BUENAVENTURA CALI</h2>
            <p className="text-sm md:text-base font-semibold text-usb-dark mt-1">{'Consultorio Jur\u00eddico y Centro de Conciliaci\u00f3n Acad\u00e9mico'}</p>
          </div>

          {/* Case info table */}
          <div className="border border-gray-300 text-sm">
            <TableRow label="FECHA" value={turn.fecha || ''} gray />
            <TableRow label="SEDE" value={caseForm.sede || turn.sede || ''} />
            <TableRow label="TURNO" value={String(turn.id)} gray />
            <TableRow label="ESTUDIANTE QUE REGISTRA" value={pretForm.asignarA || ''} />
            <TableRow label="ESTUDIANTE ASIGNADO" value="" gray />
            <TableRow label="CASO" value={caseForm.areaDerecho || caseForm.tipoNegocio || ''} />
            <TableRow label="NUMERO DE CASO" value="Se generará al guardar" gray />
          </div>

          {/* No info message */}
          <div className="border border-gray-300 border-t-0 p-3 text-center text-sm font-semibold text-usb-dark">
            NO SE OBTUVO INFORMACION EN LA CONSULTA
          </div>

          {/* Employment info */}
          <div className="border border-gray-300 border-t-0 text-sm mt-0">
            <TableRow label="EMPRESA DONDE TRABAJA" value={form.empresaDondeTrabaja || ''} gray />
            <TableRow label="DIRECCION" value={form.direccionEmpresa || ''} />
            <TableRow label="TELEFONO" value={form.telefonoEmpresa || ''} gray />
            <TableRow label="CIUDAD" value={form.ciudadEmpresa || ''} />
            <TableRow label="SUELDO" value={String(form.sueldo || 0)} gray />
            <TableRow label="OTROS INGRESOS" value={String(form.otrosIngresos || 0)} />
            <TableRow label="POR CONCEPTO DE" value={form.porConceptoDe || ''} gray />
            <TableRow label="TIENE VIVIENDA PROPIA" value={form.tieneViviendaPropia || ''} />
            <TableRow label="AVALUO CATASTRAL" value={form.avaluoCatastral || ''} gray />
          </div>

          {/* Case details */}
          <div className="border border-gray-300 border-t-0 text-sm mt-4">
            <TableRow label="TIPO DE GESTION" value={caseForm.tipoNegocio || ''} />
            <TableRow label="RELATO DE LOS HECHOS" value={caseForm.relato || ''} gray />
            <TableRow label="OBSERVACIONES" value={pretForm.observaciones || ''} />
            <TableRow label="PRETENSIONES" value={pretForm.pretensiones || ''} gray />
            <div className="flex border-b border-gray-300 bg-usb-blue-highlight/50">
              <div className="w-1/3 md:w-1/4 p-2 font-bold text-usb-dark border-r border-gray-300">ADELANTO DE TRAMITE</div>
              <div className="flex-1 p-2 text-usb-dark"></div>
            </div>
            <TableRow label="ENTIDAD TRAMITE" value="" />
            <TableRow label="DESCRIPCION TRAMITE" value="" gray />
          </div>

          {/* Signatures */}
          <div className="mt-8 space-y-6">
            <div>
              <p className="font-bold text-sm text-usb-dark">FIRMA DEL USUARIO:</p>
              <div className="border-b border-gray-400 mt-4 w-64" />
            </div>
            <div>
              <p className="font-bold text-sm text-usb-dark">FIRMA DEL ESTUDIANTE:</p>
              <div className="border-b border-gray-400 mt-4 w-64" />
            </div>
            <div>
              <p className="font-bold text-sm text-usb-dark">FIRMA DEL COORDINADOR:</p>
              <div className="border-b border-gray-400 mt-4 w-64" />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <OrangeButton variant="primary" onClick={() => setStep(3)}>
              {'Atrás'}
            </OrangeButton>
            <OrangeButton onClick={handleCreateCase}>
              Guardar caso
            </OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}

function TableRow({ label, value, gray = false }) {
  return (
    <div className={`flex border-b border-gray-300 ${gray ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="w-1/3 md:w-1/4 p-2 font-bold text-usb-dark text-xs md:text-sm border-r border-gray-300">{label}</div>
      <div className="flex-1 p-2 text-usb-dark text-xs md:text-sm break-words">{value}</div>
    </div>
  )
}
