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
  numeroHabilitacao: string
  categoriaHabilitacao: string
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
  marcaModelo: string
  anoFabricacao: string
  kmAtual: number
}
