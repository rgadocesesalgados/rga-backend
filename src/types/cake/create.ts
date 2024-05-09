import { Bolo } from '@prisma/client'
import { TopperCreate } from '../topper'

export interface CakeCreate
  extends Pick<
    Bolo,
    | 'order_id'
    | 'peso'
    | 'formato'
    | 'massa'
    | 'price'
    | 'cobertura'
    | 'description'
    | 'banner'
  > {
  recheio: { id: string }[]
  topper: TopperCreate
  topper_id: string
  tem_topper: boolean
}
