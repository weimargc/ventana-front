export interface Menu {
  nombre: string
  descripcion: string
  rol: string
  icono: string
  imagen: string
  url: string
  opciones: Opciones[]
}

export interface Opciones {
  nombre: string
  descripcion: string
  rol: string
  estado: boolean
  url: string
}
