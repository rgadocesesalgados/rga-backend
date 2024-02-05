import { prismaClient } from '../../prisma'

export interface ProductOrderProps {
  order_id: string
  orderProduct_id: string
  quantity: number
  price: number
}

export class EditProductOrderService {
  async execute({
    order_id,
    orderProduct_id,
    quantity,
    price,
  }: ProductOrderProps) {
    const orderProduct = await prismaClient.orderProduct.update({
      where: {
        id: orderProduct_id,
      },
      data: {
        quantity,
        price,
      },
    })

    return orderProduct
  }
}
