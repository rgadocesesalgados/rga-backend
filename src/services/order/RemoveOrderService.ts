import { prismaClient } from '../../prisma'

export class RemoveOrderService {
  async execute(order_id: string) {
    await prismaClient.topper.deleteMany({ where: { bolo: { order_id } } })

    const bolo = await prismaClient.bolo.deleteMany({
      where: { order_id: order_id },
    })

    const orderProduct = await prismaClient.orderProduct.deleteMany({
      where: { order_id: order_id },
    })

    const payments = await prismaClient.payment.deleteMany({
      where: { order_id },
    })

    const order = await prismaClient.order.delete({
      where: { id: order_id },
    })
    return { order, bolo, orderProduct, payments }
  }
}
