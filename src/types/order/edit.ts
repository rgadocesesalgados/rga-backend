import { EditAddressOrder } from '../address-order'
import { CakeCreate, EditCake } from '../cake'
import { EditOrderProduct } from '../order-product'
import { EditPayment } from '../payment'
import { ProductCreate } from '../product'

export interface EditOrder {
  id: string
  client_id: string
  date: Date
  hour: string
  bolo: CakeCreate[]
  address: EditAddressOrder
  orderProduct: ProductCreate[]
  payment: EditPayment[]
  cor_forminhas: string
  observations: string
  total: number
  delivery: boolean
  boxes?: {
    products?: {
      product_id?: string
      quantity?: number
      price?: number
      total?: number
    }[]
  }[]
  status: 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO'
}
