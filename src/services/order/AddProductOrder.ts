import { prismaClient } from '../../prisma'

export interface AddProductOrderProps {
  order_id: string
  product_id: string
  quantity: number
  price: number
}

export class AddProductOrderService {
  async execute({
    order_id,
    product_id,
    quantity,
    price,
  }: AddProductOrderProps) {
    const orderProductOrder = await prismaClient.orderProduct.create({
      data: {
        order_id,
        product_id,
        quantity,
        price,
      },
    })
    return orderProductOrder
  }
}
