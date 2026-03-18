import { useNavigate } from 'react-router-dom'
import { getSession } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import ActionCard from '../components/ActionCard'
import { Pencil, CalendarDays, Search } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  const session = getSession()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <div className="flex flex-col items-center gap-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-serif-title text-center drop-shadow-lg text-balance">
            {'¡Bienvenido, '}{session?.name || 'Usuario'}{'!'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 max-w-5xl mx-auto">
            <ActionCard
              icon={<Pencil size={48} strokeWidth={2} />}
              label="Asignar Turnos"
              onClick={() => navigate('/asignar')}
            />
            <ActionCard
              icon={<CalendarDays size={48} strokeWidth={2} />}
              label="Ver Turnos"
              onClick={() => navigate('/turnos')}
            />
            <ActionCard
              icon={<Search size={48} strokeWidth={2} />}
              label="Buscar un Caso"
              onClick={() => navigate('/casos')}
            />
          </div>
        </div>
      </BackgroundLayout>
    </div>
  )
}
