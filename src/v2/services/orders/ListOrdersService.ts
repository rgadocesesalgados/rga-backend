import { prismaClient } from '../../../prisma'

export class ListOrdersService {
  async execute(query: string, take = 10, page = 0) {
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    const ordersResponse = await prismaClient.order.findMany({
      where: !!query
        ? {
            client: {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { tel: { contains: query } },
              ],
            },
          }
        : { OR: [{ date: { gte: today } }, { status: 'RASCUNHO' }] },
      orderBy: { updated_at: 'desc' },
      take,
      skip: page * take,
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

    orders.sort((a) => {
      if (a.status === 'RASCUNHO') return -1

      return 0
    })

    orders.sort((a) => {
      if (a.status === 'RASCUNHO') return -1

      return 0
    })

    return orders
  }
}
