import { prismaClient } from '../../prisma'

export interface DeliveryProps {
  id: string
  date: Date
  hour: string
  client_name: string
  address_complete: string
}
export class ListDeliveryService {
  async execute() {
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    const orders = await prismaClient.order.findMany({
      where: { delivery: true, date: { gte: today } },
      select: {
        id: true,
        client: { select: { name: true } },
        address: { select: { address_complete: true } },
        date: true,
        hour: true,
        type_frete: true,
        payment: { select: { paid: true, value: true } },
      },
    })

    const listDelivery = orders.map((order) => {
      const date = new Date(order.date)

      const [hours, minutes] = order.hour.split(':')

      const priorityDate = date.setHours(Number(hours), Number(minutes), 0, 0)

      const payment = order.payment.reduce((acc, payment) => {
        if (payment.paid) return acc + payment.value

        return acc
      }, 0)
      return {
        id: order.id,
        date: order.date,
        hour: order.hour,
        client_name: order.client.name,
        address_complete: order.address.address_complete,
        priorityDate,
        type_delivery: order.type_frete,
        payment: !!payment ? payment : null,
      }
    })

    listDelivery.sort((a, b) => a.priorityDate - b.priorityDate)

    return listDelivery
  }
}
