export interface ClientProps {
  id?: number
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

export interface ConductorProps {
  id?: number
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

export interface DisplacementProps {
  id?: number
  kmInicial: number
  kmFinal: number
  inicioDeslocamento: string
  fimDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor?: number
  idVeiculo?: number
  idCliente?: number
}

export interface VehicleProps {
  id?: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

export type CardProps = {
  name?: string
  cnh: string
  brandCar?: string // marca do carro
  plate?: string
  kmActual?: number | string
  fabrication?: number | string
  numCnh?: string
  maturityCnh?: string // vencimento da CNH
  idConductor?: number
  idVehicle?: number
  virou?: () => void
  update: () => void
}
