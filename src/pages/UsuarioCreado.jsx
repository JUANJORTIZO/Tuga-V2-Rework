import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserByDocument } from '../services/storage'
import Navbar from '../components/Navbar'
import BackgroundLayout from '../components/BackgroundLayout'
import Panel from '../components/Panel'
import FormInput from '../components/FormInput'
import OrangeButton from '../components/OrangeButton'

export default function UsuarioCreado() {
  const navigate = useNavigate()
  const [documento, setDocumento] = useState('')
  const [error, setError] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    setError('')

    const value = documento.trim()

    if (!value) {
      setError('Debes ingresar un numero de documento')
      return
    }

    const user = getUserByDocument(value)

    if (!user) {
      setError('No se encontro un usuario con ese numero de documento')
      return
    }

    navigate('/asignar/crear-usuario', {
      state: {
        existingUser: user,
        startInConfirm: true, // 👈 NUEVO
      },
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundLayout>
        <Panel maxWidth="max-w-lg">
          <h2 className="text-2xl md:text-3xl font-serif-title text-center mb-8">
            Usuario creado
          </h2>

          <form onSubmit={handleSearch} className="flex flex-col gap-6">
            <FormInput
              label="Numero de documento:"
              value={documento}
              onChange={setDocumento}
              placeholder="Escribir"
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-between mt-4">
              <OrangeButton
                variant="primary"
                onClick={() => navigate('/asignar')}
              >
                {'Atrás'}
              </OrangeButton>

              <OrangeButton type="submit">
                Buscar
              </OrangeButton>
            </div>
          </form>
        </Panel>
      </BackgroundLayout>
    </div>
  )
}