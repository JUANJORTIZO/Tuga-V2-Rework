import { Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from './services/storage'
import Login from './pages/Login'
import Home from './pages/Home'
import Asignar from './pages/Asignar'
import CrearUsuario from './pages/CrearUsuario'
import UsuarioCreado from './pages/UsuarioCreado'
import TurnoAsignado from './pages/TurnoAsignado'
import Turnos from './pages/Turnos'
import VerTurno from './pages/VerTurno'
import Casos from './pages/Casos'
import CasoDetalle from './pages/CasoDetalle'
import HistorialTurnos from './pages/HistorialTurnos'
import HistorialCasos from './pages/HistorialCasos'


function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/asignar" element={<ProtectedRoute><Asignar /></ProtectedRoute>} />
      <Route path="/asignar/crear-usuario" element={<ProtectedRoute><CrearUsuario /></ProtectedRoute>} />
      <Route path="/asignar/usuario-creado" element={<ProtectedRoute><UsuarioCreado /></ProtectedRoute>} />
      <Route path="/asignar/turno-asignado" element={<ProtectedRoute><TurnoAsignado /></ProtectedRoute>} />
      <Route path="/turnos" element={<ProtectedRoute><Turnos /></ProtectedRoute>} />
      <Route path="/turnos/:id" element={<ProtectedRoute><VerTurno /></ProtectedRoute>} />
      <Route path="/casos" element={<ProtectedRoute><Casos /></ProtectedRoute>} />
      <Route path="/casos/:codigo" element={<ProtectedRoute><CasoDetalle /></ProtectedRoute>} />
      <Route path="/historial-turnos" element={<ProtectedRoute><HistorialTurnos /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route
        path="/casos/historial"
        element={
          <ProtectedRoute>
            <HistorialCasos />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
