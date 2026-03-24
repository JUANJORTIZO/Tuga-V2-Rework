const STORAGE_KEYS = {
  SESSION: 'cj_session',
  USERS: 'cj_users',
  TURNS: 'cj_turns',
  CASES: 'cj_cases',
  INITIALIZED: 'cj_initialized',
}

const SEED_DATA = {
  admins: [
    { username: 'admin', password: 'admin', name: 'Administrador' },
    { username: 'isabella', password: '1234', name: 'Isabella Molina Sanchez' },
    { username: 'Erazo', password: '4321', name: 'Santiago Erazo Ortega' },
  ],
  users: [
    {
      code: '0001',
      tipoDocumento: 'Cedula de ciudadania',
      numeroDocumento: '1107654321',
      lugarExpedicion: 'Cali',
      nombres: 'Santiago',
      apellidos: 'Erazo',
      genero: 'Masculino',
      correo: 'santiago.erazo@mail.com',
      telefono: '3001234567',
      direccion: 'Cra 5 #10-20',
      departamento: 'Valle del Cauca',
      municipio: 'Cali',
      estrato: '3',
      poblacionVulnerable: 'No',
      estadoCivil: 'Soltero',
      empresaDondeTrabaja: '',
      direccionEmpresa: '',
      telefonoEmpresa: '',
      ciudadEmpresa: '',
      sueldo: 0,
      otrosIngresos: 0,
      porConceptoDe: '',
      tieneViviendaPropia: 'No',
      avaluoCatastral: '',
    },
    {
      code: '0002',
      tipoDocumento: 'Cedula de ciudadania',
      numeroDocumento: '1107838564',
      lugarExpedicion: 'Cali',
      nombres: 'Sebastian',
      apellidos: 'Rojas Pineda',
      genero: 'Masculino',
      correo: 'sebastian.rojas@mail.com',
      telefono: '3109876543',
      direccion: 'Calle 13 #25-10',
      departamento: 'Valle del Cauca',
      municipio: 'Cali',
      estrato: '2',
      poblacionVulnerable: 'No',
      estadoCivil: 'Soltero',
      empresaDondeTrabaja: '',
      direccionEmpresa: '',
      telefonoEmpresa: '',
      ciudadEmpresa: '',
      sueldo: 0,
      otrosIngresos: 0,
      porConceptoDe: '',
      tieneViviendaPropia: 'No',
      avaluoCatastral: '',
    },
    {
      code: '11.151',
      tipoDocumento: 'Cedula de ciudadania',
      numeroDocumento: '12908887',
      lugarExpedicion: 'Cali',
      nombres: 'Ruben',
      apellidos: 'Jimenez Boya',
      genero: 'Masculino',
      correo: 'ruben.jimenez@mail.com',
      telefono: '3201112233',
      direccion: 'Av 3N #45-10',
      departamento: 'Valle del Cauca',
      municipio: 'Cali',
      estrato: '2',
      poblacionVulnerable: 'No',
      estadoCivil: 'Casado',
      empresaDondeTrabaja: '',
      direccionEmpresa: '',
      telefonoEmpresa: '',
      ciudadEmpresa: '',
      sueldo: 0,
      otrosIngresos: 0,
      porConceptoDe: '',
      tieneViviendaPropia: 'No',
      avaluoCatastral: '',
    },
  ],
  turns: [
    {
      id: 1,
      userCode: '0001',
      sede: 'La Umbria - Parque tecnologico',
      tipo: 'Civil',
      fecha: '2025-08-10',
    },
    {
      id: 2,
      userCode: '0002',
      sede: 'La Umbria - Parque tecnologico',
      tipo: 'Penal',
      fecha: '2025-08-12',
    },
  ],
  cases: [
    {
      /*  git add .
          git commit -m "actualizacion del proyecto"
          git push   */ 

      // ELA22005525

      codigo: '5525',
      numeroCaso: 'ELA22005525',
      userCode: '11.151',
      tipo: 'Concepto por Areas - Derecho Laboral',
      estudianteRegistra: 'ISABELLA MOLINA SANCHEZ',
      estudianteAsignado: '',
      fechaRegistro: '14-08-2025 20:02',
      relato: 'Los familiares del senor Ruben Jimenez Boya acuden a consulta refiriendo que su hermano presto servicio militar en la marina y posee una discapacidad cognitiva progresiva. El senor Ruben es acreedor de un bono pensional que ya fue aprobado por el fondo pensional, pero aun asi no han sido pagados en favor del antes mencionado, aun despues de que sus familiares intentaran realizar diligencias de consulta y tramite ante el fondo pensional y estos tuviesen respuestas incompletas a sus pretensiones, por lo tanto recurren al consultorio juridico en busca de asesoria.',
      observaciones: '',
      pretensiones: '',
      profesorConsultor: '',
      sede: 'La Umbria - Parque tecnologico',
      areaDerecho: 'Derecho Laboral',
      tipoNegocio: 'Concepto por Areas',
      attachments: [
        { id: 12862, fecha: '19-08-2025 21:32', nombre: 'Concepto juridico apoyos.xlsx' },
        { id: 12863, fecha: '19-08-2025 21:32', nombre: 'Resumen visual.png' },
        { id: 12865, fecha: '20-08-2025 08:46', nombre: 'Concepto juridico apoyos.xlsx' },
        { id: 12910, fecha: '21-08-2025 17:25', nombre: 'Concepto juridico apoyos.3.xlsx' },
        { id: 12983, fecha: '22-08-2025 23:34', nombre: 'EVIDENCIA REMISION CONCEPTO JURIDICO.pdf' },
      ],
      history: [
        { fecha: '19-08-2025 21:32', estado: 'EN PROCESO', abogado: 'ISABELLA MOLINA SANCHEZ', detalle: 'Adjunto concepto juridico e imagen del resumen visual', remitidoA: '' },
        { fecha: '20-08-2025 08:46', estado: 'EN PROCESO', abogado: 'NATHALIA BURBANO DIAZ', detalle: 'Revisar correcciones.', remitidoA: '' },
        { fecha: '21-08-2025 17:25', estado: 'EN PROCESO', abogado: 'ISABELLA MOLINA SANCHEZ', detalle: 'Correccion', remitidoA: '' },
        { fecha: '22-08-2025 11:26', estado: 'EN PROCESO', abogado: 'NATHALIA BURBANO DIAZ', detalle: 'Aprobado para remision. Subir el soporte de envio al usuario', remitidoA: '' },
        { fecha: '22-08-2025 23:33', estado: 'EN PROCESO', abogado: 'ISABELLA MOLINA SANCHEZ', detalle: 'Adjunto evidencia de envio al usuario', remitidoA: '' },
      ],
    },
  ],
}

