import { prismaClient } from '../../prisma'

export class CreateOrderService {
  async execute(client_id: string) {
    const order = await prismaClient.order.create({
      data: {
        client_id,
      },
    })

    return order
  }
}
