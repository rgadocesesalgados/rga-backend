import { GetProduct } from '../product'

export interface GetOrderProduct extends GetProduct {
  id: string
  quantity: number
  price: number
  total: number
}
