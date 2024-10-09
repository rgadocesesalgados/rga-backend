import { date, z } from 'zod'
import { prismaClient } from '../../prisma'
import { schema } from '../../controllers/financial-report/get'

type GetOut = z.infer<typeof schema>

export class ListOut {
  async execute({ endDate, startDate }: GetOut) {
    const outs = await prismaClient.out.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      select: {
        id: true,
        date: true,
        value: true,
        supplier: { select: { name: true } },
      },
    })
    return {
      total: outs.reduce((acc, out) => acc + out.value, 0),
      outs: outs.map((out) => ({
        id: out.id,
        date: new Date(out.date).getTime(),
        value: out.value,
        supplier: out.supplier.name,
      })),
    }
  }
}
