import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser, createTurn } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import OrangeButton from '../components/OrangeButton'

const DOCUMENT_TYPES = [
  'Cedula de ciudadania',
  'Tarjeta de identidad',
  'Cedula de extranjeria',
  'Pasaporte',
  'NIT',
]
const GENEROS = [
  'Masculino',
  'Femenino',
  'No binario',
  'Prefiero no decirlo',
]

const ESTADOS_CIVILES = [
  'Soltero(a)',
  'Casado(a)',
  'Unión libre',
  'Divorciado(a)',
  'Viudo(a)',
]

const ESTRATOS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
]

const POBLACIONES_VULNERABLES = [
  'Ninguna',
  'Víctima del conflicto',
  'Persona con discapacidad',
  'Adulto mayor',
  'Madre cabeza de hogar',
  'Migrante',
  'Población desplazada',
]

const DEPARTAMENTOS = [
  'Valle del Cauca',
  'Cauca',
  'Nariño',
  'Antioquia',
  'Cundinamarca',
  'Atlántico',
  'Santander',
  'Otro',
]
const initialForm = {
  tipoDocumento: '',
  numeroDocumento: '',
  lugarExpedicion: '',
  nombres: '',
  apellidos: '',
  genero: '',
  correo: '',
  telefono: '',
  direccion: '',
  departamento: '',
  municipio: '',
  estrato: '',
  poblacionVulnerable: '',
  estadoCivil: '',
}

