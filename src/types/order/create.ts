import { Order } from '@prisma/client'
import { CakeCreate } from '../cake'
import { ProductCreate } from '../product'
import { PaymentCreate } from '../payment'

export interface OrderCreate
  extends Pick<
    Order,
    | 'client_id'
    | 'date'
    | 'hour'
    | 'cor_forminhas'
    | 'observations'
    | 'delivery'
    | 'address_id'
    | 'type_frete'
    | 'value_frete'
    | 'total'
    | 'status'
  > {
  cakes?: CakeCreate[]
  products?: ProductCreate[]
  payments?: PaymentCreate[]
}
