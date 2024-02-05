import { prismaClient } from '../../prisma'

export class ListOrderService {
  async execute() {
    const orders = await prismaClient.order.findMany({
      include: {
        client: { include: { address: true } },
        bolo: { include: { recheio: true, topper: true } },
        orderProduct: { include: { product: true } },
        address: true,
      },
    })

    return orders
  }
}
