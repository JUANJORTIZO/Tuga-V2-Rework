import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import ActionCard from '../components/ActionCard'
import { UserPlus, User, CalendarDays } from 'lucide-react'

export default function Asignar() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row items-center gap-6">

            <ActionCard
              icon={<UserPlus size={48} strokeWidth={2} />}
              label="Crear usuario"
              onClick={() => navigate('/asignar/crear-usuario')}
            />

            <div className="flex items-stretch gap-4">
              <ActionCard
                icon={<User size={48} strokeWidth={2} />}
                label="Usuario creado"
                onClick={() => navigate('/asignar/usuario-creado')}
              />

              <button
                onClick={() => navigate('/turnos')}
                className="w-[90px] md:w-[100px] rounded-2xl border-4 border-white bg-usb-orange text-white shadow-lg hover:scale-105 transition-transform flex flex-col items-center justify-center gap-4 h-full"
              >
                <CalendarDays size={34} strokeWidth={2.2} />
                <span className="text-sm font-bold text-center leading-tight px-2">
                  Ver turnos
                </span>
              </button>
            </div>

          </div>
        </div>
      </BackgroundLayout>
    </div>
  )
}