import { GetProduct } from '../product'

export interface GetOrderProduct extends GetProduct {
  id: string
  category_id: string
  product_id: string
  quantity: number
  price: number
  total: number
}