function initializeStorage() {
  if (localStorage.getItem(STORAGE_KEYS.INITIALIZED)) return
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_DATA.users))
  localStorage.setItem(STORAGE_KEYS.TURNS, JSON.stringify(SEED_DATA.turns))
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(SEED_DATA.cases))
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true')
}

initializeStorage()

// Auth
export function login(username, password) {
  const admins = getAdmins()
  const user = admins.find((u) => u.username === username && u.password === password)

  if (user) {
    const sessionData = { 
      username: user.username, 
      name: user.name, 
      loginTime: new Date().getTime() 
    }
    
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData))
    return { success: true, user }
  }
  return { success: false }
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEYS.SESSION)
}

export function getSession() {
  const data = sessionStorage.getItem(STORAGE_KEYS.SESSION)
  return data ? JSON.parse(data) : null
}

export function isAuthenticated() {
 
  return sessionStorage.getItem(STORAGE_KEYS.SESSION) !== null
}
// Users
export function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
}

export function getUserByDocument(doc) {
  return getUsers().find((u) => u.numeroDocumento === doc) || null
}

export function getUserByCode(code) {
  return getUsers().find((u) => u.code === code) || null
}

export function createUser(data) {
  const users = getUsers()
  const nextNum = users.length + 1
  const code = String(nextNum).padStart(4, '0')
  const newUser = { ...data, code }
  users.push(newUser)
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  return newUser
}

