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
    { username: 'prueba', password: 'prueba', name: 'prueba' },
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
      numeroDocumento: '12900847',
      lugarExpedicion: 'Cali',
      nombres: 'Ruben',
      apellidos: 'gonzalez Ackerman',
      genero: 'Masculino',
      correo: 'ruben.gonzalez@gmail.com',
      telefono: '3201012203',
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
      estudianteRegistra: 'Isabella Fuentes Rodallega',
      estudianteAsignado: '',
      fechaRegistro: '14-08-2025 20:02',
      estado: 'EN_CURSO',
      relato: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
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
        { fecha: '19-08-2025 21:32', estado: 'COMPLETADO', abogado: 'Isabella Fuentes Rodallega', detalle: 'Adjunto concepto juridico e imagen del resumen visual', remitidoA: '' },
        { fecha: '20-08-2025 08:46', estado: 'COMPLETADO', abogado: 'Nathalia Pelaez Perez', detalle: 'Revisar correcciones.', remitidoA: '' },
        { fecha: '21-08-2025 17:25', estado: 'COMPLETADO', abogado: 'Isabella Fuentes Rodallega', detalle: 'Correccion', remitidoA: '' },
        { fecha: '22-08-2025 11:26', estado: 'COMPLETADO', abogado: 'Nathalia Pelaez Perez', detalle: 'Aprobado para remision. Subir el soporte de envio al usuario', remitidoA: '' },
        { fecha: '22-08-2025 23:33', estado: 'EN PROCESO', abogado: 'Isabella Fuentes Rodallega', detalle: 'Adjunto evidencia de envio al usuario', remitidoA: '' },
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
  const admin = SEED_DATA.admins.find(
    (a) => a.username === username && a.password === password
  )
  if (admin) {
    sessionStorage.setItem(
      STORAGE_KEYS.SESSION,
      JSON.stringify({ username: admin.username, name: admin.name })
    )
    return { success: true, user: admin }
  }
  return { success: false }
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEYS.SESSION)
}

export function getSession() {
  const s = sessionStorage.getItem(STORAGE_KEYS.SESSION)
  return s ? JSON.parse(s) : null
}

export function isAuthenticated() {
  return !!getSession()
}
// Users
export function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
}

export function getUserByDocument(doc) {
  return (
    getUsers().find(
      (u) => String(u.numeroDocumento).trim() === String(doc).trim()
    ) || null
  )
}

export function getUserByCode(code) {
  return (
    getUsers().find(
      (u) => String(u.code).trim() === String(code).trim()
    ) || null
  )
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
    estado: 'EN_CURSO',
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

export function updateCase(codigo, updatedCase) {
  const cases = getCases()
  const index = cases.findIndex((c) => c.codigo === codigo)

  if (index === -1) return null

  cases[index] = updatedCase
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases))
  return updatedCase
}

export function closeCase(codigo) {
  const cases = getCases()
  const index = cases.findIndex((c) => String(c.codigo) === String(codigo))

  if (index === -1) return null

  cases[index] = {
    ...cases[index],
    estado: 'CERRADO',
    fechaCierre: new Date().toLocaleString('es-CO'),
  }

  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases))
  return cases[index]
}

/*
export function deleteTurn(id) {
  const turns = JSON.parse(localStorage.getItem(STORAGE_KEYS.TURNS) || '[]')
  const updated = turns.filter((t) => String(t.id) !== String(id))
  localStorage.setItem(STORAGE_KEYS.TURNS, JSON.stringify(updated))
} */