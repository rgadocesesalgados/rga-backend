import { GetOrderProduct } from '../order-product'

export interface GetBox {
  id: string
  size: number | string
  category_id: string
  products: {
    id: string
    product_id: string
    name: string
    price: number
    quantity: number
    total: number
  }[]
}
