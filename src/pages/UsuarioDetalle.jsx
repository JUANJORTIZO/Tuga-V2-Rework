import { useNavigate, useParams } from 'react-router-dom'
import { getUserByCode } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import FormInput from '../components/FormInput'
import OrangeButton from '../components/OrangeButton'

export default function UsuarioDetalle() {
  const navigate = useNavigate()
  const { code } = useParams()

  const user = getUserByCode(code)

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BackgroundLayout>
          <Panel maxWidth="max-w-lg">
            <p className="text-center text-usb-text-gray py-8">Usuario no encontrado</p>
            <OrangeButton variant="primary" onClick={() => navigate('/usuarios')}>
              Atrás
            </OrangeButton>
          </Panel>
        </BackgroundLayout>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel>
          <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">
            Datos del usuario
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
            <FormInput label="Código:" value={user.code || ''} onChange={() => {}} readOnly />
            <FormInput label="Tipo de documento:" value={user.tipoDocumento || ''} onChange={() => {}} readOnly />
            <FormInput label="Número de documento:" value={user.numeroDocumento || ''} onChange={() => {}} readOnly />

            <FormInput label="Lugar expedición:" value={user.lugarExpedicion || ''} onChange={() => {}} readOnly />
            <FormInput label="Nombres:" value={user.nombres || ''} onChange={() => {}} readOnly />
            <FormInput label="Apellidos:" value={user.apellidos || ''} onChange={() => {}} readOnly />

            <FormInput label="Género:" value={user.genero || ''} onChange={() => {}} readOnly />
            <FormInput label="Correo electrónico:" value={user.correo || ''} onChange={() => {}} readOnly className="md:col-span-2" />
            <FormInput label="Teléfono:" value={user.telefono || ''} onChange={() => {}} readOnly />

            <FormInput label="Dirección:" value={user.direccion || ''} onChange={() => {}} readOnly />
            <FormInput label="Departamento:" value={user.departamento || ''} onChange={() => {}} readOnly />
            <FormInput label="Municipio:" value={user.municipio || ''} onChange={() => {}} readOnly />

            <FormInput label="Estrato:" value={user.estrato || ''} onChange={() => {}} readOnly />
            <FormInput label="Población vulnerable:" value={user.poblacionVulnerable || ''} onChange={() => {}} readOnly />
            <FormInput label="Estado civil:" value={user.estadoCivil || ''} onChange={() => {}} readOnly />

            <FormInput label="Empresa donde trabaja:" value={user.empresaDondeTrabaja || ''} onChange={() => {}} readOnly />
            <FormInput label="Dirección empresa:" value={user.direccionEmpresa || ''} onChange={() => {}} readOnly />
            <FormInput label="Teléfono empresa:" value={user.telefonoEmpresa || ''} onChange={() => {}} readOnly />

            <FormInput label="Ciudad empresa:" value={user.ciudadEmpresa || ''} onChange={() => {}} readOnly />
            <FormInput label="Sueldo:" value={String(user.sueldo || '')} onChange={() => {}} readOnly />
            <FormInput label="Otros ingresos:" value={String(user.otrosIngresos || '')} onChange={() => {}} readOnly />

            <FormInput label="Por concepto de:" value={user.porConceptoDe || ''} onChange={() => {}} readOnly />
            <FormInput label="Tiene vivienda propia:" value={user.tieneViviendaPropia || ''} onChange={() => {}} readOnly />
            <FormInput label="Avalúo catastral:" value={user.avaluoCatastral || ''} onChange={() => {}} readOnly />
          </div>

          <div className="mt-8">
            <OrangeButton variant="primary" onClick={() => navigate('/usuarios')}>
              Atrás
            </OrangeButton>
          </div>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}