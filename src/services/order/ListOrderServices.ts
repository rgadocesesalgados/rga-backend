import { prismaClient } from '../../prisma'

export class ListOrderService {
  async execute() {
    const orders = await prismaClient.order.findMany()

    return orders
  }
}