export default function CrearUsuario() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1 = form, 2 = confirm
  const [form, setForm] = useState(initialForm)

  function updateField(field) {
    return (value) => setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleNext() {
    if (!form.tipoDocumento || !form.numeroDocumento || !form.nombres || !form.apellidos) {
      alert('Por favor complete los campos obligatorios: Tipo de documento, Numero, Nombres y Apellidos')
      return
    }
    setStep(2)
  }

  function handleCreate() {
    const newUser = createUser({
      ...form,
      empresaDondeTrabaja: '',
      direccionEmpresa: '',
      telefonoEmpresa: '',
      ciudadEmpresa: '',
      sueldo: 0,
      otrosIngresos: 0,
      porConceptoDe: '',
      tieneViviendaPropia: 'No',
      avaluoCatastral: '',
    })

    const turn = createTurn({
      userCode: newUser.code,
      sede: 'La Umbria - Parque tecnologico',
      tipo: 'General',
      fecha: new Date().toISOString().split('T')[0],
    })

    navigate('/asignar/turno-asignado', {
      state: {
        code: newUser.code,
        turnId: turn.id,
        tipoDocumento: newUser.tipoDocumento,
        numeroDocumento: newUser.numeroDocumento,
        nombre: `${newUser.apellidos} ${newUser.nombres}`,
      },
    })
  }

  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BackgroundLayout>
          <Panel>
            <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">Confirmar datos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
              <FormInput label="Tipo de documento:" value={form.tipoDocumento} onChange={() => { }} readOnly />
              <FormInput label="Numero de documento:" value={form.numeroDocumento} onChange={() => { }} readOnly />
              <FormInput label="Lugar expedicion:" value={form.lugarExpedicion} onChange={() => { }} readOnly />
              <FormInput label="Nombres:" value={form.nombres} onChange={() => { }} readOnly />
              <FormInput label="Apellidos:" value={form.apellidos} onChange={() => { }} readOnly />
              <FormInput label="Genero:" value={form.genero} onChange={() => { }} readOnly />
              <FormInput label="Correo Electronico:" value={form.correo} onChange={() => { }} readOnly className="md:col-span-2" />
              <FormInput label="Telefono:" value={form.telefono} onChange={() => { }} readOnly />
              <FormInput label="Direccion:" value={form.direccion} onChange={() => { }} readOnly />
              <FormInput label="Departamento:" value={form.departamento} onChange={() => { }} readOnly />
              <FormInput label="Municipio:" value={form.municipio} onChange={() => { }} readOnly />
              <FormInput label="Estrato:" value={form.estrato} onChange={() => { }} readOnly />
              <FormInput label="Poblacion vulnerable:" value={form.poblacionVulnerable} onChange={() => { }} readOnly />
              <FormInput label="Estado civil:" value={form.estadoCivil} onChange={() => { }} readOnly />
            </div>
            <div className="flex justify-between items-center mt-8">
              <OrangeButton variant="primary" onClick={() => setStep(1)}>
                Atrás
              </OrangeButton>
              <div className="flex gap-4">
                <OrangeButton onClick={handleCreateTurn}>
                  Crear turno
                </OrangeButton>

                <OrangeButton onClick={handleRegisterCase}>
                  Registrar caso
                </OrangeButton>
              </div>
            </div>
          </Panel>
        </BackgroundLayout>
      </div>
    )
  }

  function buildTurnData(userCode) {
    return {
      userCode,
      sede: 'La Umbria - Parque tecnologico',
      tipo: 'General',
      fecha: new Date().toISOString().split('T')[0],
    }
  }

  function handleCreateTurn() {
    const newUser = createUser(form)
    const newTurn = createTurn(buildTurnData(newUser.code))

    navigate('/asignar/turno-asignado', {
      state: {
        code: newUser.code,
        turnId: newTurn.id,
        tipoDocumento: newUser.tipoDocumento,
        numeroDocumento: newUser.numeroDocumento,
        nombre: `${newUser.apellidos} ${newUser.nombres}`,
      },
    })
  }

  function handleRegisterCase() {
    const newUser = createUser(form)
    const newTurn = createTurn(buildTurnData(newUser.code))

    navigate(`/turnos/${newTurn.id}`, {
      state: { initialStep: 2 },
    })
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel>
          <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">Datos usuario</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
            <FormSelect
              label="Tipo de documento:"
              value={form.tipoDocumento}
              onChange={updateField('tipoDocumento')}
              options={DOCUMENT_TYPES}
            />
            <FormInput label="Numero de documento:" value={form.numeroDocumento} onChange={updateField('numeroDocumento')} />
            <FormInput label="Lugar expedicion:" value={form.lugarExpedicion} onChange={updateField('lugarExpedicion')} />
            <FormInput label="Nombres:" value={form.nombres} onChange={updateField('nombres')} />
            <FormInput label="Apellidos:" value={form.apellidos} onChange={updateField('apellidos')} />
            <FormSelect
              label="Genero:"
              value={form.genero}
              onChange={updateField('genero')}
              options={GENEROS}
            />
            <FormInput label="Correo Electronico:" value={form.correo} onChange={updateField('correo')} className="md:col-span-2" />
            <FormInput label="Telefono:" value={form.telefono} onChange={updateField('telefono')} />
            <FormInput label="Direccion:" value={form.direccion} onChange={updateField('direccion')} />
            <FormSelect
              label="Departamento:"
              value={form.departamento}
              onChange={updateField('departamento')}
              options={DEPARTAMENTOS}
            />
            <FormInput label="Municipio:" value={form.municipio} onChange={updateField('municipio')} />
            <FormSelect
              label="Estrato:"
              value={form.estrato}
              onChange={updateField('estrato')}
              options={ESTRATOS}
            />

            <FormSelect
              label="Poblacion vulnerable:"
              value={form.poblacionVulnerable}
              onChange={updateField('poblacionVulnerable')}
              options={POBLACIONES_VULNERABLES}
            />

            <FormSelect
              label="Estado civil:"
              value={form.estadoCivil}
              onChange={updateField('estadoCivil')}
              options={ESTADOS_CIVILES}
            />
          </div>
          <div className="flex justify-between mt-8">
            <OrangeButton variant="primary" onClick={() => navigate('/asignar')}>{'Atr\u00e1s'}</OrangeButton>
            <OrangeButton onClick={handleNext}>Siguiente</OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}
