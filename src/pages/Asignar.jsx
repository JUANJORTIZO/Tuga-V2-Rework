import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import ActionCard from '../components/ActionCard'
import { UserPlus, User } from 'lucide-react'

export default function Asignar() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <ActionCard
            icon={<UserPlus size={48} strokeWidth={2} />}
            label="Crear usuario"
            onClick={() => navigate('/asignar/crear-usuario')}
          />
          <ActionCard
            icon={<User size={48} strokeWidth={2} />}
            label="Usuario creado"
            onClick={() => navigate('/asignar/usuario-creado')}
          />
        </div>
      </BackgroundLayout>
    </div>
  )
}