// Turns
export function getTurns() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.TURNS) || '[]')
}

export function getTurnById(id) {
  return getTurns().find((t) => t.id === Number(id)) || null
}

export function createTurn(data) {
  const turns = getTurns()
  const nextId = turns.length > 0 ? Math.max(...turns.map((t) => t.id)) + 1 : 1
  const newTurn = { ...data, id: nextId }
  turns.push(newTurn)
  localStorage.setItem(STORAGE_KEYS.TURNS, JSON.stringify(turns))
  return newTurn
}

export function updateTurn(id, data) {
  const turns = getTurns()
  const idx = turns.findIndex((t) => t.id === Number(id))
  if (idx !== -1) {
    turns[idx] = { ...turns[idx], ...data }
    localStorage.setItem(STORAGE_KEYS.TURNS, JSON.stringify(turns))
    return turns[idx]
  }
  return null
}

// Cases
export function getCases() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]')
}

export function getCaseByCode(code) {
  return getCases().find((c) => c.codigo === code) || null
}

export function createCase(data) {
  const cases = getCases()
  cases.push(data)
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases))
  return data
}


export function generateNextCaseCodes() {
  const cases = getCases()

  const maxCodigo = cases.reduce((max, item) => {
    const numero = parseInt(item.codigo || '0', 10)
    return numero > max ? numero : max
  }, 5524)

  const nextCodigo = maxCodigo + 1

  return {
    codigo: String(nextCodigo),
    numeroCaso: `ELA2200${String(nextCodigo).padStart(4, '0')}`,
  }
}


export function createCaseFromTurn(formData) {
  const { codigo, numeroCaso } = generateNextCaseCodes()

  const newCase = {
    codigo,
    numeroCaso,
    userCode: formData.userCode || '',
    tipo: formData.tipo || '',
    estudianteRegistra: formData.estudianteRegistra || 'ISABELLA MOLINA SANCHEZ',
    estudianteAsignado: formData.estudianteAsignado || '',
    fechaRegistro: formData.fechaRegistro || new Date().toLocaleString('es-CO'),
    nombreUsuario: formData.nombreUsuario || '',
    relatoHechos: formData.relatoHechos || '',
    observaciones: formData.observaciones || '',
    pretensiones: formData.pretensiones || '',
    sede: formData.sede || '',
    attachments: formData.attachments || [],
    history: formData.history || [],
  }

  createCase(newCase)
  return newCase
}


export function addCaseHistory(codigo, entry) {
  const cases = getCases()
  const idx = cases.findIndex((c) => c.codigo === codigo)

  if (idx !== -1) {
    if (!cases[idx].history) cases[idx].history = []

    // 🔥 NUEVO: marcar el último como COMPLETADO
    if (cases[idx].history.length > 0) {
      const lastIndex = cases[idx].history.length - 1
      cases[idx].history[lastIndex].estado = 'COMPLETADO'
    }

    // 🔥 agregar el nuevo como EN PROCESO
    cases[idx].history.push({
      ...entry,
      estado: 'EN PROCESO',
    })

    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases))
    return cases[idx]
  }

  return null
}

export function completeTurn(turnId, caseCode, caseNumber, userName) {
  const turns = JSON.parse(localStorage.getItem(STORAGE_KEYS.TURNS) || '[]')

  const updatedTurns = turns.map((turn) =>
    String(turn.id) === String(turnId)
      ? {
          ...turn,
          estado: 'ATENDIDO',
          caseCode,
          caseNumber,
          userName,
        }
      : turn
  )

  localStorage.setItem(STORAGE_KEYS.TURNS, JSON.stringify(updatedTurns))

  return updatedTurns.find((turn) => String(turn.id) === String(turnId)) || null
}
/*
export function deleteTurn(id) {
  const turns = JSON.parse(localStorage.getItem(STORAGE_KEYS.TURNS) || '[]')
  const updated = turns.filter((t) => String(t.id) !== String(id))
  localStorage.setItem(STORAGE_KEYS.TURNS, JSON.stringify(updated))
} */