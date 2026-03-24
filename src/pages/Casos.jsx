import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCases, getUserByCode } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import OrangeButton from '../components/OrangeButton'
import FormInput from '../components/FormInput'
import { Pencil } from 'lucide-react'

export default function Casos() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const cases = getCases()

    const casesWithUsers = cases.map((c) => {
        const user = getUserByCode(c.userCode)
        return {
            ...c,
            userName: user ? `${user.nombres} ${user.apellidos}` : c.nombreUsuario || 'Desconocido',
        }
    })

    const filteredCases = useMemo(() => {
        const term = search.trim().toLowerCase()

        if (!term) return casesWithUsers

        return casesWithUsers.filter((c) => {
            return (
                (c.codigo || '').toLowerCase().includes(term) ||
                (c.numeroCaso || '').toLowerCase().includes(term) ||
                (c.userName || '').toLowerCase().includes(term) ||
                (c.tipo || '').toLowerCase().includes(term)
            )
        })
    }, [search, casesWithUsers])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <BackgroundLayout>
                <Panel>
                    <div className="relative mb-8">
                        <h2 className="text-2xl md:text-3xl font-serif-title text-center">
                            Casos
                        </h2>

                        <div className="w-full md:w-[320px] md:absolute md:right-0 md:top-0 mt-4 md:mt-0">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar caso..."
                                className="w-full px-4 py-2 rounded-lg bg-usb-gray-input text-sm text-usb-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-usb-orange/40"
                            />
                        </div>
                    </div>

                    {filteredCases.length === 0 ? (
                        <p className="text-center text-usb-text-gray py-8">
                            No se encontraron casos
                        </p>
                    ) : (
                        <>
                            <div className="hidden md:grid grid-cols-[110px_180px_1fr_1fr_80px] gap-4 mb-4">
                                <span className="font-bold text-usb-dark">Código</span>
                                <span className="font-bold text-usb-dark">Número del caso</span>
                                <span className="font-bold text-usb-dark">Usuario</span>
                                <span className="font-bold text-usb-dark">Tipo</span>
                                <span className="font-bold text-usb-dark">Acción</span>
                            </div>

                            {filteredCases.map((caso) => (
                                <div
                                    key={caso.codigo}
                                    className="grid grid-cols-1 md:grid-cols-[110px_180px_1fr_1fr_80px] gap-4 items-center py-3 border-b border-gray-100"
                                >
                                    <div className="flex items-center gap-2 md:block">
                                        <span className="md:hidden font-bold text-usb-dark text-sm">Código:</span>
                                        <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block">
                                            {caso.codigo}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 md:block">
                                        <span className="md:hidden font-bold text-usb-dark text-sm">Número del caso:</span>
                                        <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full">
                                            {caso.numeroCaso}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 md:block">
                                        <span className="md:hidden font-bold text-usb-dark text-sm">Usuario:</span>
                                        <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full">
                                            {caso.userName}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 md:block">
                                        <span className="md:hidden font-bold text-usb-dark text-sm">Tipo:</span>
                                        <span className="bg-usb-gray-input rounded-lg px-4 py-2 text-sm text-usb-dark inline-block w-full">
                                            {caso.tipo}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 md:justify-center">
                                        <span className="md:hidden font-bold text-usb-dark text-sm">Acción:</span>
                                        <button
                                            onClick={() => navigate(`/casos/${caso.codigo}`)}
                                            className="bg-usb-gray-input rounded-lg px-4 py-2 hover:bg-usb-orange/10 transition-colors cursor-pointer"
                                        >
                                            <Pencil size={18} className="text-usb-text-gray" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <div className="mt-8">
                        <OrangeButton variant="primary" onClick={() => navigate('/')}>
                            {'Atrás'}
                        </OrangeButton>
                    </div>
                </Panel>
            </BackgroundLayout>
        </div>
    )
}