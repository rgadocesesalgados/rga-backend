import { prismaClient } from '../../prisma'

interface ListFinancialReportServiceProps {
  startDate: number
  endDate: number
}

export class ListFinancialReportService {
  async execute({ endDate, startDate }: ListFinancialReportServiceProps) {
    const orders = await prismaClient.order.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        status: { not: 'CANCELADO' },
      },
      select: { total: true },
    })

    const value = orders.reduce((acc, order) => acc + order.total, 0)
    return {
      value,
    }
  }
}
