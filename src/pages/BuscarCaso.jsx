import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCaseByCode } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import FormInput from '../components/FormInput'
import OrangeButton from '../components/OrangeButton'

export default function BuscarCaso() {
  const navigate = useNavigate()
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    setError('')
    if (!codigo.trim()) {
      setError('Ingrese un codigo de caso')
      return
    }
    console.log('[v0] Searching for case with code:', codigo.trim())
    const caso = getCaseByCode(codigo.trim())
    console.log('[v0] Found case:', caso)
    if (!caso) {
      setError('No se encontro un caso con ese codigo')
      return
    }
    console.log('[v0] Navigating to:', `/casos/${caso.codigo}`)
    navigate(`/casos/${caso.codigo}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel maxWidth="max-w-lg">
          <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">Buscar un caso</h2>
          <form onSubmit={handleSearch} className="flex flex-col gap-6">
            <FormInput
              label="Codigo del caso:"
              value={codigo}
              onChange={setCodigo}
              placeholder="Escribir"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="flex justify-between mt-4">
              <OrangeButton variant="primary" onClick={() => navigate('/')}>{'Atr\u00e1s'}</OrangeButton>
              <OrangeButton type="submit">Buscar</OrangeButton>
            </div>
          </form>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}
