import { prismaClient } from '../../../prisma'

export class ListOrdersOrganizationService {
  async execute() {
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    const ordersResponse = await prismaClient.order.findMany({
      where: { date: { gte: today } },
      orderBy: { created_at: 'asc' },
      select: {
        date: true,
        id: true,
        client: { select: { name: true } },
        total: true,
        payment: { where: { paid: true }, select: { value: true } },
        status: true,
        updated_at: true,
      },
    })

    const orders = ordersResponse.map(
      ({ id, client: { name }, total, payment, status, date, updated_at }) => {
        const paid = payment.reduce((acc, { value }) => acc + value, 0)
        return { id, name, total, paid, status, date, updated_at }
      },
    )

    return orders.sort((a) => {
      if (a.status === 'RASCUNHO') return -1

      return 0
    })
  }
}
