import { GetRecheio } from '../recheio'
import { GetTopper } from '../topper'

export interface GetCake {
  id: string
  peso: number
  formato: 'REDONDO' | 'QUADRADO'
  massa: 'BRANCA' | 'CHOCOLATE' | 'MASSA_MESCLADA'
  recheio: GetRecheio[]
  price: number
  cobertura: 'CHANTILLLY' | 'NATA' | 'CLARA_QUEIMADA' | 'AVELA_BATIDO'
  description: string
  banner: string
  topper: GetTopper
}
