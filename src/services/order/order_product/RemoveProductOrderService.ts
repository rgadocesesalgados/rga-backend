import { prismaClient } from '../../../prisma'

export class RemoveProductOrderService {
  async execute(orderProduct_id: string) {
    const orderProduct = await prismaClient.orderProduct.delete({
      where: {
        id: orderProduct_id,
      },
    })
    return orderProduct
  }
}
