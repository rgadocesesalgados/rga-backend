import { prismaClient } from '../../prisma'

export class ListTopperServices {
  async execute() {
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    const nextDay = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    nextDay.setHours(23, 59, 59, 0)

    const toppers = await prismaClient.topper.findMany({
      where: {
        recebido: false,
        bolo: {
          order: {
            date: {
              gte: today,
              lt: nextDay,
            },
            OR: [{ status: 'ANOTADO' }, { status: 'EM_PRODUCAO' }],
          },
        },
      },
      include: {
        bolo: {
          include: {
            order: {
              select: {
                client: {
                  select: { name: true },
                },
                date: true,
                hour: true,
              },
            },
          },
        },
      },
    })

    toppers.sort((a, b) => {
      const dateA = new Date(a.bolo.order.date)
      const dateB = new Date(b.bolo.order.date)

      return dateA.getTime() - dateB.getTime()
    })

    return toppers.map(
      ({
        id,
        bolo: {
          order: { date, hour, client },
          peso,
        },
        name,
        idade,
        banner,
        tema,
        description,
      }) => {
        return {
          id,
          client_name: client.name,
          peso,
          tema,
          name,
          idade,
          date,
          hour,
          banner,
          description,
        }
      }
    )
  }
}
